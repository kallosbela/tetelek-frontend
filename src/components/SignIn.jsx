import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  VStack,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";

const SignInComponent = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ user: "", password: "" });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "https://expressbackendtask-production.up.railway.app/api/login",
      formData
    );
    if (result.status === 200) {
      localStorage.setItem("token", result.data.token);
      setIsAuthenticated(true);
    } else {
      console.log("Error");
      localStorage.setItem("token", null);
      setIsAuthenticated(false);
    }
  };

  return (
    <VStack>
      <FormControl w={"80%"} mt={10}>
        <FormLabel>Felhasználónév</FormLabel>
        <Input
          type={"user"}
          value={formData.user}
          onChange={(e) => setFormData({ ...formData, user: e.target.value })}
        />
        <FormLabel mt={"10px"}>Jelszó</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Elrejtés" : "Megmutat"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button mt={"10px"} colorScheme="blue" onClick={onSubmit}>
          Belépés a programba
        </Button>
      </FormControl>
    </VStack>
  );
};

export default SignInComponent;
