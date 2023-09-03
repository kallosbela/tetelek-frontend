import ModalMeUpdate from "./ModalMeUpdate";
import ModalMePost from "./ModalMePost";
import ModalMeDelete from "./ModalMeDelete";
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

export const Me = ({
  tetelek,
  me,
  cikk,
  setTetelek,
  setTablesChanged,
  currentTable,
}) => {
  return (
    <VStack>
      <ModalMePost
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
              <TableCaption placement={"top"}>ME tábla</TableCaption>
              <Thead>
                <Tr>
                  <Th>Kód</Th>
                  <Th>Név</Th>
                  <Th>Műveletek</Th>
                </Tr>
              </Thead>
              <Tbody>
                {me &&
                  me.map((e, index) => (
                    <Tr key={Math.random()}>
                      <Td>{e.KOD}</Td>
                      <Td>{e.NEV}</Td>
                      <Td>
                        <HStack>
                          <ModalMeDelete
                            ID={e.KOD}
                            tetelek={tetelek}
                            setTetelek={setTetelek}
                            setTablesChanged={setTablesChanged}
                            currentTable={currentTable}
                            cikk={cikk}
                            me={me}
                            row={e}
                          />
                          <ModalMeUpdate
                            tetelek={tetelek}
                            setTetelek={setTetelek}
                            setTablesChanged={setTablesChanged}
                            row={e}
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

export default Me;