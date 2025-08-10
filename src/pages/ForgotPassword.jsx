import React from 'react'
import { Container, Button,FormControl,Box,FormLabel,InputLeftElement,Icon,Input,InputGroup, Heading, Flex,Text } from '@chakra-ui/react'
import {FiRefreshCcw} from 'react-icons/fi'
import {FaEnvelope, FaPaperPlane} from 'react-icons/fa'
import {IoMdArrowBack} from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <Container boxShadow="dark-lg" borderRadius={7} p={2} maxW="380" mt={20} centerContent>
            <FiRefreshCcw fontSize="70px" mt={8}/>
                <Heading>Reinitialiser</Heading>
        <Box p={4} mt={2}>
            <form>
                <FormControl>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                <InputLeftElement pointerEvents="none">
                <Icon as={FaEnvelope} color="gray.400"/>
                </InputLeftElement>
                <Input width="300px" type='email' placeholder='jean@exmple.com'></Input>
                </InputGroup>
                </FormControl>
                <Button leftIcon={<FaPaperPlane/>}  mt={3} type='submit' colorScheme='green' width='full'>Envoyer</Button>
                <Flex display="inline-flex" mt={2}>
                    <Link to='/login'>
                     <Button colorScheme='red'>
                        <IoMdArrowBack/>
                     </Button>
                    </Link>
                </Flex>
            </form>
        </Box>
    </Container>
  )
}
