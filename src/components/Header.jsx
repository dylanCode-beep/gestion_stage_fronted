import { Avatar, Text, Flex, Box, Input, MenuItem, HStack, IconButton,Button, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuList, useColorModeValue, useDisclosure,  Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,FormControl,FormLabel,ModalFooter,  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaUser, FaVoicemail } from 'react-icons/fa'
import { FiBell, FiChevronDown, FiLogOut, FiMenu, FiSearch, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const {user} = useAuth();
  const {onOpen,isOpen,onClose} = useDisclosure()

  return (
    <Flex
    as="header"
    position="sticky"
    top="0"
    left="0"
    rigth="0"
    zIndex="999"
     bg={useColorModeValue("gray.100", "gray.800")}
    boxShadow="inner"
    px="4"
    py="3"
    alignItems="center"
    justifyContent="space-between"
    >
      <HStack spacing="4">
        <IconButton
        variant="ghost"
        aria-label='Toggle Sidebar'
        icon={<FiMenu/>}
        display={{base:"inline-flex", md:"none"}}
        />
        <InputGroup>
        <Input width="500px"  ml={10} type="search" placeholder='Rechercher...' size='sm'/>
        <IconButton size="sm" colorScheme='blue'>
          <FiSearch/>
        </IconButton>
        </InputGroup>
      </HStack>
      
      <HStack spacing="4">
        <IconButton
        variant="ghost"
        aria-label='Notifications'
        icon={<FiBell/>}/>
        
        <IconButton
        variant="ghost"
        aria-label='Notifications'
        icon={<FaEnvelope/>}/>
        <Menu>
          <MenuButton>
            <HStack spacing="2">
              <Avatar  size="sm" />
              <Box display={{base: "none", md:"block", textAlign:"left"}}>
                <Text fontSize="sm" fontWeight="medium">Moukoko</Text>
                <Text fontSize="xs" fontWeight="medium">Admin</Text>
              </Box>

              <Box display={{base:"none",md:"flex"}}>
                <FiChevronDown/>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/user/profil" onClick={onOpen} icon={<FaUser/>}>Mon profil</MenuItem>
            <MenuItem as={Link} to="/params" icon={<FiSettings/>}>Parametres</MenuItem>
            <MenuDivider/>
            <MenuItem icon={<FiLogOut/>}>Deconnexion</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
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
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Code unique'  />
                  </FormControl>
    
                  <FormControl mb={4}>
                    <FormLabel>Adresse</FormLabel>
                    <Input placeholder='Description de la cellule' />
                  </FormControl>
              

                <FormControl mb={4}>
                    <FormLabel>Numero de telephone</FormLabel>
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
  
    </Flex>
  )
}
