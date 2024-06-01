import axios from "axios";
import { object } from "zod";

export class DepthManager {
    private market: string;
    private bids: {
        [key: string]: string
    };
    private asks: {
        [key: string]: string
    }
    constructor(market: string) {
        this.market = market;
        this.bids = {};
        this.asks = {};
        setInterval(() => {
            this.pollMarket();
        },3000)
    }
    async pollMarket() {

       const depth = await axios.get(`https://public.coindcx.com/market_data/orderbook?pair=${this.market}`)
       this.bids = depth.data.bids
       this.asks = depth.data.asks
    }

          getRelaventDepth() {
            let higestBid  = -100;
            let lowestAsk = 10000000;
            
             Object.keys(this.bids).map(x => {
                if(parseFloat(x)> higestBid) {
                    higestBid = parseFloat(x)
                }
             })
             Object.keys(this.asks).map(x => {
                if ( parseFloat(x) < lowestAsk) {
                    lowestAsk = parseFloat(x)
                }
             })
                    return {
                        higestBid,
                        lowestAsk
                    }
        }


}