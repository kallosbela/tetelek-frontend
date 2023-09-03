import { useEffect, useState } from "react";
import "./App.css";
import { Tables } from "./components/Tables";
import SignInComponent from "./components/SignIn";
import jwt_decode from "jwt-decode";
import {
  Box,
  Heading,
  VStack,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      console.log("Expiration Time:", new Date(decoded.exp * 1000));
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp >= currentTime) {
        setIsAuthenticated(true);
      } else {
        console.error("A token érvénytelen vagy lejárt.");
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    <div className="App">
      <Card variant={"filled"} mt={"20px"}>
        <CardHeader>
          <Heading size="4xl" mt={"40px"} textAlign={"center"}>
            PMCode
          </Heading>
        </CardHeader>
        <CardBody>
          <Heading size="2xl" m={"20px"}>
            készletnyilvántartás próbafeladat
          </Heading>
        </CardBody>
      </Card>

      {isAuthenticated ? (
        <Tables setIsAuthenticated={setIsAuthenticated}/>
      ) : (
        <SignInComponent setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
};

export default App;
