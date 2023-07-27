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
import React from "react";

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

  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <FormModal 
          title="Nova Receita"
          showModal={isOpen}
          closeModal={onClose}
        />
        <FormModal 
          title="Nova Despesa"
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
