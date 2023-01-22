
const grpc = require('@grpc/grpc-js');
const { addGenericService } = require('./services');


function getServer() {
    var server = new grpc.Server();
    addGenericService(server);
    return server;
  }
  
  if (require.main === module) {
    var server = getServer();
    server.bindAsync(
      '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
        console.log('Running on port 9090')
        server.start();
    });
  }
  
  exports.getServer = getServer;