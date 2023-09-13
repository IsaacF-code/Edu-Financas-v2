import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useColorModeValue
} from "@chakra-ui/react"

function FormModalEdit({ title, showModal, closeModal, options, defaultValue, handleInputChange, clickSave }) {
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const selectColor = useColorModeValue("", "white"); // cor padrão no modo claro e branca no modo escuro

    const { descricao, valor, categoriaId } = defaultValue || { }; 

    return (
        <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={showModal}
          onClose={closeModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input 
                  ref={initialRef} 
                  placeholder="Descrição" 
                  color={selectColor}
                  name="descricao"
                  defaultValue={descricao}
                  onChange={e => handleInputChange((prev) => ({ ...prev, descricao: e.target.value }))}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor</FormLabel>
                <Input 
                  color={selectColor}
                  name="valor"
                  defaultValue={valor}
                  onChange={e => handleInputChange((prev) => ({ ...prev, valor: e.target.value }))}
                />
              </FormControl>
              <FormControl mt={4}> 
                <FormLabel>Categoria</FormLabel>
                <Select 
                  // placeholder="Selecione a categoria" 
                  color={selectColor}
                  name="categoria"
                  defaultValue={categoriaId}
                  onChange={e => handleInputChange((prev) => ({ ...prev, categoriaId: e.target.value }))}
                  >
                    <option>Selecione a categoria</option>
                    {options?.map(option => (
                        <option key={option._id} value={option._id}>
                            {option.nome}
                        </option>
                    ))}
                </Select>  
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={closeModal}>Cancelar</Button>
              <Button colorScheme="brand" color="white" onClick={clickSave}>
                Salvar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default FormModalEdit;