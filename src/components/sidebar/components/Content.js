// chakra imports
import { 
  Box, 
  Flex, 
  Stack,
  useDisclosure, 
} from "@chakra-ui/react";
import DropDown  from "components/dropDown/DropDown";
import FormModal from "components/modal/FormModal"
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
// import SidebarCard from "components/sidebar/components/SidebarCard";
import React, { useEffect, useState } from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenD, onOpen: onOpenD, onClose: onCloseD } = useDisclosure(); // Destruração do objeto de controle do modal, para abrir 
                                                                                   // e fechar o modal

  const handleOpenR = () => {
    onOpen();
  }
  
  const handleOpenD = () => {
    onOpenD();
  }

  const token = localStorage.getItem("token");

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

    const [revenue, setRevenue] = useState({ descricao: '', valor: '', categoria: 'Selecione a categoria' });
    const [toClick, setToClick] = useState(false);

    useEffect((toClick) => {
      if (toClick) {
        fetch('http://localhost:5000/receita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(revenue),
        })
        .then((res) => res.json())
        .then((data) => {
          setRevenue({ descricao: '', valor: '', categoria: 'Selecione a categoria' });
          setToClick(false);
        })
        .catch((error) => {
          console.error('error', error);
        })
      }
    }, [toClick, revenue, token]);
    
    const handleClick = (e) => {
      e.preventDefault();
      
      let inputWithFilds = revenue.descricao?.length > 0 && revenue.valor?.length > 0 && revenue.categoria?.length > 0;
      if (inputWithFilds) {
        let newRevenue = {
          descricao: revenue.descricao,
          valor: revenue.valor,
          categoria: revenue.categoria,
        }
        setRevenue(newRevenue);
        setToClick(true);
      } else {
        alert('Preencha todos os campos!');
      }
    }

  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <FormModal 
          title="Nova Receita"
          options={categories}
          handleInputChange={setRevenue}
          clickSave={handleClick}
          showModal={isOpen}
          closeModal={onClose}
        />
        <FormModal 
          title="Nova Despesa"
          options={categories}
          showModal={isOpenD}
          closeModal={onCloseD}
        />
        <DropDown 
          clickR={handleOpenR}
          clickD={handleOpenD}
        />
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      
      <Box
        ps='20px'
        pe={{ md: "16px", "2xl": "0px" }}
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        {/* <SidebarCard /> */}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
