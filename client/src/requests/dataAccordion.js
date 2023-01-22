import { RequestAccordion } from "../request-accordion/requestAccordion"
import { DataService }  from '../services/DataService';

import { useState } from "react";

export const DataAccordion = () => {
    const dataService = new DataService();

    const [startRestTime,setRestStartTime] = useState(0);
    const [endRestTime,setRestEndTime] = useState(0);

    const [startGRPCTime,setGRPCStartTime] = useState(0);
    const [endGRPCTime,setGRPCEndTime] = useState(0);

    const restRequest = async () => {
        setRestStartTime(new Date().getTime());
        await dataService.sendRestRequest();
        setRestEndTime(new Date().getTime());
    }

    const grpcRequest = async () => {
        setGRPCStartTime(new Date().getTime());
        await dataService.sendGRPCRequest();
        setGRPCEndTime(new Date().getTime());
    }


    return (
        <RequestAccordion 
            requestHeader='DATA'
            method='POST'
            route='/data'
            handleRestPress={restRequest}
            handleGRPCPress={grpcRequest}
            restTime={endRestTime - startRestTime}
            grpcTime={endGRPCTime - startGRPCTime}
           />
    )
}