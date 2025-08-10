import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL,SANCTUM_URL } from '../helpers/config';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Container, Box,  Button,Flex,Divider,Text, FormControl,Stack , FormLabel, Input, InputGroup, InputLeftElement,Icon, Heading } from '@chakra-ui/react';
import {FaFacebook,FaGoogle,FaApple, FaUser,  FaEnvelope, FaPaperPlane, FaLock, FaUserPlus} from 'react-icons/fa'
import { useAuth, AuthProvider } from '../context/AuthContext';



function Register() {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate()
    const [error,setError] =  useState();
    const { user } = useAuth();

    const onSubmit = async (data)=>{
        try {
            await axios.get(SANCTUM_URL);
            const response = await axios.post(`${BASE_URL}/register`, data)
            setError(response.data)
            localStorage.setItem("user",JSON.stringify(response.data))
            setUser(response.data);
            toast.success(`Bienvenue ${response.data.name} 👋`)
            navigate('/')
        } catch (error) {
            if (error?.response?.status === 404) {
                setError(error.response.data.error)
            }
            console.log(error)
        }
    }

    const handleLogin = () =>{
        window.location.href= 'http://127.0.0.1:8000/api/auth/redirect/google'
    }

   return (
        <Container borderRadius="7" mt={18} p={2} maxW="380"  boxShadow="dark-lg" centerContent>
            <Heading>Sign up</Heading>
            <Box p={4} mt={0}>
                <Stack gap={2} direction="column">
                <Button width="300px"  leftIcon={<FaGoogle color='#EA4335'/>} onClick={handleLogin} size="md">S'inscrire avec Google</Button>
                <Button leftIcon={<FaFacebook/>} colorScheme='blue' size="md">S'inscrire avec Facebook</Button>
                <Button variant="outline" colorScheme='blue' leftIcon={<FaApple/>} size="md">S'inscrire avec Apple</Button>
                </Stack>
                <Flex align="center">
                    <Divider />
                    <Text>Or</Text>
                    <Divider/>
                </Flex>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Nom</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FaUser} color="gray.400"/>
                            </InputLeftElement>
                            <Input type='text' placeholder='Nom'{...register('name',{required:true})}/>
                            </InputGroup>
                        </FormControl>

                        <FormControl isInvalid={errors.email} >
                            <FormLabel>Email</FormLabel>
                           <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FaEnvelope} color="gray.400"/>
                            </InputLeftElement>
                            <Input type='email' placeholder='jean@exmple.com'{...register('email',{required:true})}/>
                            </InputGroup>
                        </FormControl>

                        <FormControl isInvalid={errors.password} >
                            <FormLabel>Mot de passe</FormLabel>
                            <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FaLock} color="gray.400"/>
                            </InputLeftElement>
                            <Input type="password"{...register('password',{required:true})}/>
                            </InputGroup>
                        </FormControl>
                        <Box mt={1}>
                           <Link to="/login" underline="hover"  variante="body2">Se connecter</Link>
                        </Box>
                        <Button rightIcon={<FaPaperPlane/>} mt={3} type='submit' colorScheme='green' width='full'>Inscription</Button>
                </form>
                </Box>
        </Container>
    );
}

export default Register;
