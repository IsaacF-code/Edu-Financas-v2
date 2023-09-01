import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function ItemTableCategory({ name }) {
  
    const iconColor = useColorModeValue("secondaryGray.800", "white");
  
    return (
    <>
        <Tr>
            <Td>{name}</Td>
            <Td>
                <IconButton 
                  size='lg'
                  icon={<EditIcon color={iconColor} />}
                  mr='10px'
                  // onClick={() => console.log("Teste")}
                />
                <IconButton 
                  size='lg'
                  icon={<DeleteIcon color={iconColor} />}
                  mr='10px'
                  // onClick={() => console.log("Teste")}
                />
            </Td>
        </Tr>
    </>
  );
}