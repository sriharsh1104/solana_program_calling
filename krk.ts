import web3 from "web3";
import * as anchor from "@coral-xyz/anchor";
import BigNumber from "bignumber.js";
import { bytes } from "@coral-xyz/anchor/dist/cjs/utils";

export const krkxkalal = async()=>{

//User account Key
const PubKUSR = new anchor.web3.PublicKey(
    "CcZDkfXo6XVedtDFVTrnSDNUBoi8LNBxCdusQ3jfkKH5"
  );


// Program ID
let pkey = new anchor.web3.PublicKey(
    "4fHTDAHtrhHmjRQJzABmDsRaQhfULToRnoLqViKtj9PT");

/** txInfo
 * 
 * const [balance1, bump] = anchor.web3.PublicKey.findProgramAddressSync
 * ([PubKUSR.toBytes()],pkey);
 */

 const [balance1, bump1] = anchor.web3.PublicKey.findProgramAddressSync
 ([PubKUSR.toBytes()],pkey);


/** Receipt
 * 
 * const [balance1, bump] = anchor.web3.PublicKey.findProgramAddressSync
 * ([PubKUSR.toBytes(),new anchor.BN(0).toBuffer()],pkey);
 */

 const [balance2, bump2] = anchor.web3.PublicKey.findProgramAddressSync
 ([PubKUSR.toBytes(),new anchor.BN(6).toString()],pkey);


console.log(`txInfo : ${balance1}  \n Receipt : ${balance2}`);
}
