import './App.css';
// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Header from './components/Header'
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import 'react-alice-carousel/lib/alice-carousel.css';


function App() {
  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "#14161a",
      color: "white", 
      minHeight: "100vh"
    }
  }))
  const classes = useStyles();

  return (
    <BrowserRouter>
        <div className={classes.App}>
          <Header/>
          <Routes>
            <Route  path="/" element={<Homepage/>} exact/>
            <Route path='/coins/:id' element={<CoinPage/>}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}


export default App;


// other react crypto app tutorial
  // const [coins, setCoins] = useState([])
  // useEffect(()=>{
  //   axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res =>{
  //     setCoins(res.data); 
  //     console.log(res.data)
  //   })
  // })