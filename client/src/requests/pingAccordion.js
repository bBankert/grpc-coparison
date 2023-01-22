import { RequestAccordion } from "../request-accordion/requestAccordion"
import { PingService }  from '../services/PingService';

import { useState } from "react";

export const PingAccordion = () => {
    const pingService = new PingService();

    const [startRestTime,setRestStartTime] = useState(0);
    const [endRestTime,setRestEndTime] = useState(0);

    const [startGRPCTime,setGRPCStartTime] = useState(0);
    const [endGRPCTime,setGRPCEndTime] = useState(0);

    const restRequest = async () => {
        setRestStartTime(new Date().getTime());
        await pingService.sendRestRequest();
        setRestEndTime(new Date().getTime());
    }

    const grpcRequest = async () => {
        setGRPCStartTime(new Date().getTime());
        await pingService.sendGRPCRequest();
        setGRPCEndTime(new Date().getTime());
    }


    return (
        <RequestAccordion 
            requestHeader='PING'
            method='GET'
            route='/ping'
            handleRestPress={restRequest}
            handleGRPCPress={grpcRequest}
            restTime={endRestTime - startRestTime}
            grpcTime={endGRPCTime - startGRPCTime}
           />
    )
}