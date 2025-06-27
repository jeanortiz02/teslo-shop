'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransactionId } from "@/action"



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
              invoice_id: orderId,
              amount: {
                currency_code: 'USD',
                value: `${roundedAmount}`
              },
            }
          ],
          intent: 'CAPTURE',
        })  

        // console.log({ transactionId });

        const transactionToString = (await transactionId).toString();

        // TODO: Send transactionId to server
        const { ok} = await setTransactionId( transactionToString, orderId);
        if ( !ok ) {
          throw new Error('No se pudo actualizar el pago de la orden');
        }

      return transactionId;
    }

    const onApprove = async ( data : OnApproveData, actions : OnApproveActions) => {

      // console.log('onApprove');
      const details = await actions.order?.capture();

      if ( !details ) return ;

    await paypalCheckPayment( details.id! );
    }


  return (
    <PayPalButtons 
      createOrder={ createOrder }
      onApprove={ onApprove }
    />
  )
}
