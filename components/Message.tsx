import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
import moment from 'moment'

const Container = styled.div``

const MessageElement = styled.p`
width: fit-content;
padding: 0px 9px;
border-radius: 10px;
margin:  8px;
min-width: 60px;
max-width: 15rem;
display: flex;
align-items: center;
min-height: 45px;
max-height: fit-content;

position: relative;
text-align: left;

`

const Sender = styled(MessageElement)`
margin-left: auto;
background-color: #96e6e6;
`

const Reciever = styled(MessageElement)`
background-color: whitesmoke;

`

const Timestamp = styled.span`
color: gray;
padding: 8px 10px 1px;
font-size: 9px;
position: absolute;
bottom: 0;
text-align: right;
right: 0;


`

const Message = ({user, message}: any) => {

  const [userLoggedIn] = useAuthState(auth as any);

  const TypeOfMessage = user === userLoggedIn!.email ? Sender : Reciever;

  


  return (
    <Container>
        <TypeOfMessage><p>
          {message.message}
          <Timestamp>{message.timestamp? moment(message.timestamp).format('LT'): '. . .'}</Timestamp>
        </p></TypeOfMessage>
    </Container>
  )
}

export default Message;