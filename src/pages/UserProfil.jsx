import React, { useState } from 'react'
import { Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,FormControl,FormLabel,Input,ModalFooter,Button, useDisclosure, } from '@chakra-ui/react'

export default function UserProfil() {
  const {isOpen,onOpen,onClose} = useDisclosure();
  return (
     <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Informations personnelles</ModalHeader>
              <ModalCloseButton />
              <form>
                <ModalBody>
                  <FormControl mb={4}>
                    <FormLabel>Nom</FormLabel>
                    <Input placeholder='Nom de la cellule'/>
                  </FormControl>
    
                  <FormControl mb={4}>
                    <FormLabel>Code</FormLabel>
                    <Input placeholder='Code unique'  />
                  </FormControl>
    
                  <FormControl mb={4}>
                    <FormLabel>Description</FormLabel>
                    <Input placeholder='Description de la cellule' />
                  </FormControl>
                </ModalBody>
    
                <ModalFooter>
                  <Button colorScheme='blue' type='submit'>
                    Sauvegarder
                  </Button>
                  <Button colorScheme='red' ml={3} onClick={onClose}>
                    Annuler
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
  )
}
