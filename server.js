const hapi = require('hapi');

const inert = require('inert');
const path = require('path');
const server = new hapi.Server();

server.connection({port: 4040});

server.register(inert, err => {
  if (err) throw err;

  server.route({
    path: '/{file*}',
    method: 'GET',
    handler: {
      directory:{
        path: __dirname,
      }
    }
  })
})

server.start(err =>{
  if (err) throw err;
  console.log('server runinng at port', server.info.port);
})
