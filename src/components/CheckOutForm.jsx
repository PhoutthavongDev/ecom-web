import React,{useState} from 'react'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import '../Stripe.css'
import { saveOrder } from '../api/User'
import useEcomStore from '../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CheckOutForm = () => {
  const token = useEcomStore((state)=>state.token)
  const clearCart = useEcomStore((state)=>state.clearCart)
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false) 
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const payload = await stripe.confirmPayment({
      elements,
    
      redirect:'if_required'


    })
    console.log('payload',payload)
    if(payload.error) {
      setMessage(payload.error.message)
      toast.error(payload.error.message)
    } 
    else if(payload.paymentIntent.status === "succeeded"){
         saveOrder(token,payload)  
        .then((res)=>{
          clearCart()
          console.log(res)
          toast.success('Payment Success')
        })
        navigate('/user/history')

        .catch((err)=> console.log(err))
    }
    else{
      toast.warning('Somting wrong!!')
        //Create Order
       
    }

    setIsLoading(false)

  }

  const paymentElementOptions ={
    layout: "tabs"
  }

  return (
    <>
      <form 
      
      id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={paymentElementOptions}/>
        <button className='stripe-button'
        disabled={isLoading || !stripe || !elements} id='submit'>
              <span id='button-text'>
                {
                  isLoading ? (
                    <div className='spinner' id='spinner'></div>

                  ) :(
                    "Pay now"
                  )
                }
              </span>
        </button>
        {/* Show any Error */}
        {message && <div className='payment-message'>{message}</div>}
      </form>
      {/* Dev:Display */}
      <div>
        <p>
          Payment method are dynamically displayed based on customer.&nbsp
          <a
          // href='{dpmCheckerLink}'
          // target='_blank'
          // ref='noopener noreferrer'
          // id='dpm-integration-checker'
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </>
  )
}

export default CheckOutForm