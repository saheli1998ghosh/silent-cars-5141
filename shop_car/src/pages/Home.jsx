import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import TopCategores from "../pages/TopCategores";
import UnderTheHood from "../pages/UnderTheHood";
import {
  Box,
  Grid,
  Heading,
  GridItem,
  ButtonGroup,
  Divider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";

const initialStage = {
  products: [],
  isLoading: false,
  isError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH-REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH-SUCESS":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isError: false,
      };
    case "FETCH-FAILURE":
      return {
        ...state,
        products: [],
        isLoading: false,
        isError: action.payload,
      };
    default:
      throw new Error();
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialStage);
  const { products, isLoading, isError } = state;
  const getData = () => {
    dispatch({ type: "FETCH-REQUEST" });
    axios
      .get("http://localhost:8080/TOPCATEGORIES")
      .then((res) => {
        dispatch({ type: "FETCH-SUCESS", payload: res.data });
        console.log("this is raw data--->", res.data);
      })
      .catch((err) =>
        dispatch({ type: "FETCH-FAILURE", payload: err.message })
      );
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(products);

  return (
    <Box>
      {/* this boc is from chakra UI */}
      <Heading>TOP CATEGORIES</Heading>
      <br />
      <Grid templateColumns="repeat(6,1fr)" gap={6}>
        {products?.length &&
          products.map((e) => (
            <Card maxW="md">
              <CardHeader>
                <Heading size="md">{e.title}</Heading>
              </CardHeader>
              <CardBody>
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={e.image}
                  alt=""
                  borderRadius="lg"
                />
              </CardBody>
              <Divider />

              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button>
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
      </Grid>
      <Divider />
      <TopCategores />
      <Divider />
      <UnderTheHood />
    </Box>
  );
};
export default Home;
