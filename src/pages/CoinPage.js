import React, { useEffect } from 'react'
import {useState} from "react"; 
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import {useParams} from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import ReactHtmlParser from 'react-html-parser/lib/HtmlParser';


const CoinPage = () => {
  const {id} = useParams()
  const [coin, setCoin] = useState()

 const {currency, symbol } = CryptoState()

 const fetchCoin = async() =>{
  const {data} = await axios.get(SingleCoin(id)) 
  setCoin(data); 
 }; 

 console.log(coin);
 useEffect(()=>{
  fetchCoin(); 
 }, []); 

 const useStyles = makeStyles((theme)=> ({
  container: {
    display: "flex", 
    [theme.breakpoints.down("md")]: {
      flexDirection: "column", 
      alignItmes: "center"
    },
  },
  sidebar: {
    width: "30%", 
    [theme.breakpoints.down("md")]: {
      width:  "100%",
    },
    display: "flex", 
    flexDirction: "column", 
    alignItems: "center", 
    marginTop: 25, 
    borderRight: "2px solid grey", 
  }, 
  heading: {
    fontWeight: "bold", 
    marginBottom: 20, 
    fontFamily: "Montserrat",
  },
  description:  {
    width: "100%", 
    fontFamily: "Montserrat", 
    padding: 25, 
    paddingBottom: 15, 
    paddingTop: 0, 
    textAlign: "justify",
  }
 }))
 const classes = useStyles(); 

 return (
  <div className={classes.container}>
    {/* Sidebar */}
    <div className={classes.sidebar}>
      <img src={coin?.image.large}
      alt={coin?.name}
      height="200"
      style={{marginBottom: 20}}
      >
      </img>
      <Typography variant='h3' className={classes.heading}>{coin?.name}</Typography>
      <Typography variant ="subtitle1" className={classes.description}>{ReactHtmlParser(coin?.description.en.split(". "[0]))}</Typography>
    </div>
    {/* chart */}
    <CoinInfo coin = {coin}></CoinInfo>
  </div>
 )
}

export default CoinPage

// 1:23:07