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

const ModalCikkPost = ({ cikk, setTetelek, me, tetelek, setTablesChanged }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newRow, setNewRow] = useState({
    CSZ: "",
    NEV: "",
    ME: "",
  });

  const cszRegex = /^.{1,14}$/;
  const nevRegex = /^.{1,150}$/;

  const submitHandler = async () => {
    if (!newRow.CSZ || !newRow.NEV || !newRow.ME) {
      toast({
        title: "Minden mezőt ki kell tölteni!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!cszRegex.test(newRow.CSZ)) {
      toast({
        title: "Cikkszám formátuma nem megfelelő!",
        description: "Legfeljebb 14 karakterből állhat.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const isExistCSZ = cikk.filter((row) => row.CSZ === newRow.CSZ).length > 0;
    if (isExistCSZ) {
      toast({
        title: "Ilyen cikkszám már létezik!",
        description: "Minden cikkszámnak különbözőnek kell lennie.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const isExistNEV = cikk.filter((row) => row.NEV === newRow.NEV).length > 0;
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
        description: "Legfeljebb 150 karakterből állhat.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const result = await postNewRow(newRow, "cikk");
 
    if (result.status === 200) {
      toast({
        title: "Az új sor rögzítésre került az adatbázisban",
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
              <FormLabel>Cikkszám</FormLabel>
              <Input
                type="text"
                value={newRow.CSZ}
                onChange={(e) => {
                  setNewRow({ ...newRow, CSZ: e.target.value });
                }}
                maxLength={14}
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
                maxLength={150}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>ME</FormLabel>
              <Select
                placeholder="Válassz egy adatot!"
                value={newRow.ME}
                onChange={(e) => setNewRow({ ...newRow, ME: e.target.value })}
              >
                {me &&
                  me.map((row) => (
                    <option key={Math.random()} value={row.KOD}>
                      {row.KOD + " " + row.NEV}
                    </option>
                  ))}
              </Select>
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

export default ModalCikkPost;
