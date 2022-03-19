let users = [];

// add user in the list
let addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    // room = room.trim();
    if (!username || !room) {
        return {
            error: "username and room required",
        };
    }
    let existingUser = users.find((user) => {
        return (user.username == username && user.room == room);
    });

    if (existingUser) {
        return {
            error: "username already in use",
        };
    }

    let user = { id, username, room };
    users.push(user);
    return { user };
};
//get disconnect user by id
let removeUser = (id) => {
    let index = users.find((user) => {
        return user.id === id;
    });
    if (index!=-1) {
        return index;
    }
};

// get user by id

let getUser=(id)=>{
    return users.find((user)=>{return user.id==id})
}

// find users in a room

let getUsersInRoom =(room)=>{
    return users.filter((user)=>{
       return user.room===room;
    })

}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
