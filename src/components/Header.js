import { AppBar,Container,createTheme, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { Link } from 'react-router'
import { CryptoState } from '../CryptoContex'

const Header = () => {

  const {currency,setCurrency} = CryptoState();

  const darkTheme = createTheme({
  palette:{
    primary:{
      main:"#fff"
    },
    mode: 'dark',
  }
})

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography style={{
            flex:1,color:'gold',fontFamily:'Montserrat',fontWeight:'bold',cursor:'pointer',
          }}>
           <Link to='/'>Crypto Hunter</Link> 
          </Typography>

          <Select variant='outlined' style={{
              width: 100,
              height:40,
              marginLeft:15,
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header