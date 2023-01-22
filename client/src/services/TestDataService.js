import genericServiceProto from '../compiled-client-protos/GenericService_grpc_web_pb';
import EmptyRequestProto from '../compiled-client-protos/requests/EmptyRequest_pb';

const { GenericServicePromiseClient } = genericServiceProto;
const { EmptyRequest } = EmptyRequestProto;

export class TestDataService {
    numberOfRequests;

    constructor(numberOfRequests = 50) {
        this.numberOfRequests = numberOfRequests;
    }

    async sendRestRequest(){
        const allRequests = [];
        for(var i = 0; i < this.numberOfRequests; i++){
            allRequests.push(fetch('http://localhost:3001/test-data/1'));
        }
        const result = await Promise.all(allRequests);
        return result;
    }

    async sendGRPCRequest(){
        const client = new GenericServicePromiseClient('http://localhost:8080');

        const request = new EmptyRequest();

        const allRequests = [];
        for(var i = 0; i < this.numberOfRequests; i++){
            allRequests.push(client.testData(request,{}));
        }
        const result = await Promise.all(allRequests);

        return result;
    }
}