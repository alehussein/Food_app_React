import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmiting, setDidSubmiting] = useState(false)
  const [error, setError] = useState('')

  const ctx = useContext(CartContext)
  const totalAmount = `${ctx.totalAmount.toFixed(2)}`
  const hasItems = ctx.items.length > 0

  const cartItemRemovehandler = id => {
    ctx.removeItem(id)
  }

  const cartItemHandler = item => {
    ctx.additem({...item, amount: 1})
  }

  const cartItems = <ul className={classes['cart-items']}>
    {ctx.items.map((item) => 
    <CartItem 
    key={item.id} 
    name={item.name} 
    amount={item.amount} 
    price={item.price} 
    onRemove={cartItemRemovehandler.bind(null, item.id)} 
    onAdd={cartItemHandler.bind(null, item)}
    />)} 
    </ul>
   
  const handleForm = () =>{
    setShowForm(!showForm)
  }

  const submitOrderHandler= async (useData) => {
    setIsSubmitting(true)
    try{
       await fetch('https://react-http-7cf50-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: useData,
          orderedItem: ctx.items
        })
      })
      setIsSubmitting(false);
      setDidSubmiting(true);
      ctx.clearCart();
      // if(response.ok){
      //   setError('All it is ok')
      // }
      // if(!response.ok){
      //   throw new Error('error sending order')
      // }
    }catch(err){
      setError('An error occurred while submiting the order')
      console.log(err)
    }
  }


  const cartModalContent = 
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm ? <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} onError={error} /> : (
        <>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={handleForm}>Order</button>}
          </div>
        </>
      )
      }
    </React.Fragment>
  
  const isSubmittingModaleContent = <p>Sending order data ...</p>

  const didSubmitModalContent = <React.Fragment>
     <div className={classes.actions} style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
      <p>Successfuly send the order!</p>
      <button className={classes.button} onClick={props.onClose}>Close</button>
     </div>
     </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
     
     {!isSubmitting && !didSubmiting && cartModalContent}
      {isSubmitting && isSubmittingModaleContent}
      {!isSubmitting && didSubmiting && didSubmitModalContent}

      
    </Modal>
  )
}



export default Cart;