import { createContext, useContext, useEffect } from 'react'
import { useState, useRef } from 'react'

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState(false);
    const [symbol, setSymbol] = useState("$");
    useEffect(()=>{
        if(currency ==="UK") setSymbol("£"); 
        else if(currency ==="USD") setSymbol("$"); 
    
    },[currency])

    return (
    <Crypto.Provider value ={{currency, symbol, setCurrency }} >{children}</Crypto.Provider>
    )
}

export default CryptoContext;
export const CryptoState = () =>{
   return  useContext(Crypto)
}