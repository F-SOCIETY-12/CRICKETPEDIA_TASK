const { URL } = require('../db')  //for requiring db.js file 

async function getUrlByhash(hash)
{
    return await URL.findOne({ where : {hash}})  //here it is going to search in our db table of users
}


//getallUser(); //---->for testing of the function getallUser

module.exports = {
    getUrlByhash
}