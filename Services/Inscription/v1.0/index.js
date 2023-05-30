const { User } = require('./entity/User')
const { DbManager } = require('./db/DbManager')
require('dotenv').config()
const path = require('path')
const JWT = require('./lib/TokenManager')
const  cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

let manager = new DbManager();
/////////MIDELWARE//////////////////
//accepte les requête issue du même serveur (désactive la sécurité)
app.use(cors())
//accepte de recevoir des donnée via le corps de la requête
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(checkAccessToken)
//////////END MIDLEWARE/////////////

app.post('/addUser',async (req,res)=>{
    let user = new User(req.body);
    user.encryptPassword();
    let result = await manager.save(user.getUser())
    res.json(result)
})
app.post('/login',async (req,res)=>{
    let user = new User(req.body);
    let result = await manager.login(user.getUser())
    if(result.length > 0){
        let resultUser = new User(result[0])
        resultUser.decryptPassword()
        //console.log(resultUser.getUser().password)
        if(user.getUser().password == resultUser.getUser().password){
            delete resultUser.getUser().password
            //delete resultUser.getUser().firstname
           // delete resultUser.getUser().lastname
            let token = await JWT.generateJWT(resultUser.getUser())
            res.json({value:token})
        }else{
            res.status(500).json({message:'E-mail ou mot de passe incorrect'})
        }
    }else{
        res.status(500).json({message:'Aucun utilisateur ne correspond'})
    }
})
app.get('/token',checkAccessToken,async (req,res)=>{
    let token = req.headers.authorization.split(' ');
    let response = await JWT.decyptJWT(token[1])
    //console.log(response)
    if(typeof response === 'object')
        res.status(200).send('ok')
    else if(response === false)
        res.status(501).send('Verification failed')
    else
        res.status(205).send('token checking')
    
})
function checkAccessToken(req,res,next){
   
    const token = req.headers.authorization.split(' ');
    if(token[0] === "Bearer"){
        try {
            JWT.decyptJWT(token[1])
            next();
        } catch (error) {
            console.log(error.message)
            res.status(401).send('Invalid token signature')
        }
    }else{
        res.status(300).send('Unaccepted token submited')
    }
}
app.listen(process.env.PORT)