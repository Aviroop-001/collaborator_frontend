
import { BrowserRouter as Router } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import API from "../api";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Link as ChakraLink,
  Text,
  Center,
} from "@chakra-ui/react";

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);

  //functions
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerUser = await API.post("/auth/register", {
        username,
        password,
      });
      toast({
        title: "Welcome new User",
        description: "It's your home!!!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      registerUser.data && window.location.replace("/login");
    } catch (err) {
      seterror(true);
      toast({
        title: "Shit happens :(",
        description: "Might be your fault!! Try AGAIN.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Center
      minHeight="100vh"
    >
      <Box
        textAlign='center'
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        w="300px"
        bg="white"
      >
        <Heading mb={4} textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="username">Userame</FormLabel>
            <Input
              type="text"
              id="username"
              placeholder="Enter your Username"
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
              placeholder="Enter Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit">
            Register
          </Button>
        </form>

        <Button
          as={RouterLink}
          to="/login"
          variant="outline"
          colorScheme="teal"
          mt={4}
        >
          <ChakraLink>LOGIN</ChakraLink>
        </Button>
      </Box>

      {error && (
        <Text mt={4} fontSize="1.2rem" color="red" fontWeight="bold">
          Username already in use!
        </Text>
      )}
    </Center>
  );
};

export default Register;
