import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import{useNavigate} from "react-router-dom";
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(()=>({
  title: {
    flex: 1, 
    color: "gold", 
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
}))

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff", 
    },
    type: "dark",
  }
}); 

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();
  console.log(currency);
  const navigate = useNavigate();
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Crypto Street
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"UK"}>UK</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;

