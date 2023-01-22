import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

export const RequestAccordion = ({
    requestHeader, 
    route, 
    method,
    handleRestPress,
    handleGRPCPress,
    restTime,
    grpcTime
}) => {

    const getColorByRoute = (method) => {
        switch(method){
            case 'get':
                return 'green';
            case 'post':
                return 'red';
        }
    }

    const handleBothPress = () => {
        handleRestPress();
        handleGRPCPress();
    }

    return (
        <div>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Container sx={{
                    width: '100%',
                    justifyContent: 'space-between',
                    display: 'flex'
                }}>
                    <Typography fontWeight='bold'>{requestHeader}</Typography>
                    <Typography 
                    fontWeight='bold' 
                    sx={{ color: getColorByRoute(method.toLowerCase())}}>{method}</Typography>
                </Container>
            </AccordionSummary>
            <AccordionDetails>
                <Container
                    sx={{
                        width: '100%',
                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                >
                    <Button variant="contained" onClick={handleRestPress}>Send REST request</Button>
                    <Button variant="contained" onClick={handleBothPress}>Send both requests</Button>
                    <Button variant="contained" onClick={handleGRPCPress}>Send gRPC request</Button>
                </Container>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h3'>
                            Rest Time
                        </Typography>
                        {restTime ? 
                            restTime
                        : 0.0}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='h3'>
                            gRPC Time
                        </Typography>
                        {grpcTime ? 
                            grpcTime
                        : 0.0}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

        </div>
    );
}