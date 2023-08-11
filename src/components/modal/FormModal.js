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

function FormModal({ title, showModal, closeModal, options }) {
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
                <FormLabel>Descrição</FormLabel>
                <Input ref={initialRef} placeholder="Descrição" color={selectColor} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor</FormLabel>
                <Input color={selectColor}/>
              </FormControl>
              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select placeholder="Selecione a categoria" color={selectColor}>
                    {options?.map(option => (
                        <option key={option.id}>
                            {option.name}
                        </option>
                    ))}
                </Select>  
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" mr={3} color="white">
                Salvar
              </Button>
              <Button onClick={closeModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default FormModal;