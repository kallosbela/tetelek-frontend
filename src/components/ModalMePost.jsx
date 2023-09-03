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
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { postNewRow } from "../api/postNewRow";

const ModalMePost = ({ cikk, setTetelek, me, tetelek, setTablesChanged }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newRow, setNewRow] = useState({
    KOD: "",
    NEV: "",
  });

  const kodRegex = /^.{1,5}$/;
  const nevRegex = /^.{1,50}$/;

  const submitHandler = async () => {
    if (!newRow.KOD || !newRow.NEV) {
      toast({
        title: "Minden mezőt ki kell tölteni!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!kodRegex.test(newRow.KOD)) {
      toast({
        title: "Cikkszám formátuma nem megfelelő!",
        description: "Legfeljebb 5 karakterből állhat.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const isExistKOD = me.filter((e) => e.KOD === newRow.KOD).length > 0;
    if (isExistKOD) {
      toast({
        title: "Ilyen kód már létezik!",
        description: "Minden kódnak különbözőnek kell lennie.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const isExistNEV = me.filter((e) => e.NEV === newRow.NEV).length > 0;
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

    const result = await postNewRow(newRow, "me");
    if (result.status === 200) {
      toast({
        title: "Az új sor rögzítésre került az adatbázisban",
        description: result.message,
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
      <Button colorScheme={"blue"} onClick={onOpen} mt={"30px"}>
        Új sor rögzítése
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Új sor rögzítése</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Kód</FormLabel>
              <Input
                type="text"
                value={newRow.KOD}
                onChange={(e) => {
                  setNewRow({ ...newRow, KOD: e.target.value });
                }}
                maxLength={5}
              />
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

export default ModalMePost;
