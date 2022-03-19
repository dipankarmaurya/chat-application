const socket =io();

let chatBox=document.querySelector('#chat-box');
socket.on('showmsg',(msg)=>{
    let h1 = document.createElement('h1');
    h1.innerText=msg;
    chatBox.appendChild(h1)
})

socket.emit('chat',"hellow");