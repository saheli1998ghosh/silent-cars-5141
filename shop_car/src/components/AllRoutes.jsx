import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cartpage from "../pages/Cartpage";
import SingleProduct from "../pages/SingleProduct";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/cartpage" element={<Cartpage />}></Route>
      <Route path="/singleproduct" element={<SingleProduct />}></Route>
    </Routes>
  );
};
export default AllRoutes;
