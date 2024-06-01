import axios from "axios";
import { DepthManager } from "./DepthManeger";
import { cancelOrder, creatOrder } from "./order";

 const solInrMarket =  new DepthManager("B-XAI_INR");

 const usdtInrMarket  = new DepthManager("B-USDT_INR");

 const solUsdtMarket  = new DepthManager("B-XAI_USDT");

 
 setInterval(() => {
      console.log(solInrMarket.getRelaventDepth());
      console.log(usdtInrMarket.getRelaventDepth());
      console.log(solUsdtMarket.getRelaventDepth());

   
      
    const cangetIninr = solInrMarket.getRelaventDepth().higestBid - 0.001;
    const cangetUsdt = cangetIninr/usdtInrMarket.getRelaventDepth().lowestAsk;
    const canGetsol = cangetUsdt/ solUsdtMarket.getRelaventDepth().lowestAsk;
    
    console.log(`You can convert ${1} SOL into ${canGetsol} SOl`);

    //Buying sol from inr ,SHell FOR USDT,SHELL USDT FOR INR

    const initialInr = solInrMarket.getRelaventDepth().higestBid + 0.001;
    const canGetUsdt = solUsdtMarket.getRelaventDepth().higestBid;
    const canGetInr2 = canGetUsdt * usdtInrMarket.getRelaventDepth().higestBid;
    console.log(`You can convert ${initialInr} INR into ${canGetInr2} INR`);

 },1500)

 async function main() {
    const highestBid = solInrMarket.getRelaventDepth().higestBid;
    //@ts-ignore
    console.log(`placing order for ${parseFloat(highestBid)+ 0.01}`);
    //@ts-ignore
    await creatOrder("buy" , "XAIINR" , (parseFloat(highestBid) + 0.01).toFixed(3), 10 , Math.random().toString())
    await cancelOrder("XAIINR");
    await new Promise((r) => setTimeout(r,1000));
    main();
  }

 setTimeout(async ()  => {
    main();
 },1650)

