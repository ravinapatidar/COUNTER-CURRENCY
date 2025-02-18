import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContex';
import { createTheme,Container, Typography, TextField, TableContainer, LinearProgress,
   Table, TableHead, TableRow, TableCell, TableBody, 
   Pagination} from '@mui/material';
import {  ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom"; 
import { numberWithCommas } from './Carousel';



const CoinsTable = () => {
 
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState("");
    const navigation = useNavigate();
    const [page,setpage] = useState(1);

    const {currency,symbol} = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
           
        setCoins(data);
        setLoading(false);

    }
    console.log('printing coins')
    console.log(coins);

    useEffect(() => {
        fetchCoins();
    },[currency]);

     const darkTheme = createTheme({
      palette:{
        primary:{
          main:"#fff"
        },
        mode: 'dark',
      }
    });

      const handleSearch =() => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search) 
        ));
      }

      

  return (
   <ThemeProvider theme={darkTheme}>
     <Container style={{textAlign:'center'}}>
        <Typography variant='h4'
        style={{margin:18,fontFamily:'montserrat'}}
        >
            Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField label='Search For a Crypto Currency..' variant='outlined'
          style={{marginBottom:20,width:'100%'}}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
            {
                loading ? (
                    <LinearProgress style={{background:'gold'}}/>

                ) : (
                   <Table>
                    <TableHead style={{background:'#EEBC1D'}}>
                       <TableRow> {['coin','price','24th Change','Market Cap'].map((head) => (
                        <TableCell style={{color:'black',fontWeight:'700',fontFamily:'Montserrat'}}
                        key={head}
                        align={head === 'Coin' ? '' : 'right'}>
                            {head}
                        </TableCell>
                       ))}

                       </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleSearch()
                       .slice((page-1)*10,(page-1)*10+10)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h > 0;

                         return (
                            <TableRow 
                            onClick = {() => navigation(`/coins/${row.id}`)}
                            key={row.name}
                            sx={{background:"#16171a",cursor:'pointer',
                              "&:hover":{background:"#131111"},
                              fontFamily:'Montserrat',
                            }}
                            >
                                <TableCell component='th' scope='row'
                                style={{display:'flex',gap:15,}}
                                >
                                    <img src={row?.image} alt={row.name} height='50'
                                    style={{marginBottom:10}}/>

                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <span
                                    style={{
                                        textTransform:'uppercase', fontSize:22,
                                    }}
                                    >
                                        {row.symbol}
                                        </span>
                                        <span style={{color:'darkgray'}}>{row.name}</span>

                                    </div>
              </TableCell>
                <TableCell align='right'>
                   {symbol}{" "}
                       {numberWithCommas(row.current_price.toFixed(2))}
                </TableCell>
              <TableCell
               align='right'
               style={{color:profit > 0? 'rgb(14,203,129)': 'red',fontWeight:500}}

              >
                {profit && '+'}
                {row.price_change_percentage_24h.toFixed(2)}%
               
              </TableCell>
            <TableCell align='right'>
             {symbol}{" "}
             {numberWithCommas(
              row.market_cap.toString().slice(0,-6)
             )}
             M
            </TableCell>
              </TableRow>
                  )   
                 })}
                    </TableBody>
                   </Table>
                )
            }
        </TableContainer>

        <Pagination 
        sx={{
          padding:20,width:'100%',color:'gold',display:'flex',justifyContent:'center',
          '&.MuiPaginationItem-root':{color:'gold'},
        }}
         count={(handleSearch()?.length/10).toFixed(0)}
         onChange={(_,value) => {
          setpage(value);
          window.scroll(0,450);
         }}
       
       />
     </Container>
   </ThemeProvider>
  )
}

export default CoinsTable