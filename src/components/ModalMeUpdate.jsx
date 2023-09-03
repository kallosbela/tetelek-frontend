import React, { useState } from "react";
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
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { updateRow } from "../api/updateRow";
import { BsFillPencilFill } from "react-icons/bs";

const ModalMeUpdate = ({
  cikk,
  setTetelek,
  me,
  tetelek,
  setTablesChanged,
  row,
  currentTable,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newRow, setNewRow] = useState(row);

  const nevRegex = /^.{1,50}$/;

  const submitHandler = async () => {
    if (!newRow.NEV) {
      toast({
        title: "Minden mezőt ki kell tölteni!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const isExistNEV =
      me.filter((e) => e.NEV === newRow.NEV && e.NEV !== row.NEV).length > 0;
    if (isExistNEV) {
      toast({
        title: "Ilyen név már létezik!",
        description: "Minden névnek különbözőnek kell lennie.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!nevRegex.test(newRow.NEV)) {
      toast({
        title: "Név formátuma nem megfelelő!",
        description: "Legfeljebb 50 karakterből állhat.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const result = await updateRow(row.KOD, newRow, currentTable);
    if (result.status === 200) {
      toast({
        title: "A sor változtatásai rögzítésre kerültek az adatbázisban",
        description: result.data,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    setTablesChanged((prev) => prev + 1);
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
        <BsFillPencilFill onClick={onOpen} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sor adatainak módosítása</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Kód</FormLabel>
              <Tooltip label="Elsődleges kulcs, nem megváltoztatható">
                <Text fontSize="xl">{newRow.KOD}</Text>
              </Tooltip>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Név</FormLabel>
              <Input
                type="text"
                value={newRow.NEV}
                onChange={(e) => {
                  setNewRow({ ...newRow, NEV: e.target.value });
                }}
                maxLength={50}
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

export default ModalMeUpdate;
