import { BASE_URL } from '../helpers/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TableContainer,Table,TableCaption,Thead,Tr,Th,Tbody,Td,Spinner, Box, Button,Text } from '@chakra-ui/react';
import {FaEdit, FaTrash} from 'react-icons/fa'



const UserManager = () => {

  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setUsers(res.data);
      setLoading(false)
    } catch (error) {
      console.error("Erreur de récupération des utilisateurs", error);
      setLoging(false)
    }
  };


  useEffect(() => {
    fetchUsers();
    setLoading(true)
  }, []);

  return (
    <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption fontSize="20px">Liste des Utilisateurs</TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>Nom</Th>
        <Th>Email</Th>
        <Th>Inscrit le</Th>
        <Th>Roles</Th>
      </Tr>
    </Thead>
    <Tbody>

     {loading ? (
                    <Box alignContent="center" py={10}>
                    <Spinner size="xl" thickness='4px' color="teal.500"/>
                    <Text mt={4}>Chargement des Utilisateurs...</Text>
                  </Box>
                  ):(

      users.map((user) =>(
        <Tr key={user.id}>
          <Td>{user.id}</Td>
          <Td>{user.name}</Td>
          <Td>{user.email}</Td>
          <Td>{ new Date(user.created_at).toLocaleDateString()}</Td>
          {user.roles.map((role) =>(
            <Td key={role?.id} colorScheme="green">
              {role?.name?? 'non definie'}
            </Td>
          ))}
        </Tr>
      ))
      )}
    </Tbody>
  </Table>
</TableContainer>
  );
};

export default UserManager;
