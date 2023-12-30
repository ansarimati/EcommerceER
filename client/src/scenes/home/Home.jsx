import React from 'react';
import TempCarousel from './TempCarousel';
import ShoppingList from './ShoppingList';
import Subscribe from './Subscribe';


const Home = () => {
  return (
    <div className='home'>
      <TempCarousel />
      <ShoppingList />
      <Subscribe />
      
    </div>
  )
}

export default Home;