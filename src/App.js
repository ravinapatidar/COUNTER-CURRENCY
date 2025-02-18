import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { makeStyles, styled } from '@mui/material/styles';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinsPage from './pages/CoinsPage';




function App() {
  return (
    <BrowserRouter>
      <div style={{background:"#14161a",color:'white',minHeight:'100vh'}}>
        <Header />
        <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/coins/:id' Component={CoinsPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
