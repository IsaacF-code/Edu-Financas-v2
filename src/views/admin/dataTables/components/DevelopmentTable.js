import { Table, Tbody, Td, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import ItemTable from "components/table/ItemTable";
import FormModalEdit from "components/modal/FormModalEdit"
import FormModalConfirm from "components/modal/FormModalConfirm"
import React, { useEffect, useState } from "react";

export default function DevelopmentTable () {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const token = localStorage.getItem("token");

  // categories
  const [categories, setCategpries] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/categoria', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setCategpries(data.categorias);
    })
    .catch((error) => {
      console.error('error', error);
    })
  }, [token]);

  // revenue
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

    //Edit

    const [EntryEdit, setEntryEdit] = useState( null );
    const [showModalEdit, setShowModalEdit] = useState(false);

    const handleOpenEditR = (entry) => {
      setEntryEdit((prev) => ({ ...prev, ...entry }))
      setShowModalEdit(true);
    }

    const handleEdit = () => {
      fetch(`http://localhost:5000/receita/${EntryEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(EntryEdit),
      })
      .then((res) => res.json())
      .then((data) => {
        const getIdList = revenues.map(item => {
          if (item._id === EntryEdit._id) {
            return EntryEdit;
          } else {
            return item; 
          }
        })
        setRevenues(getIdList);
      })
      .catch((error) => {
        console.error('error', error);
      })
      setShowModalEdit(false);
    }


    // Delete

    const [entryDelete, setEntryDelete] = useState(null);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

   const handleEntryDelete = (entry) => {
      if(entry._id){
        setEntryDelete(entry);
        setShowModalConfirm(true);
      } else {
        console.error("O objeto não possui um id");
      }
    }

    const handleDelete = () => {
      fetch(`http://localhost:5000/receita/${entryDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if(res.status === 204) {
          const getIdList = revenues.filter(item => item._id !== entryDelete._id);
          setRevenues(getIdList);
          alert("Categoria deletada com sucesso!");
        } else {
          alert("Erro ao deletar categoria!");
        }
      })
      .catch((error) => {
        console.error('error', error);
      })
      setShowModalConfirm(false);
    }
    

    const itemTable = revenues.map((item) => (
      <ItemTable 
        key={item._id}
        name={item.descricao}
        value={item.valor}
        category={item.categoria}
        data={item}
        onEdit={handleOpenEditR}
        onDelete={handleEntryDelete}
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
         <FormModalEdit 
          title="Editar Receita"
          options={categories}
          showModal={showModalEdit}
          closeModal={() => setShowModalEdit(false)}
          clickSave={handleEdit}
          defaultValue={EntryEdit}
          handleInputChange={setEntryEdit}
        />
        <FormModalConfirm 
          title={`Deseja realmente excluir a categoria ${entryDelete?.descricao}?`}
          clickSave={handleDelete}
          showModal={showModalConfirm}
          closeModal={() => setShowModalConfirm(false)}
        />
        <Table variant='simple' color={textColor} mb='24px'>
          <Thead>
            <Tr>
              <Td>Nome</Td>
              <Td>Valor</Td>
              <Td>Categoria</Td>
              <Td>Ações</Td>
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