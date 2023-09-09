// import "./Login.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { Context } from "../context/Context";
import {
  Center,
  useToast,
  Grid,
  GridItem,
  Text,
  Divider,
  Flex,
  Tooltip, List, ListItem, Container, VStack
} from "@chakra-ui/react";
import API from "../api";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { generateSnippet } from "../functions/generateSnippet";

const Home = () => {
  const { user, dispatch } = useContext(Context);
  const [myDocs, setMyDocs] = useState([]);
  const toast = useToast();

  const handleNewDocument = () => {};

  const handleFetchMyDocs = async () => {
    await API.get(`/document/user/${user._id}`)
      .then((response) => {
        setMyDocs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user documents:", error);
      });
  };

  const logoutHandler = () => {
    try {
      console.log("logout tried");
      dispatch({ type: "LOGOUT" });
      console.log("logout success");
      toast({
        title: "Logged out!!!",
        description: "Log out successful. You can login again",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong :(",
        description: "Couldn't log out. Try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    handleFetchMyDocs()
  }, [user]);

  return (
    <Container maxW="100vw" centerContent>
      <Heading as="h1" size="xl" mb={20}>
        Collaborator
      </Heading>
      <Flex width="30vw" justifyContent="space-between">
        <Link to="/new-document">
          <Button colorScheme="blue" size="md" mb={4}>
            Create New Document
          </Button>
        </Link>
        <Button colorScheme="red" size="md" onClick={logoutHandler}>
          Logout
        </Button>
      </Flex>

      <Box mt={8} width="60vw">
        <Heading as="h5" size="md" mb={3} textAlign="left">
          Your Documents:
        </Heading>
        <VStack spacing={4} align="stretch">
          {myDocs.map((document) => (
            <Link key={document._id} to={`/doc/${document._id}`}>
              <Flex
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                cursor="pointer"
                _hover={{ bg: "blue.100" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <VStack spacing={2} alignItems="start">
                  <Text fontSize="lg">{document.title}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Created on: {new Date(document.createdAt).toDateString()}
                  </Text>
                </VStack>
                <Text fontSize="sm" color="gray.600">
                  {generateSnippet(document.content)}
                </Text>
              </Flex>
            </Link>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Home;
