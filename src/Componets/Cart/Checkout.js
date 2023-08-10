import React, { useState } from "react"
import classes from './Checkout.module.css';


const Checkout = (props) => {


  const [input, setInput] = useState({
    name: '',
    street: '',
    postal: '',
    city: '',
  })

  const [validate, setValidate] = useState({
    vName: true,
    vStreet: true,
    vPostal: true,
    vCity: true
  })

  const { name, street, postal, city } = input

  const validateName = name ? input.name.trim() !== '' : false;
  const validateStreet = street ? input.street.trim().length !== 0 : false;
  const validatePostal = postal ? input.postal.trim().length !== 0 : false;
  const validateCity = city ? input.city.trim().length !== 0 : false;

  const formIsValid =
    validateName &&
    validateStreet &&
    validatePostal &&
    validateCity

  const confirmHandler = (evt) => {    ///OK
    evt.preventDefault()
    setValidate({
      vName: validateName,
      vStreet: validateStreet,
      vPostal: validatePostal,
      vCity: validateCity
    })

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: name,
      street: street,
      postal: postal,
      city: city,
    });

    setInput({
      name:'',
      street: '',
      postal: '',
      city: ''
    })
  }


  const onBlurHandler = (fieldName, target) => {
    if (!input[target]) {
      setValidate((prev) => ({
        ...prev,
        [fieldName]: false,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        [fieldName]: true,
      }));
    }
  };

  const inputHandler = (evt) => {
    const { name, value } = evt.target
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  

  const nameControl = `${classes.control} ${validate.vName ? '' : classes.invalid}`;
  const streetControl = `${classes.control} ${validate.vStreet ? '' : classes.invalid}`;
  const postalControl = `${classes.control} ${validate.vPostal ? '' : classes.invalid}`;
  const cityControl = `${classes.control} ${validate.vCity ? '' : classes.invalid}`;

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={nameControl}>
        <label
          htmlFor="name">
          {validate.vName ? 'Your Name' : 'Enter a Valid name'}
        </label>
        <input
          type='text' id="name"
          value={input.name}
          name='name'
          onChange={inputHandler}
          onBlur={() => onBlurHandler('vName', 'name')}
        />
      </div>
      <div className={streetControl}>
        <label
          htmlFor="street">
          {validate.vStreet ? 'Street' : 'Enter you address'}
        </label>
        <input
          type='text'
          id="street"
          value={input.street}
          name='street'
          onChange={inputHandler}
          onBlur={() => onBlurHandler('vStreet', 'street')}
        />
      </div>
      <div className={postalControl}>
        <label
          htmlFor="postal">
          {validate.vPostal ? 'Postal Code' : 'Enter you Postal Code'}
        </label>
        <input
          type='text'
          id="postal"
          value={input.postal}
          name='postal'
          onChange={inputHandler}
          onBlur={() => onBlurHandler('vPostal', 'postal')}
        />
      </div>
      <div className={cityControl}>
        <label
          htmlFor="city">
          {validate.vCity ? 'City' : 'Enter city'}
        </label>
        <input
          type='text'
          id="city"
          value={input.city}
          name='city'
          onChange={inputHandler}
          onBlur={() => onBlurHandler('vCity', 'city')} />
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes.button} onClick={props.onCancel}>
          Cancel
        </button>
        <button
          disabled={!formIsValid}
          className={classes.submit}>Confirm</button>
          
      </div>
      
    </form>
  )
}

export default Checkout;