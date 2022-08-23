import React, { useEffect, useState } from 'react'
import socket from '../io'


const ChatBox = () => {
    const [inputField,setInputField]=useState({
        name:'',
        room:'',
        message:''
    })
    const [isChatting,setIsChatting]=useState(false)
    const [messageList,setMessageList]=useState([])
    const [id, setId] = useState([])

  
    useEffect(()=>{
        socket.on('recieve_message',((data)=>{
            setMessageList([...messageList,data])
        }))
    })
    console.log(messageList)
    const  inputHandler=(e)=>{
 
        setInputField({
            ...inputField,
          [e.target.name]:e.target.value
        })
       

    }
    const enterRoom=()=>{
        console.log(inputField)
        socket.emit('join_room',inputField.room)
        setId([...id,socket.id])
        setIsChatting(true)

    }
    const sendMessage=(async()=>{
        console.log(inputField)
        await socket.emit('send_message',inputField,id)
        setMessageList([...messageList,inputField])
        setInputField({...inputField,message:''})
        setId([...id,socket.id])

    })
    console.log(messageList)
  return (
    <div class='start'>
        <h1>ChatBox</h1>
        {
            !isChatting ?  <div>
            <input type='text' placeholder='Enter the name of the Users' name='name' onChange={inputHandler}/><br></br><br></br>
            <input type='text' placeholder='Enter the room' name='room' onChange={inputHandler}/><br></br><br></br>
            <button onClick={enterRoom}>Enter in the room</button>
        </div>
        :<>
        <h1>Chatbox</h1>{
            messageList.map((cv ,index ,arr)=>{
                return (
                    <div className='show' key={index}>
                        <div> {cv.name}:{cv.message}</div>
     
                    </div>
                )
            })


        }
        <input type='text' placeholder='Enter message' name='message' onChange={inputHandler}/><br></br><br></br>
        <button onClick={sendMessage}>sendMessage</button></>
        
        }

       
        


    </div>
  )
}

export default ChatBox