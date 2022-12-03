import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'

const DisplayIcon = styled.div`

display: flex;
align-items: center;
justify-content: center; 
height:100vh; 
width: 100vw;
flex-direction: column;
background: #e9e8e850;
@media screen and (max-width: 600px) {
    display: none;
    }
`



export default function Home() {
  return (
    <div >
      <Head>
        <title>Chatrgram</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{display:'flex'}}>
      <Sidebar/>
      
      <DisplayIcon>
        <div >
            <img src='https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/Group%202.png?alt=media&token=5c1f3160-c5a9-4440-aa91-304eceb4adca'
            height={150}
            style={{marginBottom: 10}}
            
            />
        </div>
        <p style={{position: 'absolute', bottom: '0', color:'grey'}}>Developed by Olu-Tobi</p>
    </DisplayIcon>
      </div>
      
    </div>
  )
}
