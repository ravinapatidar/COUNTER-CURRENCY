import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import  { CryptoState } from '../CryptoContex';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../components/Carousel';
import { display } from '@mui/system';
const CoinsPage = () => {

 const {id} = useParams();
 const [coin,setCoin] = useState();


const {currency,symbol} = CryptoState();

const fetchCoin = async () => {
  const {data} = await axios.get(SingleCoin(id));
  setCoin(data);
};
console.log('printing second');
console.log(coin);

useEffect(() => {
  fetchCoin();
},[]);

if(!coin) return <LinearProgress style={{background:'gold'}}/>

  return (
    <div sx={{display:'flex',
             flexDirection:{xs: 'column',md:'row'},
             justifyContent: { md: 'flex-start' },
             alignItems:'center',
    }}>
      <div style={{
         width: {xs:'100%',md:'30%'},
         display:'flex',flexDirection:'column',alignItems:'center',
         marginTop:25,borderRight:'2px solid grey',
      }}>
        <img src={coin?.image.large} alt={coin?.name} height='200' style={{marginBottom:20}} />
          <Typography variant='h3'style={{
                         fontWeight:'bold', 
                         marginBottom:20,fontFamily:"Montserrat", 
          }}>
            {coin?.name}
          </Typography>
          <Typography variant='subtitle1' style={{
                     width:'100%',fontFamily:'Montserrat',padding:25,
                     paddingBottom:15,paddingTop:0,textAlign:'justify',
          }}>
             {ReactHtmlParser(coin?.description.en.split(". ")[0])},
          </Typography>
          <div  sx={{
            alignSelf: 'start',
            padding: '25px',
            paddingTop: '10px',
            width: '100%',
            display : {md: 'flex',},
            justifyContent: { md: 'space-around' },
            flexDirection: {sm: 'column' },
            alignItems: {sm:'center'},
            alignItems: { xs: 'flex-start'},
          }}>
           <span style={{display:'flex'}}>
            <Typography variant='h5' style={{}}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{
              fontFamily:'Montserrat',
            }}>
              {coin?.market_cap_rank}

            </Typography>
           </span>
           <span style={{display:'flex'}}>
            <Typography variant='h5' style={{}}>
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{
              fontFamily:'Montserrat',
            }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
           </span>
           <span style={{display:'flex'}}>
            <Typography variant='h5' style={{}}>
              Market Cap:{" "}
            </Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{
              fontFamily:'Montserrat',
            }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString().slice(0,-6)
              )}
              M

            </Typography>
           </span>

          </div>

      </div>

      {/* chart */}
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinsPage