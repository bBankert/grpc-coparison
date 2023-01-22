import { RequestAccordion } from "../request-accordion/requestAccordion"
import { TestDataService }  from '../services/TestDataService';

import { useState } from "react";

export const TestDataAccordion = () => {
    const testDataService = new TestDataService();

    const [startRestTime,setRestStartTime] = useState(0);
    const [endRestTime,setRestEndTime] = useState(0);

    const [startGRPCTime,setGRPCStartTime] = useState(0);
    const [endGRPCTime,setGRPCEndTime] = useState(0);

    const restRequest = async () => {
        setRestStartTime(new Date().getTime());
        await testDataService.sendRestRequest();
        setRestEndTime(new Date().getTime());
    }

    const grpcRequest = async () => {
        setGRPCStartTime(new Date().getTime());
        await testDataService.sendGRPCRequest();
        setGRPCEndTime(new Date().getTime());
    }


    return (
        <RequestAccordion 
            requestHeader='TEST DATA'
            method='GET'
            route='/test-data/1'
            handleRestPress={restRequest}
            handleGRPCPress={grpcRequest}
            restTime={endRestTime - startRestTime}
            grpcTime={endGRPCTime - startGRPCTime}
           />
    )
}