import ModalTetelekPost from "./ModalTetelekPost";
import ModalTetelekDelete from "./ModalTetelekDelete";
import ModalTetelekUpdate from "./ModalTetelekUpdate";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export const Tetelek = ({
  tetelek,
  me,
  cikk,
  setTetelek,
  setTablesChanged,
  currentTable,
}) => {
  const [isAscending, setIsAscending] = useState(true);
  const [column, setColumn] = useState("ID");

  const compare = (column, isAscending) => (a, b) => {
    if (column === "ID" || column === "MENNYISEG" || column === "EGYSEGAR") {
      return isAscending ? a[column] - b[column] : b[column] - a[column];
    } else if (column === "NEV" || column === "ME") {
      let result;
      let x = cikk.find((e) => e.CSZ === a.CSZ)[column].toLowerCase();
      let y = cikk.find((e) => e.CSZ === b.CSZ)[column].toLowerCase();
      if (x < y) {
        result = -1;
      } else if (x > y) {
        result = 1;
      } else {
        result = 0;
      }
      return isAscending ? result : -1 * result;
    } else if (column === "CSZ") {
      let result;
      let x = a.CSZ.toLowerCase();
      let y = b.CSZ.toLowerCase();
      if (x < y) {
        result = -1;
      } else if (x > y) {
        result = 1;
      } else {
        result = 0;
      }
      return isAscending ? result : -1 * result;
    } else if (column === "OSSZERTEK") {
      let result = a.MENNYISEG * a.EGYSEGAR - b.MENNYISEG * b.EGYSEGAR;
      return isAscending ? result : -1 * result;
    }
  };

  return (
    <VStack>
      <ModalTetelekPost
        cikk={cikk}
        setTetelek={setTetelek}
        me={me}
        tetelek={tetelek}
        setTablesChanged={setTablesChanged}
      />
      <div>
        {tetelek && me && cikk && (
          <TableContainer mb="50px">
            <Table variant="striped" colorScheme="teal">
              <TableCaption placement="top">Tételek táblája</TableCaption>
              <Thead>
                <Tr>
                  <Th
                    _hover={{
                      background: "gray.400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setColumn("ID");
                      setIsAscending(!isAscending);
                    }}
                    bg={"inherit"}
                    m={0}
                  >
                    ID
                  </Th>
                  <Th
                    _hover={{
                      background: "gray.400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setColumn("CSZ");
                      setIsAscending(!isAscending);
                    }}
                    bg={"inherit"}
                    m={0}
                  >
                    Cikkszám
                  </Th>
                  <Th
                    _hover={{
                      background: "gray.400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setColumn("NEV");
                      setIsAscending(!isAscending);
                    }}
                    bg={"inherit"}
                    m={0}
                  >
                    Név
                  </Th>
                  <Th
                    _hover={{
                      background: "gray.400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setColumn("MENNYISEG");
                      setIsAscending(!isAscending);
                    }}
                    bg={"inherit"}
                    m={0}
                  >
                    Mennyiség
                  </Th>
                  <Th
                    _hover={{
                      background: "gray.400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setColumn("ME");
                      setIsAscending(!isAscending);
                    }}
                    bg={"inherit"}
                    m={0}
                  >
                    Egység
                  </Th>
                  <Th
                    _hover={{
                      background: "gray.400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setColumn("EGYSEGAR");
                      setIsAscending(!isAscending);
                    }}
                    bg={"inherit"}
                    m={0}
                  >
                    Egységár
                  </Th>
                  <Th
                    _hover={{
                      background: "gray.400",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setColumn("OSSZERTEK");
                      setIsAscending(!isAscending);
                    }}
                    bg={"inherit"}
                    m={0}
                  >
                    Összérték
                  </Th>
                  <Th>Műveletek</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tetelek
                  .sort(compare(column, isAscending))
                  .map((item, index) => (
                    <Tr key={Math.random()}>
                      <Td>{item.ID}</Td>
                      <Td>{item.CSZ}</Td>
                      <Td>{cikk.filter((e) => e.CSZ === item.CSZ)[0].NEV}</Td>
                      <Td>{Number(item.MENNYISEG).toFixed(2)}</Td>
                      <Td>{cikk.filter((e) => e.CSZ === item.CSZ)[0].ME}</Td>
                      <Td>{Number(item.EGYSEGAR).toFixed(2)}</Td>
                      <Td>
                        {(
                          Number(item.EGYSEGAR) * Number(item.MENNYISEG)
                        ).toFixed(2)}{" "}
                        Ft
                      </Td>
                      <Td>
                        <HStack>
                          <ModalTetelekDelete
                            ID={item.ID}
                            tetelek={tetelek}
                            setTetelek={setTetelek}
                            setTablesChanged={setTablesChanged}
                            currentTable={currentTable}
                          />
                          <ModalTetelekUpdate
                            ID={item.ID}
                            tetelek={tetelek}
                            setTetelek={setTetelek}
                            setTablesChanged={setTablesChanged}
                            row={item}
                            cikk={cikk}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
    </VStack>
  );
};

export default Tetelek;
