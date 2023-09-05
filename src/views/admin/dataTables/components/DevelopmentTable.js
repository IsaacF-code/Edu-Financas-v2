import { Table, Tbody, Td, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import ItemTable from "components/table/ItemTable";
import React, { useEffect, useState } from "react";

export default function DevelopmentTable () {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const token = localStorage.getItem("token");

  const [revenues, setRevenues] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/receita', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setRevenues(data);
      })
      .catch((error) => {
        console.error('error', error);
      })
    }, [token]);

    const itemTable = revenues.map((item) => (
      <ItemTable 
        key={item.id}
        name={item.nome}
        value={item.valor}
        category={item.categoria}
      />
    ))

  return (
    <>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Table variant='simple' color={textColor} mb='24px'>
          <Thead>
            <Tr>
              <Td>Nome</Td>
              <Td>Valor</Td>
              <Td>Categoria</Td>
            </Tr>
          </Thead>
          <Tbody>
            {revenues.length > 0 ? itemTable : <Tr><Td>Não há receitas cadastradas</Td></Tr>}
          </Tbody>
        </Table>  
      </Card>
    </>
  );
}