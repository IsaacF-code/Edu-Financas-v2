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
    useColorModeValue
} from "@chakra-ui/react"

function FormModalCategoryCategory({ title, showModal, closeModal, clickSave, handleInputChange, value }) {
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const selectColor = useColorModeValue("", "white"); // cor padrão no modo claro e branca no modo escuro

    const { nome } = value || {};

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
                <FormLabel>Categoria</FormLabel>
                <Input 
                  ref={initialRef} 
                  placeholder="Digite uma nova categoria" 
                  color={selectColor} 
                  name="name" 
                  defaultValue={nome} 
                  onChange={e => handleInputChange({ nome: e.target.value })} 
                />
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

export default FormModalCategoryCategory;