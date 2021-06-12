const {Router} = require('express')
const {getUserByUsername} = require('../controllers/users')
const route = Router()

route.get('/:username',async(req,res)=>
{
    let user;
    user = await getUserByUsername(req.params.username)
    res.status(200).send(user)
})

module.exports = route
