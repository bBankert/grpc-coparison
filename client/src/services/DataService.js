import genericServiceProto from '../compiled-client-protos/GenericService_grpc_web_pb';
import DataRequestProto from '../compiled-client-protos/requests/DataRequest_pb';

const { GenericServicePromiseClient } = genericServiceProto;
const { DataRequest } = DataRequestProto;

export class DataService {
    numberOfRequests;

    testObject = {
        name: 'tom test',
        age: 30000,
        favoriteFood: 'pizza'
    }

    constructor(numberOfRequests = 50) {
        this.numberOfRequests = numberOfRequests;
    }

    async sendRestRequest(){
        const allRequests = [];
        const stringifiedObject = JSON.stringify(this.testObject);
        for(var i = 0; i < this.numberOfRequests; i++){
            allRequests.push(fetch('http://localhost:3001/data',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: stringifiedObject
            }));
        }
        const result = await Promise.all(allRequests);
        return result;
    }

    async sendGRPCRequest(){
        const client = new GenericServicePromiseClient('http://localhost:8080');

        const request = new DataRequest();

        request.setMessage(JSON.stringify(this.testObject))

        const allRequests = [];
        for(var i = 0; i < this.numberOfRequests; i++){
            allRequests.push(client.data(request,{}));
        }
        const result = await Promise.all(allRequests);

        return result;
    }
}