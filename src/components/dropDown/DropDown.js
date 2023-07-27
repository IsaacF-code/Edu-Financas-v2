import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
// import FormModal from '../modal/FormModal';

function DropDown({ clickR, clickD }) {
    return (
        <>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }} mb='20px'>
          <Menu >
            <MenuButton leftIcon={<AddIcon />} as={Button} colorScheme='brand' size='lg' color="white" >
              Novo
            </MenuButton>
            <MenuList>
              <MenuItem onClick={clickR}>Receita</MenuItem>
              <MenuItem onClick={clickD}>Despesa</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        </>
    )
}

export default DropDown;