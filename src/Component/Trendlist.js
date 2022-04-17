import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, isNumeric, ontrend } from './Util'
import { Storage, Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export default function Trendlist() {

    const [trendlist, setTrendlist] = useState([]);
    const [unfinish, setUnfinish] = useState(true);

    useEffect(() => {
        const listtrend = async () => {
            let trend = await Storage.list('wordcount/part');
            console.log(trend);
            let trends = []
            for (let i = 0; i < trend.length; i++) {
                let content = await Storage.get(trend[i].key, { download: true })
                await content.Body.text().then(string => { 
                    console.log(string)
                    let item = [];
                    let front = -1;
                    for (let i = 0; i < string.length; i++) {
                        if (string[i] === '"') {
                            if (front === -1) {
                                front = i;
                            }
                            else {
                                item[0] = string.substring(front + 1, i);
                                front = -1;
                            }
                        }
                        
                        if (isNumeric(string[i])) {
                            for (let j = i; j < string.length; j++) {
                                if (!isNumeric(string[j])) {
                                    item[1] = string.substring(i, j);
                                    trends.push([item[0], item[1]]);
                                    i = j;
                                    break;
                                }
                            }
                        }
                    }
                });
            }
            
            trends.sort(ontrend);
            trends.reverse();
            console.log(trends);
            setTrendlist(trends);
            setUnfinish(false);
        }
        listtrend().catch(console.error);
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                variant="h3"
                color="text.primary"
                gutterBottom
                >
                Trend 
                </Typography>
                {unfinish && (<LinearProgress />)}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Topic</TableCell>
                            <TableCell>Frequence</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {trendlist.map((trend) => (
                            <TableRow
                            key={trend[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {trend[0]}
                            </TableCell>
                            <TableCell>{trend[1]}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
            
            </Container>
        </ThemeProvider>
    )
}
