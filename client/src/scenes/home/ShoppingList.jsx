import React, {useEffect, useState} from 'react';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { setItem } from '../../state';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    console.log("🚀 ~ file: ShoppingList.jsx:11 ~ ShoppingList ~ items:", items)
    const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <div>ShoppingList</div>
  )
}

export default ShoppingList