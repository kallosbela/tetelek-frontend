import React, { useEffect, useState } from "react";
import { getTable } from "../api/getTable";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { Tetelek } from "./Tetelek";
import { Cikk } from "./Cikk";
import { Me } from "./Me";

const Tables = ({setIsAuthenticated}) => {
  const [tetelek, setTetelek] = useState(null);
  const [me, setMe] = useState(null);
  const [cikk, setCikk] = useState(null);
  const [loadingTETELEK, setLoadingTETELEK] = useState(false);
  const [loadingCIKK, setLoadingCIKK] = useState(false);
  const [loadingME, setLoadingME] = useState(false);
  const [currentTable, setCurrentTable] = useState(null);
  const [tablesChanged, setTablesChanged] = useState(0)

  const getAllTables = async () => {
    const responseTetelek = await getTable("tetelek");
    setTetelek(responseTetelek);
    const responseMe = await getTable("me");
    setMe(responseMe);
    const responseCikk = await getTable("cikk");
    setCikk(responseCikk);
  } 

  useEffect(()=>{
    getAllTables()
  },[tablesChanged])

  const fetchData = async (table) => {
    switch (table) {
      case "tetelek":
        setLoadingTETELEK(true);
        break;
      case "cikk":
        setLoadingCIKK(true);
        break;
      case "me":
        setLoadingME(true);
        break;
    }
    setCurrentTable(table)
    try {
      const responseTetelek = await getTable("tetelek");
      setTetelek(responseTetelek);
      const responseMe = await getTable("me");
      setMe(responseMe);
      const responseCikk = await getTable("cikk");
      setCikk(responseCikk);
      setLoadingTETELEK(false);
      setLoadingCIKK(false);
      setLoadingME(false);
    } catch (err) {
      console.error(err);
      setLoadingTETELEK(false);
      setLoadingCIKK(false);
      setLoadingME(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false)
  }

  return (
    <VStack>
      <HStack>
        <Button isLoading={loadingTETELEK} onClick={()=>fetchData("tetelek")} colorScheme={"green"}>
          TÉTELEK tábla betöltése
        </Button>
        <Button isLoading={loadingCIKK} onClick={()=>fetchData("cikk")} colorScheme={"green"}>
          CIKK tábla betöltése
        </Button>
        <Button isLoading={loadingME} onClick={()=>fetchData("me")} colorScheme={"green"}>
          ME tábla betöltése
        </Button>
        <Button onClick={logout} colorScheme={"green"}>
          Kilépés
        </Button>
      </HStack>
      {tetelek && me && cikk && currentTable === "tetelek" && <Tetelek tetelek={tetelek} me={me} cikk={cikk} setTetelek={setTetelek} setTablesChanged={setTablesChanged} currentTable={currentTable}/>}
      {tetelek && me && cikk && currentTable === "cikk" && <Cikk tetelek={tetelek} me={me} cikk={cikk} setTablesChanged={setTablesChanged} currentTable={currentTable}/>}
      {tetelek && me && cikk && currentTable === "me" && <Me tetelek={tetelek} me={me} cikk={cikk} setTablesChanged={setTablesChanged} currentTable={currentTable}/>}
    </VStack>
  );
};

export default Tables;