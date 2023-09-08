// import "./Login.scss";
// import { BrowserRouter as Router } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useContext, useRef } from "react";
import { Context } from "../context/Context";
import { useToast } from "@chakra-ui/react";
import API from "../api";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Center,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Login = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //functions
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast({
        title: "Welcome _/_",
        description: "Have fun!!!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast({
        title: "Shit happens :(",
        description: "Might be your fault!! Check the credentials.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Center minHeight="100vh">
      <Box
        p={6}
        textAlign="center"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        w="300px"
        bg="white"
      >
        <Heading mb={4} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              id="username"
              placeholder="Enter Username"
              autoComplete="off"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter your Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isFetching}
            type="submit"
          >
            LOGIN
          </Button>
        </form>

        <Button
          as={RouterLink} // Use 'as' prop to define a custom link component
          to="/register"
          variant="outline"
          colorScheme="green"
          mt={4}
        >
          <ChakraLink>REGISTER</ChakraLink>
        </Button>
      </Box>
    </Center>
  );
};

export default Login;
