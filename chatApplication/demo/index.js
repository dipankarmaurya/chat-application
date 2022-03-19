const express= require('express');
const path = require('path');
const http = require('http');
const socketio= require('socket.io');
const app=express();
const server = http.createServer(app);
const io= socketio(server);

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

io.on('connection',(socket)=>{
    socket.on('chat',(msg)=>{
        io.emit('showmsg',msg)
        console.log(msg);
    })

})



server.listen(3000,(e)=>{
    if(e) throw e;
console.log('server is running on port 3000');
})