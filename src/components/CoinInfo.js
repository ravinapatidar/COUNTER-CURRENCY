import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContex';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { chartDays } from '../config/data';
import SelectBtn from './SelectBtn';

Chart.register(...registerables);
const CoinInfo = ({coin}) => {

     const [historicData,setHistoricdata] = useState();
     const [days,setDays] = useState(1);

     const {currency} = CryptoState();

     const fetchHistoricData = async () => {
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency));

        setHistoricdata(data.prices);
     }
      console.log('data',historicData);

     useEffect(() => {
        fetchHistoricData();
     },[currency,days]);

     const darkTheme = createTheme({
        palette: {
            primary:{main: '#fff'},
            mode: 'dark',
        },
     });

  return (
    <ThemeProvider theme = {darkTheme}>
        <div style={{
            width:'75%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:25,padding:40,
            width:{md:'100%',},marginTop:{md:0},padding:{md:20},paddingTop:{md:0},
        }}>
            {
                !historicData ? (
                    <CircularProgress
                    style={{color:'gold'}}
                    size={250}
                    thickness={1}
                    />
                ) : (
                    <>
                    <Line
                    data={{
                        labels:historicData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time = 
                            date.getHours() > 12
                            ? `${date.getHours()-12}: ${date.getMinutes()}`
                            : `${date.getHours()}:${date.getMinutes()} AM`;

                            return days === 1 ? time : date.toLocaleDateString();

                        }),
                        datasets: [
                           { data:historicData.map((coin) => coin[1]),
                            label:`price (past ${days} Days) in ${currency}`,
                            borderColor : '#EEBC1D',
                           },
                        ],
                    }}
                    options={{
                        elements:{
                            point:{
                                radius:1,
                            },
                        },
                    }}
                    />
                    <div style={{
                        display:'flex',marginTop:20,justifyContent:'space-around',
                        width:'100%',
                    }}>
                        {chartDays.map(day => (
                            <SelectBtn
                            key={day.value}
                            onClick={() =>setDays(day.value)}
                            selected={day.value === days}
                            >{day.label}</SelectBtn>
                        ))}
                    </div>

                    </>
                )
            }

        </div>
    </ThemeProvider>
  )
}

export default CoinInfo