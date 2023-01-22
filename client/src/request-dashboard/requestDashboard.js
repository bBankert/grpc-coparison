import { Typography } from "@mui/material"
import { DataAccordion } from "../requests/dataAccordion"
import { PingAccordion } from "../requests/pingAccordion"
import { TestDataAccordion } from "../requests/testDataAccordion"

const { Container } = require("@mui/system")


export const RequestDashboard = () => {
    return (
        <Container maxWidth="lg">
           <Typography variant="h1" sx={{ fontSize: '4.5rem' }}>
                Request Performance Comparisons
           </Typography>
           <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                gRPC (Web) vs. Rest
           </Typography>
           <PingAccordion />
           <DataAccordion />
           <TestDataAccordion />
        </Container>
    )
}

