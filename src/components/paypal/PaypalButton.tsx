'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js"



interface Props {
  orderId: string
  amount : number
}



export const PaypalButton = ( { orderId, amount } : Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmount = Math.round( amount * 100 ) / 100;

    if ( isPending ) {
        return (
            <div className="animate-pulse">
                <div className="h-12 bg-gray-300 rounded"/>
                <div className="h-12 bg-gray-300 rounded mt-2"/>
            </div>
        )
    }


    const createOrder = async( data: CreateOrderData, actions: CreateOrderActions) : Promise<string> => {
        
      
      const transactionId = actions.order.create({
          purchase_units: [
            {
              // invoice_id: '1',
              amount: {
                currency_code: 'USD',
                value: `${roundedAmount}`
              },
            }
          ],
          intent: 'CAPTURE',
        })  

        console.log({ transactionId });

      return transactionId;
    }


  return (
    <PayPalButtons 
      createOrder={ createOrder }
      // onApprove={}
    />
  )
}
