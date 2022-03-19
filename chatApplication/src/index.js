const exp = require("constants");
const path = require("path");
const http = require("http");
const Filter = require('bad-words');
const express = require("express");
const socketio = require("socket.io");
const {generator,generateLocations}= require('./utils/message');
const {addUser,removeUser,getUser,getUsersInRoom}=require('./utils/user')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

io.on("connection", (socket) => {

socket.on('join',({username,room},callback)=>{
    let {err,user}=addUser({id:socket.id,username,room});
    console.log(user);
    if(err || !user){
        return callback(err);
    }
    socket.join(user.room);
    socket.emit('messaging',generator('Welcome !!!',user.username));
    socket.broadcast.to(user.room).emit('messaging',generator(`${user.username} has joined`,user.username))
    callback();
})    

socket.on('chatting',(msg,callback)=>{
    const user=getUser(socket.id);
    const filter =new Filter();
    if(filter.isProfane(msg)){
        return callback('profanity not allowed');
    }
    if(user){
        io.to(user.room).emit('messaging',generator(msg,user.username))
    } 
    callback('deliverd')
})

socket.on('getlocation',(position ,callback)=>{
    let user = getUser(socket.id);
    if(!user){
       return callback('error in sharing location') 
    }
    io.to(user.room).emit('loactionMessage',generateLocations(`https://google.com/maps?q=${position.latitude},${position.longitude}`,user.username))
    callback('loaction shared')
})
socket.on('disconnect',()=>{
    let user = removeUser(socket.id);
    if(user){
        io.to(user.room).emit('messaging',generator(`${user.username} has left `,user.username));
    }
})
});

server.listen(3000, (e) => {
  console.log(`server is running on port 3000`);
});
// let arr =["sun","mon","tue","wed"]
// let date = new Date("2022-03-05");


// function soluntion(arr){
// let newArr={};
// for (let [key, value] of Object.entries(arr)) {
//     let date= new Date(key);
//     let day = date.toLocaleString('en-US',{weekday:"short"})
//     if(newArr[day]){
//         newArr[day]+=value;
//     }
//     else{
//     newArr[day]=value;
//     }
//   }
//   return newArr;
// }

// console.log(soluntion({"2022-03-01":1,"2022-03-02":1,"2022-03-03":1,"2022-03-04":1,"2022-03-05":1,"2022-03-06":1,"2022-03-07":1,"2022-03-08":1,"2022-03-09":1,"2022-03-10":1 }))

