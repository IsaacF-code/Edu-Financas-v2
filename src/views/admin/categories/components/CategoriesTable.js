/* eslint-disable */
import {
  Box,
    Button,
    Flex,
    IconButton,
    Spacer,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/card/Card";
  import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons"
  import React, { useMemo, useState } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
import FormModalCategory from "components/modal/FormModalCategory";
  
  export default function CategoriesTable(props) {
    const { columnsData, tableData } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 11;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const iconColor = useColorModeValue("secondaryGray.800", "white");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
      onOpen();
    }
    
    // State para pegar tipo de categoria (Receita ou Despesa)
    // const [categoryType, setCategoryType] = useState([]);
    
    // State para salvar Categoria 
    const [category, setCategory] = useState("");

    const handleSave = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/categoriaReceita", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            category
          }),
        });

        const data = await response.json();
        alert(data.message);

        setCategory("");
      } catch (error) {
        console.error("error", error);
      }
    };

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
          <Box>
            <Button color="green.400">
              Categoria de Receitas
            </Button>
            <Button color="red">
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
              // options={["Receita", "Despesa"]}
              clickSave={handleSave}
              showModal={isOpen}
              closeModal={onClose}
            />
          </Box>
        </Flex>
      </Card>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NOME") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "AÇÕES") {
                      data = (
                        <Flex align='center'>
                          <IconButton 
                            size='lg'
                            icon={<EditIcon color={iconColor} />}
                            mr='10px'
                            // onClick={() => console.log("Teste")}
                          />
                          <IconButton
                            size='lg' 
                            icon={<DeleteIcon  color={iconColor}/>}
                            // onClick={() => console.log("Teste")}
                          />
                        </Flex>
                      )
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Card>
      </>
    );
  }
  