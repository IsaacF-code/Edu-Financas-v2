import { Box } from "@chakra-ui/react";
import CategoriesTable from "./components/CategoriesTable";
import React from "react";

export default function Categories() {
    return(
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <CategoriesTable />  
        </Box>
    );
}