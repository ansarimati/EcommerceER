import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenue from "./scenes/global/CartMenue";



const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, pathname)

  return null
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <ScrollToTop />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="/chekout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenue />
      </BrowserRouter>
    </div>
  );
}

export default App;
