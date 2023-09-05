import { AddIcon } from "@chakra-ui/icons";
import { 
  Box,  
  Flex, 
  IconButton, 
  Spacer, 
  Table, 
  Tbody, 
  // Td, 
  Th, 
  Thead, 
  Tr, 
  useColorModeValue, 
  useDisclosure
 } from "@chakra-ui/react";
import Card from "components/card/Card";
import FormModalCategory from "components/modal/FormModalCategory";
import FormModalEditCategory from "components/modal/FormModalEditCategory";
import FormModalConfirm from "components/modal/FormModalConfirm";
import ItemTableCategory from "components/table/ItemTableCategory";
import React, { useEffect, useState } from "react";

export default function CategoriesTable({ categories }) {
  //const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const iconColor = useColorModeValue("secondaryGray.800", "white");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
      onOpen();
    }
    
    // State para pegar tipo de categoria (Receita ou Despesa)
    // const [categoryType, setCategoryType] = useState([]);
    
    const token = localStorage.getItem("token");

    
    // State para pegar as categorias
    const [categorys, setCategorys] = useState([]);

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
        setCategorys(data.categorias);
      })
      .catch((error) => {
        console.error('error', error);
      })
    }, [token]);

    // -------------------------- Save Category --------------------------
    
    // State para salvar Categoria 
    const [category, setCategory] = useState({ nome: "" });
    const [toClick, setToClick] = useState(false);


    useEffect(() => {
      if(toClick){
        fetch("http://localhost:5000/categoria/user", { // Chamada para rota
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(category),
        })
          .then((res) => res.json())
          .then((data) => {  
            alert("Categoria salva com sucesso!");
            setCategory("");
            setToClick(false);
          })
          .catch((error) => {
            console.error("error", error);
          });
          onClose();
      }
    }, [toClick, category, token, onClose]);  // Adicionando o state toClick para que a função seja executada quando o state for alterado

   const handleSave = (e) => { // Função para salvar categoria
      e.preventDefault();

      let inputWithFilds = category.nome.length > 0; // Verificando se o input foi preenchido
      if(inputWithFilds){ // Se o input foi preenchido, ele cria um novo objeto com os dados do input e salva no state category
        let newCategory = {
          nome: category.nome
        }
        setCategory(newCategory); // Salvando no state category
        setToClick(true);
      } else {
        alert("Preencha todos os campos!");
      }
    }

    // const handleSave = async (e) => {
    //   e.preventDefault();

    //   try {
    //     const response = await fetch("http://localhost:5000/categoria/user", {
    //       method: "POST", 
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({
    //         category
    //       }),
    //     });

    //     const data = await response.json();
    //     alert(data.message);

    //     setCategory("");
    //   } catch (error) {
    //     console.error("error", error);
    //   }
    // };
    console.log()
    // -------------------------- Save Category --------------------------

    // -------------------------- Edit Category --------------------------

    const [categoryEdit, setCategoryEdit] = useState( null );
    const [showModalEdit, setShowModalEdit] = useState(false);

    const handleCategoryEdit = (category) => {
      if(category._id){
        setCategoryEdit((prevState) => ({ ...prevState, ...category }));
        setShowModalEdit(true);
      } else {
        console.error("O objeto category não possui o id");
      }
    }

    const handleEdit = () => {
      if(categoryEdit === null) {
        console.error("O objeto categoryEdit não possui o id");
        return;
      }
      fetch(`http://localhost:5000/categoria/${categoryEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryEdit),
      })
      .then((res) => res.json())
      .then((data) => {
        const getIdList = categorys.map(item => {
          // console.log("Antes do if: ", item._id, categoryEdit._id)
          if(item._id === categoryEdit._id){
            // console.log("Dentro do if: ", item._id, item.id, categoryEdit._id, categoryEdit.id)
            return categoryEdit;
          } else {
            // console.log("Dentro do else: ", item._id, item.id, categoryEdit._id, categoryEdit.id)
            return item;
          }
        })
        // console.log("Depois do if: ", categoryEdit._id, categoryEdit.id)
        setCategorys(getIdList);
        alert("Categoria editada com sucesso!");
      })
      .catch((error) => {
        console.error("error", error);
      })
      setShowModalEdit(false);
    }

    // -------------------------- Edit Category --------------------------

    // -------------------------- Delete Category --------------------------

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [categoryDelete, setCategoryDelete] = useState(null);

    const handleCategoryDelete = (category) => {
      if(category._id){
        setCategoryDelete(category);
        setShowModalConfirm(true);
      } else {
        console.error("O objeto category não possui o id");
      }
    }

    const handleDelete = () => {
      fetch(`http://localhost:5000/categoria/${categoryDelete._id}/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        const getIdList = categorys.filter(item => item._id !== categoryDelete._id);
        setCategorys(getIdList);
        alert("Categoria deletada com sucesso!");
      })
      .catch((error) => {
        console.error("error", error);
      })
      setShowModalConfirm(false);
    } 


    const itemTable = categorys.map((item) => (
      <ItemTableCategory 
        key={item._id}
        name={item.nome}
        data={item}
        onEdit={handleCategoryEdit}
        onDelete={handleCategoryDelete}
      />
      ));

  return (
    <>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}
        mb='10px'
      >
        <Flex px='25px' justify='space-between' mb='20px' align='center'>
          <Spacer />
          <Box>
            <IconButton 
              size='lg'
              icon={<AddIcon color={iconColor}/>}
              onClick={handleOpen}
            />
            <FormModalCategory 
              title="Nova Categoria"
              clickSave={handleSave}
              showModal={isOpen}
              closeModal={onClose}
              value={category}
              handleInputChange={setCategory}
            />
            <FormModalEditCategory 
              title="Editar categoria"
              value={categoryEdit}
              clickSave={handleEdit}
              showModal={showModalEdit}
              closeModal={() => setShowModalEdit(false)}
              handleInputChange={setCategoryEdit}
            />
            <FormModalConfirm 
              title={`Deseja realmente excluir a categoria ${categoryDelete?.nome}?`}
              clickSave={handleDelete}
              showModal={showModalConfirm}
              closeModal={() => setShowModalConfirm(false)}
            />
          </Box>
        </Flex>
      </Card>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Table variant='simple' color='gray.500' mb='24px'>
          <Thead>
            <Tr pe='10px' border={borderColor}>  
              {/* <Flex
                justify='space-between'
                align='center'
                fontSize={{ sm: "10px", lg: "12px" }}
                color='gray.400'> */}
                  <Th>Nome</Th>
                  <Th>Ações</Th>        
              {/* </Flex> */}
            </Tr>
          </Thead>
          <Tbody>
              {itemTable}
              {/* {category.length > 0 ? itemTable : <Tr><Td>Nenhuma categoria cadastrada</Td></Tr> } */}
          </Tbody>  
        </Table>    
      </Card>
    </>
  );
}