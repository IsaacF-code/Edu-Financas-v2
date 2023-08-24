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

function FormModalCategory({ title, showModal, closeModal, options, clickSave }) {
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    const selectColor = useColorModeValue("", "white"); // cor padrão no modo claro e branca no modo escuro

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
                <Input ref={initialRef} placeholder="Digite uma nova categoria" color={selectColor} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Tipo</FormLabel>
                <Select placeholder="Selecione o tipo de categoria" color={selectColor}>
                    {options?.map(option => (
                        <option key={option.id}>
                            {option.name}
                        </option>
                    ))}
                </Select>  
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" mr={3} color="white" onClick={clickSave}>
                Salvar
              </Button>
              <Button onClick={closeModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default FormModalCategory;