const { Project } = require('./entity/Project')
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
app.use(checkAccessToken)
//accepte de recevoir des donnée via le corps de la requête
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(checkAccessToken)
//////////END MIDLEWARE/////////////

app.post('/addProject',async (req,res)=>{
    let project = new Project(req.body);
    let result = await manager.save(project.getProject())
    res.json(result)
})

app.post('/addProject',async (req,res)=>{
    let project = new Project(req.body);
    let result = await manager.save(project.getProject())
    res.json(result)
})

app.post('/addProject',async (req,res)=>{
    let project = new Project(req.body);
    let result = await manager.save(project.getProject())
    res.json(result)
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