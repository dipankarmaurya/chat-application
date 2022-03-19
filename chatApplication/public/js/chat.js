const socket = io();
// elements
let msgForm = document.querySelector("#message-form");
let msgFormInput = msgForm.querySelector("input");
let msgFormButton = msgForm.querySelector("button");
let shareLocationBtn = document.querySelector("#share-location");
let messages = document.querySelector('#messages');

// templates
let messageTemplate= document.querySelector('#message-template').innerHTML;
let linkMessageTemplate = document.querySelector('#link-msg-template').innerHTML;

// 
   let {username,room}= Qs.parse(location.search,{ignoreQueryPrefix:true})
  
socket.on("messaging", (message) => {
  // console.log(msg);
  let html = Mustache.render(messageTemplate,{
    username:message.username,
    message:message.text,
    createdAt:moment(message.createdAt).format('h:mm a'),
  })
  messages.insertAdjacentHTML('beforeend',html);
});

// 
socket.on('loactionMessage',(message)=>{
  // console.log(url)
  let html = Mustache.render(linkMessageTemplate,{
    username:message.username,
    url:message.url,
    createdAt:moment(message.createdAt).format('h:mm a')
  });
  messages.insertAdjacentHTML('beforeend',html);
})

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msgFormButton.setAttribute("disabled", "disabled");
  let msg = e.target.elements.message.value;
  socket.emit("chatting", msg, (err) => {
    msgFormButton.removeAttribute("disabled");
    msgFormInput.value = "";
    msgFormInput.focus();
    if (err) {
      return console.log(err);
    }
  });
});

shareLocationBtn.addEventListener("click", () => {
  shareLocationBtn.setAttribute("disabled", "disabled");
  if (!navigator.geolocation) {
    return alert("your browser does not support geolocation");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "getlocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (msg) => {
        console.log(msg);
        shareLocationBtn.removeAttribute("disabled");
      }
    );
  });
});

socket.emit('join',{username,room},(err)=>{
  if(err){
    location.href='/';
  }
});