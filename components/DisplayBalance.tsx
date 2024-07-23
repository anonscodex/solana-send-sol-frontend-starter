import { FC, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';


export const DisplayBalance: FC = () => {
    const [balance, setBalance] = useState(0);
    const { connection} = useConnection();
    const {publicKey} = useWallet();

    useEffect (() => {
        if(!connection || !publicKey )
            
          {return};

          connection.onAccountChange(
            publicKey,
            (updatedAccountInfo) => {
              setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
            },
            "confirmed",
          )

          connection.getAccountInfo(publicKey).then((info) => {
            setBalance(info.lamports);
          })
        
    },[connection, publicKey])


    return (  
        <div>
      <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : ""}</p>
    </div>
    );
};
 
