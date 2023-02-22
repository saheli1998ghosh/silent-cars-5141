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
  hood: [],
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
        hood: action.payload,
        isLoading: false,
        isError: false,
      };
    case "FETCH-FAILURE":
      return {
        ...state,
        hood: [],
        isLoading: false,
        isError: action.payload,
      };
    default:
      throw new Error();
  }
};
  const UnderTheHood = () => {
    const [state, dispatch] = useReducer(reducer, initialstate);
    const { hood, isLoading, isError } = state;

    const getData = () => {
      dispatch({ type: "FETCH-REQUEST" });
      axios
        .get(" http://localhost:8080/UNDERTHEHOODSAVINGS")
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
    console.log(hood);

    return (
      <Box>
        {/* this boc is from chakra UI */}
        <Heading>Under The Hood Savings</Heading>
        <br />
        <Grid templateColumns="repeat(6,1fr)" gap={6}>
          {hood?.length &&
            hood.map((e) => (
              <Card maxW="md">
                <CardBody>
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={e.image}
                    alt=""
                    borderRadius="lg"
                  />
                </CardBody>
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

export default UnderTheHood;