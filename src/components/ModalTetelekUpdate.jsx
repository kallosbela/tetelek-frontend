import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { BsFillPencilFill } from "react-icons/bs";
import { updateRow } from "../api/updateRow";

const ModalTetelekUpdate = ({
  row,
  cikk,
  setTetelek,
  me,
  tetelek,
  setTablesChanged,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newRow, setNewRow] = useState({
    ID: row.ID,
    CSZ: row.CSZ,
    MENNYISEG: row.MENNYISEG,
    EGYSEGAR: row.EGYSEGAR,
  });

  const numberRegex = /^[0-9]{1,15}(.[0-9]{1,2})?$/;

  const submitHandler = async () => {
    if (!newRow.CSZ) {
      toast({
        title: "Cikkszám nincs kiválasztva!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (
      !numberRegex.test(newRow.EGYSEGAR) ||
      !numberRegex.test(newRow.MENNYISEG)
    ) {
      toast({
        title: "Számformátum nem megfelelő!",
        description:
          "A számok nemnegatívak, legfeljebb 15 számjegyből állhatnak és két tizedesjegyük lehet.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const result = await updateRow(newRow.ID, newRow, "tetelek");

    if (result.status === 200) {
      toast({
        title: "A sor változtatásai rögzítésre kerültek az adatbázisban",
        description: result.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setTablesChanged((prev) => prev + 1);
    }

    onClose();
  };

  return (
    <>
      <Button
        _hover={{
          background: "gray.500",
          cursor: "pointer",
        }}
        onClick={onOpen}
        bg={"inherit"}
        p={0}
      >
        <BsFillPencilFill />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sor adatainak módosítása</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Cikkszám</FormLabel>
              <Select
                placeholder="Válassz egy adatot!"
                value={newRow.CSZ}
                onChange={(e) => setNewRow({ ...newRow, CSZ: e.target.value })}
              >
                {cikk.map((row, index) => {
                  return (
                    <option key={uuid()} value={row.CSZ}>
                      {row.CSZ + " " + row.NEV}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Mennyiség</FormLabel>
              <Input
                type="number"
                value={newRow.MENNYISEG}
                onChange={(e) => {
                  setNewRow({ ...newRow, MENNYISEG: e.target.value });
                }}
                min={0}
                max={999999999999999}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Egységár</FormLabel>
              <Input
                type="number"
                value={newRow.EGYSEGAR}
                onChange={(e) => {
                  setNewRow({ ...newRow, EGYSEGAR: e.target.value });
                }}
                min={0}
                max={999999999999999}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitHandler}>
              Adatok módosítása
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Mégse
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTetelekUpdate;
