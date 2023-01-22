const path = require('path');
const grpc = require('@grpc/grpc-js');
const proto_service_path = path.resolve(__dirname,'../protos/GenericService.proto');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    proto_service_path,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const { GenericService } = protoDescriptor.services;

const doPing = (call,callback) => {
    callback(null,{
        status: 'healthy'
    })
};

const doData = (call,callback) => {
    callback(null,{})
};

const doTestData = (call,callback) => {
    callback(null,{
        name: 'tom',
        job: 'office worker',
        favoriteFood: 'pizza'
    })
};

const addGenericService = (server) => {
    server.addService(GenericService.service, {
        ping: doPing,
        data: doData,
        testData: doTestData
      });
}

module.exports = {
    addGenericService
}