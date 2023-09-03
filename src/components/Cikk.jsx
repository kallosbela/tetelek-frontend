import ModalCikkUpdate from "./ModalCikkUpdate";
import ModalCikkPost from "./ModalCikkPost";
import ModalCikkDelete from "./ModalCikkDelete";
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

export const Cikk = ({
  tetelek,
  me,
  cikk,
  setTetelek,
  setTablesChanged,
  currentTable,
}) => {
  return (
    <VStack>
      <ModalCikkPost
        cikk={cikk}
        setTetelek={setTetelek}
        me={me}
        tetelek={tetelek}
        setTablesChanged={setTablesChanged}
      />
      <div>
        {tetelek && me && cikk && (
          <TableContainer mb={"50px"}>
            <Table variant="striped" colorScheme="teal">
              <TableCaption placement={"top"}>Cikk tábla</TableCaption>
              <Thead>
                <Tr>
                  <Th>Cikkszám</Th>
                  <Th>Név</Th>
                  <Th>Egység</Th>
                  <Th>Műveletek</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cikk &&
                  cikk.map((row, index) => (
                    <Tr key={Math.random()}>
                      <Td>{row.CSZ}</Td>
                      <Td>{row.NEV}</Td>
                      <Td>{row.ME}</Td>
                      <Td>
                        <HStack>
                          <ModalCikkDelete
                            ID={row.CSZ}
                            tetelek={tetelek}
                            setTetelek={setTetelek}
                            setTablesChanged={setTablesChanged}
                            currentTable={currentTable}
                            cikk={cikk}
                            me={me}
                            row={row}
                          />
                          <ModalCikkUpdate
                            tetelek={tetelek}
                            setTetelek={setTetelek}
                            setTablesChanged={setTablesChanged}
                            row={row}
                            cikk={cikk}
                            me={me}
                            currentTable={currentTable}
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

export default Cikk;