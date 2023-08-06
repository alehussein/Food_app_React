import React, { useEffect, useState } from "react";
import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from './MealItem/MealItem'

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];



const AvailableMeals = () => {

  const [mealData, setMealData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [mealsError, setMealsError] = useState();

  useEffect(() => {

    const fetchData = async () => {
      const url = 'https://react-http-7cf50-default-rtdb.firebaseio.com/meals.json';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const dataMeals = await response.json();
      const mealsArray = []
      for (const key in dataMeals) {
        mealsArray.push({
          id: key,
          name: dataMeals[key].name,
          description: dataMeals[key].description,
          price: dataMeals[key].price
        })
      }
      setMealData(mealsArray);
      setIsLoading(false);
    }
    fetchData()
    .catch(error => {
      setIsLoading(false)
      setMealsError(error.message)
    });
  }, [])
  
  if(isloading) {
    return(
    <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
    )
  }

  if(mealsError){
    return(
      <section className={classes.mealsError}>
        <p>{mealsError}</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
    <ul>
      {mealData.map(items => {
        return (
           <MealItem 
           id={items.id}
           key={items.id} 
           name={items.name} 
           description={items.description} 
           price={items.price}/>
        )
      })}
    </ul>
    </Card>
    </section>
  )
}

export default AvailableMeals