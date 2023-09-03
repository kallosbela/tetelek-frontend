import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
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
  useOutsideClick
} from "@chakra-ui/react";
import { postNewRow } from "../api/postNewRow";

const ModalTetelekPost = ({ cikk, setTetelek, me, tetelek, setTablesChanged }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const [newRow, setNewRow] = useState({
    CSZ: "",
    MENNYISEG: 0,
    EGYSEGAR: 0,
  });

  const numberRegex = /^[0-9]{1,15}(.[0-9]{1,2})?$/;

  const submitHandler = async () => {
     if (!newRow.CSZ) {
      toast({
        title: 'Cikkszám nincs kiválasztva!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top'
      })
      return
    }
    if (!numberRegex.test(newRow.EGYSEGAR) || !numberRegex.test(newRow.MENNYISEG)) {
      toast({
        title: 'Számformátum nem megfelelő!',
        description: "A számok nemnegatívak, legfeljebb 15 számjegyből állhatnak és két tizedesjegyük lehet.",
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top'
      })
      return
    }
    const result = await postNewRow(newRow, "tetelek")
    if (result.data.status === 201) {
      toast({
        title: 'Az új sor rögzítésre került az adatbázisban',
        description: result.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top'
      })
      setTablesChanged(prev=>prev+1)
    }
    onClose()
  }

  return (
    <>
      <Button colorScheme={'blue'} onClick={onOpen} mt={'30px'}>Új sor rögzítése</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Új sor rögzítése</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Cikkszám</FormLabel>
              <Select placeholder="Válassz egy adatot!" value={newRow.CSZ} onChange={(e)=>setNewRow({ ...newRow, CSZ: e.target.value })}>
                {cikk &&
                  cikk.map((row, index) => (
                    <option key={uuid()} value={row.CSZ}>
                      {row.CSZ + " " + row.NEV}
                    </option>
                  ))}
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
              Mentés az adatbázisba
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

export default ModalTetelekPost;
