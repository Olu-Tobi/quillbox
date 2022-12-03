import Head from 'next/head'
import styled from "styled-components"
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';



const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;

@media screen and (max-width: 600px) {
    background-color:white ;
    min-width:100vw;
    max-width: 100vw;
    height: 90vh;
    }
`
const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);

    @media screen and (max-width: 600px) {
    
    box-shadow: none;
    padding: 0;
    }
`
const Logo = styled.img`
   
    margin-bottom: 50px;

    @media screen and (max-width: 600px) {
    
    margin-bottom: 20px;
    }
   
`
const StyledButton = styled(Button)`
    
    @media screen and (max-width: 600px) {
        width: 55vw;
    }
    
`


const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
  return (
    <Container>
        <Head>
            <title>Login</title>

        </Head>

        <LoginContainer>
            <Logo height={100} src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/Group%202.png?alt=media&token=5c1f3160-c5a9-4440-aa91-304eceb4adca"/>
            <StyledButton onClick = {signIn} variant="outlined">Sign in with Google</StyledButton>
        </LoginContainer>
    </Container>
  )
}

export default Login;