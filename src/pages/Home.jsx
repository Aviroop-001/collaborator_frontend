// import "./Login.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { ExternalLinkIcon, AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
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

const Home = () => {
  const { user, dispatch } = useContext(Context);
  const [myDocs, setMyDocs] = useState([]);
  const toast = useToast();

  const handleNewDocument = async () => {
    try {
      const response = await API.post("document/create", {
        userID: user._id,
      });
      const newDocumentId = response.data._id;
      window.location.href = `/doc/${newDocumentId}`;
    } catch (error) {
      console.error("Error creating a new document:", error);
      toast({
        title: "Something went wrong :(",
        description: "Couldn't create new doc",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

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
      <Flex width="20vw" justifyContent="space-around">
        <Tooltip label="New Doc">
          <Button
            colorScheme="white"
            size="md"
            mb={4}
            onClick={handleNewDocument}
          >
            <AddIcon w={7} h={7} color="green.500" />
          </Button>
        </Tooltip>
        <Tooltip label="Logout !!!">
          <Button colorScheme="white" size="md" onClick={logoutHandler}>
            <ExternalLinkIcon w={7} h={7} color="red.500" />
          </Button>
        </Tooltip>
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
              </Flex>
            </Link>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Home;
