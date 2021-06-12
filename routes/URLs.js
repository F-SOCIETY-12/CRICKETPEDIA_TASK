const {Router} = require('express')
const {getUrlByhash} = require('../controllers/urls')
const route = Router()

route.get('/:hash',async(req,res)=>
{
    let hashvalue;
    hashvalue = await getUrlByhash(req.params.hashvalue)
    res.status(200).send(hashvalue)
})

module.exports = route
