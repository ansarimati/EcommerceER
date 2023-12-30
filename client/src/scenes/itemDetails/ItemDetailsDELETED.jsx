import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart, decreaseCount, increaseCount } from "../../state";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const {itemId} = useParams();
  const {value, setValue} = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [itmes, setItems] = useState([]);

  const handledChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem () {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" } 
    );

    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }


  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line

  return (
    <Box
      width="80%"
      m="80px auto"
      display="flex"
      flexWrap="wrap"
      columnGap="40px"
    >
      {/* IMAGES */}
      <Box flex="1 1 40%" mb="40px">
        <img 
          alt={item?.name}
          width="100%"
          height="100%"
          src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
          style={{objectFit: "contain"}}
        />
      </Box>

      {/* ACTIONS */}
      <Box flex="1 1 50%" mb="40px">
        <Box display="flex" justifyContent="space-between">
          <Box>Home/Item</Box>
          <Box>Prev next</Box>
        </Box>

        <Box m="65px 0px 25px 0px">
          <Typography variant="h3">{item?.attributes?.name}</Typography>
          <Typography>{item?.attributes?.price}</Typography>
          <Typography sx={{mt: "20px"}}>{item?.attributes?.longDescription}</Typography>
        </Box>

        {/* COUNT AND BUTTON */}
        <Box display="flex" alignItems="center" minHeight="50px">
          <Box display="flex" alignItems="center" justifyContent="space-between" border={`1.5px solid ${shades.neutral[300]}`}
            mr="20px" p="2px 5px" width="20%"
          >
            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ p: "0 5px"}}>{count}</Typography>
            <IconButton onClick={() => setCount(count + 1)}>
              <AddIcon />
            </IconButton>
          </Box>

          <Button
            sx={{
              backgroundColor: "#222222",
              color: "white",
              minWidth: "150px",
              padding: "10px 40px"
            }}
            onClick={() => dispatch(addToCart({item: {...item, count}}))}
          >
            ADD TO CART
          </Button>
        </Box>

        
      </Box>
    </Box>
  )
}

export default ItemDetails