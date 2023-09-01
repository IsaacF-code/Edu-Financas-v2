import { AddIcon } from "@chakra-ui/icons";
import { 
  Box, 
  Button, 
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
        setCategorys(data);
      })
      .catch((error) => {
        console.error('error', error);
      })
    }, [token]);

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
            console.log("useEffect: ", category)
            
            alert(data.message);
            setCategory("");
            setToClick(false);
            console.log("useEffect --: ", category)
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    }, [toClick, category, token]);  // Adicionando o state toClick para que a função seja executada quando o state for alterado

   const handleSave = (e) => { // Função para salvar categoria
      e.preventDefault();
      
      console.log("Antes do if: ", category)

      let inputWithFilds = category.nome.length > 0; // Verificando se o input foi preenchido
      if(inputWithFilds){ // Se o input foi preenchido, ele cria um novo objeto com os dados do input e salva no state category
        let newCategory = {
          nome: category.nome
        };
        console.log("dentro do if: ", category)
        setCategory(newCategory); // Salvando no state category
        setToClick(true);
      } else {
        alert("Preencha todos os campos!");
      }
      console.log("Depois do if: ", category)
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

    const [dataToRender, setDataToRender] = useState([]);

    // const dataOne = [
    //   {
    //     id: 1,
    //     nome: "Salário",
    //     type: "Receita",
    //   },
    //   {
    //     id: 2,
    //     nome: "Prêmio",
    //     type: "Receita",
    //   },
    // ];

    const dataTwo = [
      {
        id: 1,
        nome: "Essenciais",
        type: "Despesa",
      },
      {
        id: 2,
        nome: "Lazer",
        type: "Despesa",
      },
    ];

    const itemTable = dataToRender.map((item) => (
      <ItemTableCategory 
        key={item.id}
        name={item.nome}
      />
      ))

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
          <Box mr='10px'>
            <Button color="green.400" onClick={() => {
                setDataToRender(categorys)
                console.log("Passou aqui: ", categorys)
            }}>
              Categoria de Receitas
            </Button>
          </Box>
          <Box>
            <Button color="red.500" onClick={() => setDataToRender(dataTwo)}>
              Categoria de Despesas
            </Button>
          </Box>
          <Spacer />
          <Box>
            <IconButton 
              size='lg'
              icon={<AddIcon color={iconColor}/>}
              onClick={handleOpen}
            />
            <FormModalCategory 
              title="Nova Categoria"
              // options={dataType}
              clickSave={handleSave}
              showModal={isOpen}
              closeModal={onClose}
              value={category}
              handleInputChange={setCategory}
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