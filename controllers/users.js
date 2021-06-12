const { Users } = require('../db')  //for requiring db.js file 

async function getUserByUsername(username)
{
    return await Users.findOne({ where : {username}})  //here it is going to search in our db table of users
}



//getallUser(); //---->for testing of the function getallUser

module.exports = {
    getUserByUsername
}