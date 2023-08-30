import { Box } from "@chakra-ui/react";
import CategoriesTable from "./components/CategoriesTableNew";
import { columnsDataCategories } from "./variables/columnsData";
import tableDataCategories from "views/admin/categories/variables/tableDataCategories.json";
import React from "react";

export default function Categories() {
    return(
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <CategoriesTable
                columnsData={columnsDataCategories}
                tableData={tableDataCategories}
            />    
        </Box>
    );
}