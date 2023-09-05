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

function FormModal({ title, showModal, closeModal, options, value, handleInputChange, clickSave }) {
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const selectColor = useColorModeValue("", "white"); // cor padrão no modo claro e branca no modo escuro

    const { descricao, valor, categoria } = value || {}; 

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
                  name='descricao'
                  value={descricao}
                  onChange={e => handleInputChange({ ...value, descricao: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor</FormLabel>
                <Input 
                  color={selectColor}
                  name='valor'
                  value={valor}
                  onChange={e => handleInputChange({ ...value, valor: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}> 
                <FormLabel>Categoria</FormLabel>
                <Select 
                  placeholder="Selecione a categoria" 
                  color={selectColor}
                  name='categoria'
                  value={categoria}
                  onChange={e => handleInputChange({ ...value, categoria: e.target.value })}
                  defaultValue={options[0]}
                  >
                    {options?.map(option => (
                        <option key={option._id}>
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

export default FormModal;