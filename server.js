const hapi = require('hapi');
const fs = require('fs');
const inert = require('inert');
const path = require('path');
const server = new hapi.Server();

const options = {
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem'),

}

server.connection({
  port: 4040,
  host: 'localhost',
  tls: options
});

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
  console.log('server runinng at', server.info);
})
