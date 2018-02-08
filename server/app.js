const express = require('express')
const port = 3000
const app = express()
const path = require('path');
const socketController = require('./controller/socketController')
// our server instance
const server = app.listen(port);

// This creates our socket using the instance of the server
const io = require('socket.io').listen(server);

socketController(io);

const publicPath = path.join(__dirname,'..', 'public')
  app.use(express.static(publicPath))
  app.get('*',(req,res)=>{
   res.sendFile(path.join(publicPath,'index.html'))
  })

server.listen(port, () => console.log(`Listening on port ${port}`))
