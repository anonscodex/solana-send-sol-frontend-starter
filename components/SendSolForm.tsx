import { FC, useState } from 'react';
import styles from '../styles/Home.module.css';
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const SendSolForm: FC = () => {
    const [status, setStatus] = useState("");
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const msg = () => {
        return status ? `Transaction Complete✅` : '';
    };

    const sendSol = (event) => {
        event.preventDefault();
        if (!connection || !publicKey) {
            return;
        }

        const recipientPubkey = new web3.PublicKey(event.target.recipient.value);

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPubkey,
                lamports: LAMPORTS_PER_SOL * event.target.amount.value
            })
        );

        sendTransaction(transaction, connection).then((stat) => {
            setStatus(stat);
        });

        console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`);
    };

    return (
        <div>
            {publicKey ?
                <form onSubmit={sendSol} className={styles.form}>
                    <label htmlFor="amount">Amount (in SOL) to send:</label>
                    <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                    <br />
                    <label htmlFor="recipient">Send SOL to:</label>
                    <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                    <button type="submit" className={styles.formButton}>Send</button>
                </form> :
                <p>Connect your Wallet....</p>
            }
            {
                status ? <div>
                    <p>{msg()}</p> {/* Call msg function to render its returned value */}
                </div> : null
            }
        </div>
    );
};
