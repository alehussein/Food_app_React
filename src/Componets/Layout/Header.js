import React, { Fragment } from 'react';
import classes from './Header.module.css'
import image from '../../assets/meals.jpg'
import Button from '../UI/Button';

const Header = (props) => {
  return (
    <Fragment >
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <Button onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={image} alt='meals_img'/>
      </div>
    </Fragment>
  )
}

export default Header