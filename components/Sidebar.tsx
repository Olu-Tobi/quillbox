import { useEffect, useState } from 'react'
import styled from "styled-components";
import {Avatar, IconButton, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase';
import Chat from './Chat';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';





const Container = styled.div`
flex: 0.45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 300px;
overflow: scroll;
background-color: white;


::-webkit-scrollbar{
  display: none;
  width: 100vw;
}

-ms-overflow-style:none;
scrollbar-width: none;

@media screen and (max-width: 1024px) {
    
    min-width: 30vw;
    max-width: 30vw;
 
  }

@media screen and (max-width: 600px) {
    
    min-width: 100vw;
    max-width: 100vw;
 
  }

`

const Container2 = styled.div`
flex: 0.45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 300px;
overflow: scroll;
position: absolute;
top: 0;
z-index: 10;
background-color: white;

flex-direction: column;
align-items: center;


::-webkit-scrollbar{
  display: none;
  width: 100vw;
}

-ms-overflow-style:none;
scrollbar-width: none;

@media screen and (max-width: 1024px) {
    
    min-width: 30vw;
    max-width: 30vw;

    > p{
      font-size: 0.9rem;
    }
 
  }

@media screen and (max-width: 600px) {
    
    min-width: 100vw;
    max-width: 100vw;
 
  }

`
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color:#20c6c6;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 50px 20px ;
  height: 70px;

  @media screen and (max-width: 1024px) {
    
    padding: 50px 5px ;
 
  }
  
  @media screen and (max-width: 600px) {
    
    padding: 50px 20px ;
 
  }
  
`

const Header2 = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color:#20c6c6;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 50px 10px;
  height: 80px;
  width:100%;

  @media screen and (max-width: 600px) {
    
    padding: 50px 20px ;
 
  }
  
`

const HeaderDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 21vw;

@media screen and (max-width: 1024px) {
    
    width: 40vw;
 
      }

@media screen and (max-width: 600px) {
    
  width: 100vw;
  margin: 0;
    }

`

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover{
    opacity: 0.8;
  }
`

const IconsContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

`


const SearchInput = styled.input`
outline-width: 0;
border: none;
border-radius: 5px;
background-color: #ede7e78c;
width: 70%;
padding: 0.3rem ;

@media screen and (max-width: 600px) {
    
    width: 60vw;
    padding: 0.4rem;
      }
  



`

const SidebarButton = styled.div`
border-radius: 50%;
background-color:#20c6c6;
width: 3rem;
height: 3rem;
color: white;
font-size: 38px;  
position: fixed;
top: 35rem;
left: 14rem;
cursor: pointer; 
box-shadow: 0 2px 3px 0 grey;


@media screen and (max-width: 1024px) {
    
         top: 50%;
        left: 20%;
    
      }
  
@media screen and (max-width: 600px) {
    
  top: 80%;
  left: 75%;
  }



/* &&&{
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
} */
`

const ChatCon = styled.div`
border-top-left-radius:3rem;
border-top-right-radius:3rem;
position: absolute;
top: 6rem;
width: 18.75rem;
z-index: 1;

@media screen and (max-width: 1024px) {
    
    
    width: 30vw;
    }

@media screen and (max-width: 600px) {
    
    
    width: 100vw;
    }
`

const Em = styled.em`
color: grey; 
display: flex ;
align-items: center;
justify-content: center;
height: 8vh;
font-size: 0.8rem;


@media screen and (max-width: 1024px) {
    
    
  font-size: 0.7rem;
    }

    @media screen and (max-width: 600px) {
    
    
    font-size: 0.8rem;
      }


`

const Sidebar =  () => {

 
   

 //{id, users}
  const [user] = useAuthState(auth as any);

  const userChatRef = db.collection('chats').where('users', 'array-contains', user!.email);
  const [chatSnapshot] = useCollection(userChatRef as any);
  
  // const [isVisible, setIsVisible] = useState(true);
  // const storagePath = "hideDiv ";
  const [isClicked, setIsClicked] = useState(false);
  const [reveal, setReveal] = useState(false);
 
 

  const chatAlreadyExists = (recipientEmail: any) => {
      const existingChat = !!chatSnapshot?.docs
      .find((chat) => chat.data().users.find((user: any) => 
      user === recipientEmail)?.length > 0);
      
      return existingChat;

      
     
    }


  const createChat = () => {
   
    
    const input = prompt('Please enter an email address for the user you wish to chat with');

    if (!input) return null;

    

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user!.email) {
        // TODO: where we add chats to the db chats collection
        db.collection('chats').add({
          users: [user!.email, input],
        })

       
    }

    

  }

  // useEffect(() => {
  //   const hideDiv = localStorage.getItem(storagePath);
  //   setIsVisible(!hideDiv);
  // }, []);

  // const handleClose = () => {
  //   setIsVisible(false);
  //   localStorage.setItem(storagePath, '1');
  // };




  

  const handleClick = () => {
    setIsClicked(true);
  }

  const handleReveal = () => {
    setReveal(true);
  }

  // chatSnapshot?.docs?.map(doc => doc.data().users).map(user => (user)).find(element => console.log(element))



  
  return (
    <>
    <Container>
        
        <Header>
        <h2 style={{display: reveal ? 'none' : 'inline', color:'white'}}>Quillbox</h2>
          <IconsContainer style={{width: reveal ? '100vw' : 'auto'}}>
            
          
         
          <div  style={{display: 'flex', alignItems:'center'}}>
            <IconButton><SearchIcon style={{color:'white'}}onClick = {handleReveal}/></IconButton>
           <SearchInput 
           
           style={{display: reveal ? 'flex' : 'none'}}
           placeholder="Search"/>
           </div>
       
            <IconButton>
              <MoreVertIcon onClick={handleClick} style={{color:'white'}}/>
            </IconButton>
            
          </IconsContainer>
        </Header>

        
        
        

     
       <ChatCon >
        <div style={{borderTopLeftRadius: '10px',borderTopRightRadius: '10px', backgroundColor:'white'}}>

        <Em style={{}}>Click the button below to add new chats...</Em>
       
       {  
            chatSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        )) }
        </div>
        
        

      
         
      
      

        {/* onClick={handleClose} */}
        <IconButton > 
              <SidebarButton >
              <ChatIcon 
                onClick= {createChat}/>
             </SidebarButton>
            </IconButton>
       </ChatCon>
      
 
        
    </Container>
    
    <Container2 style={{display: isClicked ? 'flex' : 'none' }}>
    <Header2 ><HeaderDiv><ArrowBackIcon style={{color:'white'}} onClick={() => setIsClicked(false)}/> <h2 style={{color:'white'}}>Quillbox</h2></HeaderDiv></Header2>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop: '4rem', border:'2px solid gold', borderTop:'none', borderRight:'none', borderRadius:'50%', width:'3.5rem', height:'3.5rem'}}><UserAvatar src={user?.photoURL}/></div>
       <p style={{display:'flex', alignItems:'center', color:'grey', margin:'0', marginTop:'1rem'}}><PersonIcon style={{ marginRight:'5px'}}/>{user?.displayName}</p>
       <p style={{display:'flex', alignItems:'center', color: 'grey', margin:'0', marginTop:'0.5rem'}}><EmailIcon style={{ marginRight:'5px'}}/> {user?.email}</p>
       <button onClick={() => auth.signOut()} style={{border:'1px solid black', background:'white', color:'black', borderRadius:'10px', padding:'0.3rem 1rem', marginTop:'2rem', cursor:'pointer'}}>Log out</button>
    </Container2>
    </>
  )
}



export default Sidebar