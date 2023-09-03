import { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { deleteRow } from "../api/deleteRow";

const ModalMeDelete = ({
  ID,
  tetelek,
  setTetelek,
  setTablesChanged,
  cikk,
  me,
  row,
  currentTable,
}) => {
  const toast = useToast();

  const deleteHandler = async (KOD) => {
    const isKodInCikk = cikk.filter((e) => e.ME === KOD).length > 0;
    if (isKodInCikk) {
      toast({
        title: "A sor nem törölhető az adatbázisból",
        description: "A mértékegység még szerepel a Cikk táblában!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const result = await deleteRow(KOD, currentTable);
    if (result.status === 200) {
      toast({
        title: "A sort töröltük az adatbázisból",
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

  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <BsFillTrashFill onClick={onOpen} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Biztosan törlöd a sort?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => deleteHandler(ID)}>
              Törlés
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

export default ModalMeDelete;
