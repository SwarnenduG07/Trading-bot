const request = require("request");
const crypto = require("crypto");

const baseurl = "https://api.coindcx.com"
import { resolve } from "bun";
import { key , secret } from "./config"
import { string } from "zod";

export const creatOrder = (side: "buy" | "shell", market: string, price: number, quantity: number ,clientOrderId: string) => {
        return new Promise<void>((resolve) => {
            const body = {
                side,
                "order_type":"limit_order",
                market,
                "palce_per_unit": price,
                "toytal_:quantity" : quantity,
                "timestamp": Math.floor(Date.now()),
                "client_order_id" : clientOrderId
            }
            const payload = new Buffer(JSON.stringify(body).toString());
        
            const signeture = crypto.createHmac("sha256", secret).update(payload).digest("hex")
        
            const option = {
                url: baseurl + "/exchange/v1/orders/create",
                headers: {
                    'X-AUTH-APIKEY': key,
                    'X-AUTH-SIGNATURE':signeture
                },
                json: true,
                body: body
            }

            request.post(option, function(error : string, response: string , body: string) {
                if(error) {
                    console.log("error while placing order");
                } else {
                    console.log(body);
                    
                }
                resolve();
            })
        
        })
    
}

export const cancelOrder = (market: string) => {
    return  new Promise<void>((resolve) => {
        const body = {
            market,
           timestamp: Math.floor(Date.now())
         }
         
         const payload = new Buffer(JSON.stringify(body)).toString();
         const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
         
         const options = {
             url: baseurl + "/exchange/v1/margin/cancel_all",
             headers: {
                 'X-AUTH-APIKEY': key,
                 'X-AUTH-SIGNATURE': signature
             },
             json: true,
             body: body
         }
         
         request.post(options, function(error: string, response: string, body: string) {
           if (error) {
               console.log("error while canceling orders");
           } else {
                console.log("Canceled all orders");
                console.log(body);
                
           }
             resolve();
         })
    })
   
}