import styled from 'styled-components'

const Image = styled.img`

`



const Loading = () => {
  return (
    <div style={{display: 'grid', placeItems:'center', height:'100vh'}}>
        <div >
            <Image src='https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/Group%202.png?alt=media&token=5c1f3160-c5a9-4440-aa91-304eceb4adca'
            height={150}
            style={{marginBottom: 10}}
            alt=''
            />

          
        </div>
    </div>
  )
}

export default Loading