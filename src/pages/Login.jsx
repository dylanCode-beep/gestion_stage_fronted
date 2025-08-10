import {
  Button, Container, Box, FormControl, FormLabel, InputGroup,
  InputLeftElement, Input, Icon, Stack, Flex, Divider, Text, Heading
} from '@chakra-ui/react';
import React from 'react';
import { BASE_URL, SANCTUM_URL } from '../helpers/config';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await axios.get(SANCTUM_URL, { withCredentials: true });

      const response = await axios.post(`${BASE_URL}/login`, {
        email: data.email,
        password: data.password
      }, { withCredentials: true });

      login(response.data.user);
      toast.success('Vous êtes authentifié ✔');
      navigate('/');
    } catch (error) {
      if (error.response?.status === 422) {
        toast.error("Email ou mot de passe incorrect");
      } else {
        console.log(error);
        toast.error("Erreur de connexion ❌");
      }
    }
  };

  return (
    <Container boxShadow="dark-lg" borderRadius={7} mt={20} p={2} maxW={380} centerContent>
      <Heading>Sign in</Heading>
      <Stack mt={1} gap={2} direction="column">
        <Button width="300px" leftIcon={<FaGoogle color='#EA4335' />} size="md">Se connecter via Google</Button>
        <Flex align="center">
          <Divider />
          <Text>Or</Text>
          <Divider />
        </Flex>
      </Stack>
      <Box p={4} mt={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaEnvelope} color="gray.400" />
              </InputLeftElement>
              <Input
                width="300px"
                type='email'
                placeholder='jean@exemple.com'
                {...register('email', { required: true })}
              />
            </InputGroup>
          </FormControl>

          <FormControl mt={4} isInvalid={errors.password}>
            <FormLabel>Mot de passe</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type="password"
                {...register('password', { required: true })}
              />
            </InputGroup>
          </FormControl>

          <Flex gap={20} mt={1}>
            <Link to="/register">S'inscrire</Link>
            <Link to="/forgotPassword">Mot de passe oublié</Link>
          </Flex>

          <Button
            rightIcon={<RiLockPasswordLine />}
            mt={3}
            type='submit'
            colorScheme='green'
            width='full'
          >
            Connexion
          </Button>
        </form>
      </Box>
    </Container>
  );
}
