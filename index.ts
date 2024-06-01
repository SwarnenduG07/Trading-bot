import axios from "axios";
import { DepthManager } from "./DepthManeger";
 const solInrMarket =  new DepthManager("B-SOL_INR");

 const usdtInrMarket  = new DepthManager("B-USDT_INR");

 const solUsdtMarket  = new DepthManager("B-SOL_USDT");

 
 setInterval(() => {
      console.log(solInrMarket.getRelaventDepth());
      console.log(usdtInrMarket.getRelaventDepth());
      console.log(solUsdtMarket.getRelaventDepth());

 },1500)

