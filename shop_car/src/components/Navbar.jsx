import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Box, ButtonGroup, Container, Flex, HStack } from "@chakra-ui/react";

const Navbar = () => {
  const LinkForRouters = [
    { path: "/", title: "Home" },
    { path: "/cartpage", title: "Cartpage" },
    { path: "/login", title: "Login" },
    { path: "/signup", title: "Signup" },
    { path: "/singleproduct", title: "SingleProduct" },
  ];

  return (
    <Box as="nav" bg="tomato" boxShadow="sm">
      <Container py={{ base: "7", lg: "10" }}>
        <Flex align={"center"} justifyContent={"space-around"}>
          <ButtonGroup variant="link" spacing="150">
            {LinkForRouters.map((e) => (
              <RouterLink key={e.path} to={e.path}>
                {e.title}
              </RouterLink>
            ))}
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
