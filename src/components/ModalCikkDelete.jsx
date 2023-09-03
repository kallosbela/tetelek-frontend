import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteRow } from "../api/deleteRow";

const ModalCikkDelete = ({
  ID,
  tetelek,
  setTablesChanged,
  currentTable,
}) => {
  const toast = useToast();

  const deleteHandler = async (ID) => {
    const isCszInTetelek = tetelek.filter((e) => e.CSZ === ID).length > 0;
    if (isCszInTetelek) {
      toast({
        title: "A sor nem törölhető az adatbázisból",
        description: "A cikkszám még szerepel a Tételek táblában!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const result = await deleteRow(ID, currentTable);
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
        <BsFillTrashFill />
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

export default ModalCikkDelete;
