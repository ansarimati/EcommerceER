import React, {useEffect, useState} from 'react';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { setItem } from '../../state';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    console.log("items", items);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    

    const handledChange = (event, newValue) => {
      setValue(newValue);      
    };

    async function getItem() {
      const items = await fetch(
        "http://localhost:1337/api/items?populate=image",
        { method: "GET" } 
      );

      const itemsJson = await items.json();
      console.log("itemjson", itemsJson)
      dispatch(setItem(itemsJson.data));
    }

    useEffect(() => {
      getItem();
    }, []) // eslint-disable-line

    const topRatedItems = items.filter(
      (item) => item.attributes.category === "TopRated" 
    );

    const newArrivals = items.filter(
      (item) => item.attributes.category === "newArrivals" 
    );

    const bestSellers = items.filter(
      (item) => item.attributes.category === "bestSellers" 
    );
    
    console.log("items", items);
    console.log("best", bestSellers);
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant='h3' textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor='primary'
        value={value}
        onChange={handledChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap"
          }
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals"/>
        <Tab label="BEST SELLERS" value="bestSellers"/>
        <Tab label="TOP RATED" value="TopRated"/>
      </Tabs>

      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        { value === "all" && items.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`}/>
        ))}

        { value === "newArrivals" && newArrivals.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`}/>
        ))}

        { value === "bestSellers" && bestSellers.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`}/>
        ))} 

        { value === "TopRated" && topRatedItems.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`}/>
        ))}
      </Box>
    </Box>
  )
};

export default ShoppingList;