import { Avatar, IconButton } from '@mui/material'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db} from '../firebase'
import Message from './Message'

import { useCollection } from 'react-firebase-hooks/firestore'

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
//import MicIcon from '@mui/icons-material/Mic';
import {  useRef, useState } from 'react'
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import dynamic from 'next/dynamic';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);





//import getRecipientEmail from '../utils/getRecipientEmail'

const Container = styled.div`

`
const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top: 0;
display: flex;
padding: 11px;
height: 80px;
align-items: center;
border-bottom: 1px solid whitesmoke;

@media screen and (max-width: 600px) {
    height: 60px;
    }
`

const HeaderInfo = styled.div`
margin-left: 15px;
flex: 1;

> h3{
    margin-bottom: 1px;
}

> p{
    font-size: 14px;
    color: grey;
    margin-top: 1px;
}
`

const MessageContainer = styled.div`
    padding: 30px;
    background-color: grey;
    
    height: 80vh;
    overflow-y: scroll;

    @media screen and (max-width: 600px) {
    padding:30px 10px;
    }
`
const EndOfMessage = styled.div`
margin-bottom: 30px;
`

const HeaderIcons = styled.div`

`

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom:0;
background-color: white;
z-index: 100;
`
const Input = styled.input`
flex: 1;
outline:0;
border: none;
border-radius: 15px;
background-color: #e1dede;
padding: 12px;
margin-left: 15px;
margin-right: 15px;
`
const BackIcon = styled.a`
    display: none;

    @media screen and (max-width: 600px) {
    display: inline;
    }
`



const ChatScreen =  ({chat, messages}:any) => {
    //console.log(chat, messages)
    const [user] = useAuthState(auth as any);
    const [input, setInput]= useState("")
    const [showPicker, setShowPicker] = useState(false)
    const endOfMessagesRef = useRef<HTMLDivElement>(null)
    const router = useRouter();


    
  

    const [messagesSnapshot] = useCollection( db.collection("chats")
    .doc(router.query.id as any)
    .collection("messages")
    .orderBy("timestamp", "asc") as any);

    const [recipientSnapshot] = useCollection( db.collection("users").where('email', '==', getRecipientEmail(chat.users, user)) as any);


    const scrollToBottom = () => {
        endOfMessagesRef.current!.scrollIntoView({
            behavior :"smooth",
            block: "start",
        } ) 
    } 

    const sendMessage = (e:any) => {
        e.preventDefault();
        db.collection("users").doc(user!.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

        }, {merge: true});

        db.collection("chats").doc(router.query.id as any).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user:user!.email,
            photoURL: user!.photoURL,
            displayName: user!.displayName,
            
        })


         setInput("");
         scrollToBottom();

    }

   

    
    

   


    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
            ))
            
            
        }
        else {
            return JSON.parse(messages).map((message:any)=>(
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }


    const recipient =  recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user)

    const handleChange = (e:any) => {
        setInput(e.target.value);
        }


    const onEmojiClick = ({event, emojiObject}:any) => {
        setInput(prevInput => prevInput + emojiObject.emoji);
        
    }
      

  
    

  return (

    <Container >
       <Header>

        <BackIcon href = '/'>
            <IconButton>
                <ArrowBackIcon/>
            </IconButton>
        </BackIcon>
         {recipient? (
            < Avatar src={recipient?.photoURL} />
        ):(
            <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>

        )
    }
        <HeaderInfo>
            <h3 style={{color: 'black'}}>{recipient?.displayName}</h3>
            {recipientSnapshot ? (
                <p>Last active: {' '}
                {recipient?.lastSeen?.toDate()? (
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                ) : "Unavailable"}
                </p>
            ): (
                <p>Loading last active...</p>
            )}
        </HeaderInfo>

        
       </Header>


       <MessageContainer onClick = {() => setShowPicker(false)}>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef}/>
       </MessageContainer>

       

       <InputContainer >
    
        <InsertEmoticonIcon onClick = {() => setShowPicker(val => !val)} style={{cursor:'pointer', color: '#20c6c6'}}/>

        <Input 
        value = {input} onChange={handleChange} placeholder = 'Message'/>
        

        <button  
        
        type="submit" 
        onClick={sendMessage}
        style ={{ 
            color: 'white',  
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#20c6c6',
            borderRadius: '50%',
            width:'2.2rem',
            height:'2.2rem',
        }}
        ><SendIcon style={{fontSize:'1.2rem'}}/></button>
        
       </InputContainer> 

       {
            showPicker && <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{width: '100%'}}
            />
        } 
       </Container>
   )
}

export default ChatScreen