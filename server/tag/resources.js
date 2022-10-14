const Tag = require("./Tag")
const getTags = ()=> new Promise((resolve, reject) =>{
    Tag.find().exec(function (err, tags){
        if(err) return reject(err)
        resolve(tags)
    })
})


module.exports ={
    getTags
}