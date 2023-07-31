import React, { useState } from "react";
import Cart from "./Componets/Cart/Cart";
import Header from "./Componets/Layout/Header";
import Meals from "./Componets/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShow, setCartIsShow] = useState(false)
  
  const showCartHandler = () => {
    setCartIsShow(true)
  }

  const hideCartHandler = () => {
    setCartIsShow(false)
  }


  return (
    <CartProvider>
      { cartIsShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
