import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from './Button.module.css'
import CartIcon from "./CartIcon.js";

const Button = (props) => {
  const [btnHigh, setBtnHigh] = useState(false)
  const ctx = useContext(CartContext)
  const { items } = ctx

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)
  const btnClasses = `${classes.button} ${btnHigh ? classes.bump : ''}`
  

  useEffect(() => {
    if(items.length === 0){
      return 
    }
    setBtnHigh(true);
    const timer = setTimeout(() => {
      setBtnHigh(false)
    } ,300)

    return() =>{
      clearTimeout(timer);  //clearner function
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>

  )
}

export default Button;