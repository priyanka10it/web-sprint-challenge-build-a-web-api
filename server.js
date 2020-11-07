const express = require('express');
const helmet = require ('helmet');
const server = express();

const userAction = require('./actions/userAction');
const userProject = require('./project/userProject');

server.use(express.json());
server.use(helmet());
server.use('/api/projects', userProject)
server.use('/api/actions', userAction);

server.get('/',(req,res)=>{
    res.status(200).json({message:"The server is online"})
});

module.exports=server;