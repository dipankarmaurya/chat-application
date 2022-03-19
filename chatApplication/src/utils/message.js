const generator =(text,username)=>{
   return {
        username,
        text,
        createdAt:new Date().getTime()
    }
}
const generateLocations = (url,username)=>{
    return {
        username,
        url,
        createdAt:new Date().getTime()
    }
}
module.exports={
    generator,
    generateLocations
}