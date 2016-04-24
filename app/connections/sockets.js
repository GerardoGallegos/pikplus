'use strict'

const event = require('../util/events');

function _sockets(io) {

  io.on('connection',(socket)=>{
    console.log('a user connected');
  })

  event.on('socket log', (msg) => {
      console.log(`EVENTO ${msg}`)
      io.emit('log', {
          log : msg,
          id : getId(msg)
      });
  })


  event.on('socket log completed', (msg) => {
      console.log(`COMPLETED : : : : :>  ${msg}`)
      io.emit('log completed', {
          log : msg,
          id : getId(msg)
      });
  })

  event.on('socket log finish', (msg) => {
      console.log(`FINISH*********`)
      io.emit('log finish', 'Finish')
  })

  function getId (msg) {
      return msg.toLocaleLowerCase().replace(/\s/g, '_')
  }

}


module.exports = _sockets;