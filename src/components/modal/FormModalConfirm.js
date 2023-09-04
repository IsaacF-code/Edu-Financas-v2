import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Button
} from "@chakra-ui/react"

function FormModalCategoryCategory({ title, showModal, closeModal, clickSave }) {
    const initialRef = React.useRef()
    const finalRef = React.useRef()

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
            <ModalFooter>
              <Button mr={3} onClick={closeModal}>Não</Button>
              <Button colorScheme="brand"  color="white" onClick={clickSave}>
                Sim
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default FormModalCategoryCategory;