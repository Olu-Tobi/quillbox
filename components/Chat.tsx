
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import getRecipientEmail from '../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import TimeAgo from 'timeago-react'

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
cursor: pointer;
padding: 15px;
word-break: break-word;
position: relative;


:hover{
    background-color: #e9eaeb42;
}


`

const UserAvatar = styled(Avatar)`

margin: 5px;
margin-right: 15px;


@media screen and (max-width: 600px) {
    
    transform: scale(1.2);
    margin-left: 1.2rem;
    margin-top: 0.5rem;
    margin-bottom:0.5rem;

   
    
    }
`

const UserP = styled.p`
margin-top: 8px;
color:black;

@media screen and (max-width: 1024px) {
    
    
    font-size: 0.8rem;
      }

@media screen and (max-width: 600px) {
    margin-top:0.5rem;
    font-size: 1rem;
    margin-left: 0.6rem;
    margin-bottom:0.5rem;
}

`

const ContainerEdit = styled.div`
display: flex;



`

const Em = styled.em`
margin: 0;
position: absolute;
color: #8080806e;
left: 4.7rem;
font-size: 0.75rem;
top: 2rem;

@media screen and (max-width: 600px) {
    left: 6.2rem;
    top: 2rem;
    font-size: 0.8rem;
}
`

const Chat = ({ id, users }:any )  => {
    const router = useRouter();
    const [user] = useAuthState(auth as any);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)) as any);

    const enterChat = () => {
        router.push(`/chat/${id}`)
        db.collection("users").doc(user!.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      
        }, {merge: true});
    }
    
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user);
    


  return (
    <Container onClick = {enterChat}>
        <ContainerEdit>
        {recipient? (
            < UserAvatar src={recipient?.photoURL} />
        ):(
            <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>

        )
    }
        
        <UserP>{recipient?.displayName}</UserP>
        </ContainerEdit>

        {recipientSnapshot && (
                <Em> {' '}
                {recipient?.lastSeen?.toDate() && (
                    <div
                    style={{
                      display: 'flex',
                      alignItems:'center',
                      justifyContent: 'center',
                     
                    }}
                    ><p style={{marginRight:'4px'}}>Active </p> <TimeAgo datetime={recipient?.lastSeen?.toDate()}/></div>
                )}
                </Em>
            )}
    </Container>
  )
}

export default Chat