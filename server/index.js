const express=require("express")
const env =require('dotenv')
const app=express();
const config=require('./config')
const cors=require('cors')
const socket=require('socket.io')

env.config();
app.use(cors({origin:'http://localhost:3000'}))


app.get("/",((req,resp)=>{
    console.log("hello dear")
    resp.send('hello dear')

    
}))
const server=app.listen(process.env.PORT,(()=>{
    console.log("server is running on the port number"+process.env.PORT)

}))

const io=socket(server,{
    cors:{
        origin:'*'
    }
});
io.on('connection',((socket)=>{
    console.log(socket.id)
    socket.on('join_room',((data)=>{
        console.log('join room',data)
        socket.join(data);

    }))
    //{room ,namen ,message}
    socket.on('send_message',((data)=>{
        console.log('message send data',data);
        socket.to(data.room).emit('recieve_message',data);
    }))
    socket.on('disconnect',((data)=>{
        console.log('disconnected')
    }))





}))