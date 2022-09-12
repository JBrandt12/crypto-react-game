import React, { useEffect } from 'react'
import {useState} from "react"; 
import { CoinList } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, TextField, ThemeProvider, Typography, TableContainer, LinearProgress, TableHead, TableRow, TableCell, Table, TableBody, makeStyles } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';


const CoinsTable = () => {
  const [coins, setCoins] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const {currency, symbol} = CryptoState()
  const [page, setPage] = useState(1);
  const history = useNavigate(); 
  const fetchCoins = async() =>{
    setLoading(true)
    const {data} = await axios.get(CoinList(currency)); 
    setCoins(data)
    setLoading(false)
  };


  useEffect(()=>{
    fetchCoins()
  },[currency])

  const darkTheme = createTheme({
    palette: {
      primary: {
          main: '#fff', 
      }, 
      type: "dark",
    }, 
  }); 

  //search funciton

  const handleSearch = () =>{
    return coins.filter((coin)=> (
        coin.name.toLowerCase().includes(search) || 
        coin.name.toLowerCase().includes(Symbol)
    ))
  }

  //style for rows in table
  const useStyles = makeStyles(()=>({
    row: {
        backgroundColor: "#16171a", 
        cursor: "pointer", 
        "&:hover": {
            backgroundColor: "#131111", 
        }, 
        fontFamily: "Montserrat",
    }, 
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold", 
            }
        }
  }));  

  const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign: "center"}}> 
      <Typography
        variant='h4'
        style={{margin: 18, fontFamily: "Montserrat"}}
      >Cryptocurrency Prices by Market Cap</Typography>
      <TextField 
      label="Search for a Crypto Currency..." 
      variant='outlined'
      style={{marginBottom: 20, width: "100%"}}
      onChange={(e)=>setSearch(e.target.value)}
      >
      </TextField>
        <TableContainer>
            {
                loading? (
                    <LinearProgress style={{backgroundColor: "gold"}}></LinearProgress>
                ): (
                    <Table>
                        <TableHead style={{backgroundColor: "#EEBC1D"}}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head)=>(
                                    <TableCell
                                    style={{
                                        color:"black", 
                                        fontWeight: "700", 
                                        fontFamily: "Montserrat", 
                                    }}
                                    key={head}
                                    align={head==="Coin" ? "" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {/* to make that paghe number system at bottom of webpage start with the slice before */}
                        <TableBody> {handleSearch().slice((page -1)*10, (page-1)*10+10)
                        .map(row=>{
                            const profit = row.price_change_percentage_24h > 0;
                            
                            return (
                                <TableRow 
                                onClick={() => history.push(`/coins/${row.id}`)}
                                className={classes.row}
                                key={row.name}
                                >
                                    <TableCell 
                                    component="th" 
                                    scope ="row"
                                    styles={{
                                        display: "flex",
                                        gap: 15,

                                    }}
                                    ><img 
                                    src={row?.image}
                                    alt={row.name}
                                    height="50"
                                    style={{marginBottom: 10}} 
                                    ></img>
                                    <div style={{
                                        display: "flex", flexDirection: "column"
                                    }}>
                                        <span style={{
                                            textTransform: "uppercase", 
                                            fontsize: 22,
                                        }}>
                                        {row.symbol}
                                        </span>
                                        <span style={{color: "darkgrey"}}
                                        >
                                            {row.name}
                                        </span>
                                    </div>
                                    </TableCell>
                              
                                    <TableCell align='right' 
                                    > {symbol}{" "} 
                                    {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell
                                    align= "right"
                                    style={{
                                        color: profit >0? "green" : "red", 
                                        fontWeight: 500,
                                    }}
                                    >
                                        {profit && "+"} 
                                        {row.price_change_percentage_24h.toFixed(2)}%

                                    </TableCell>
                                    <TableCell align="right">{numberWithCommas(row.market_cap.toString().slice(0,-6))}

                                    </TableCell>

                                </TableRow>
                            )

                        })}</TableBody>
                    </Table>
                )
            }
        </TableContainer>
        {/* how to add the number of pages at the bottom of page. The /10 is how many times you divide by and if you have 100 pages it will give you 10  */}
            <Pagination 
            style={{padding: 20,
            width: "100%",
            display: "flex", 
            justifyContent: "center",  
        }}
            classes = {{ul: classes.Pagination}}
            count = {(handleSearch().length/10).toFixed(0)}
            onChange = {(_, value)=>{
                setPage(value); 
                window.scroll(0,450)
            }}
                
            />
      </Container>

    </ThemeProvider>
  )
}
export default CoinsTable


//1:11