import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
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
const initialstate = {
  categories: [],
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
        categories: action.payload,
        isLoading: false,
        isError: false,
      };
    case "FETCH-FAILURE":
      return {
        ...state,
        categories: [],
        isLoading: false,
        isError: action.payload,
      };
    default:
      throw new Error();
  }
};

const TopCategores = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { categories, isLoading, isError } = state;

  const getData = () => {
    dispatch({ type: "FETCH-REQUEST" });
    axios
      .get("http://localhost:8080/Template")
      .then((res) => {
        dispatch({ type: "FETCH-SUCESS", payload: res.data });
        console.log("this is category data", res.data);
      })
      .catch((err) =>
        dispatch({
          type: "FETCH-FAILURE",
          payload: err.message,
        })
      );
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(categories);

  return (
    <Box>
      {/* this boc is from chakra UI */}
      <Heading>TOP CATEGORIES</Heading>
      <br />
      <Grid templateColumns="repeat(6,1fr)" gap={6}>
        {categories?.length &&
          categories.map((e) => (
            <Card maxW="md">
              <CardHeader>
                <Heading size="md">{e.title}</Heading>
              </CardHeader>
              <CardBody>
                <Heading size="md">{e.description}</Heading>
              </CardBody>
            </Card>
          ))}
      </Grid>
    </Box>
  );
};

export default TopCategores;
