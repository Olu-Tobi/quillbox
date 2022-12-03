import Head from 'next/head'
import styled from 'styled-components'
import ChatScreen from '../../components/ChatScreen'
import Sidebar from '../../components/Sidebar'
import { db } from '../../firebase'
//import '../styles/id.css'

const Container = styled.div`
display:flex;
`
const ChatContainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;

::-webkit-scrollbar{
    display: none;

}

-ms-overflow-style: none;
scrollbar-width: none;

`

const ChatSidebar = styled.div`

@media screen and (max-width: 600px) {
    display: none;
    }
`

const Chats = ({chat, messages}:any) => {
  return (
    <Container>
        <Head>
            <title>Chat</title>
        </Head>
        <ChatSidebar>
            <Sidebar />
        </ChatSidebar>

        <ChatContainer>
            <ChatScreen chat = {chat} messages = {messages}/>
        </ChatContainer>
    </Container>
  )
}

export default Chats;

export async function getServerSideProps(context: any){
    const ref = db.collection("chats").doc(context.query.id);

    const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

    const messages = messagesRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
    .map((messages: any) => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime() 
    }))

    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    

    return {
        props:{
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}