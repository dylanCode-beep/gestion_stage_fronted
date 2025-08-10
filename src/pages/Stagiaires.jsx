import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  TableContainer, TableCaption, Table, Thead, Tr, Th, Tbody, Td,
  Button, FormControl, FormLabel, Input, useDisclosure, Box,
  ModalContent, Modal, ModalOverlay, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Spinner,Text
} from '@chakra-ui/react';
import {FaTrash,FaEdit, FaPlus} from 'react-icons/fa'
import { BASE_URL } from '../helpers/config';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Stagiaires() {
 const [stagiaire,setStagiaire] = useState([])
 const [selectedStagiaire, setSelectedStagiaire] = useState(null)

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

 const fetchStagiaires = async ()=>{
   try {
    const res = await axios.get(`${BASE_URL}/stagiaires`)
    setStagiaire(res.data)
   } catch (error) {
    console.log("Erreur de recuperation des Stagiaires",error)
   }
 };

 useEffect(() =>{
   fetchStagiaires();
 },[])

const openCreateModal = () => {
    setSelectedStagiaire(null);
     onOpen();
    reset();
  };

  //  Ouvrir modal édition
  const openEditModal = (user) => {
    setSelectedStagiaire(user);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('etablissement', user.stagiaire.etablissement);
    setValue('filiere', user.stagiaire.filiere);
    setValue('niveau', user.stagiaire.niveau);
    setValue('sexe', user.stagiaire.sexe);
    setValue('datenaissance', user.stagiaire.datenaissance);
    setValue('telephone', user.stagiaire.telephone);

    onOpen();
  };


 const onSubmit = async (data) =>{
  try {
    if (selectedStagiaire) {
       await axios.put(`${BASE_URL}/stagiaires/${selectedStagiaire.id}`, data);
        toast.success('Stagiaire mise à jour avec succès 🚀');
    }else{
      await axios.post(`${BASE_URL}/stagiaires/register`, data);
      toast.success('Stagiaire créée avec succès 🎉');
      
    }
     await fetchStagiaires();
      onClose();
      reset();
      }
      catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'enregistrement ❌");
        
      }
 }


  const handleDelete = async (id) => {
    if (window.confirm("Confirmez-vous la suppression de ce stagiaire ?")) {
      await axios.delete(`${BASE_URL}/stagiaires/${id}`);
      toast.info("Supprimé");
      fetchStagiaires();
    }
  };

  return (
    
    <Box>
     <TableContainer>
      <Button onClick={openCreateModal} colorScheme='blue'>
       <FaPlus/>
      </Button>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption fontSize="20px">Liste des Stagiaires  ✔</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Nom</Th>
            <Th>Code</Th>
            <Th>Filiere</Th>
            <Th>Niveau</Th>
            <Th>Etablissement</Th>
            <Th>Telephone</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
             {stagiaire.map((user) =>(
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.stagiaire?.code?? 'non defini'}</Td>
              <Td>{user.stagiaire?.filiere ?? 'non defini'}</Td>
              <Td>{user.stagiaire?.niveau?? 'non defini'}</Td>
              <Td>{user.stagiaire?.etablissement?? 'non defini'}</Td>
              <Td>{user.stagiaire?.telephone?? 'non defini'}</Td>
              <Td>
                <Button onClick={()=>openEditModal(user)}  m={1} size="sm" colorScheme='yellow'>
                  <FaEdit/>
                </Button>
                <Button onClick={()=>handleDelete(user.id)} size="sm" colorScheme='red'>
                  <FaTrash/>
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>

     <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedStagiaire ? "Modifier stagiaire":"Creer un nouveau stagiaire"}</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <FormControl mb={4} isInvalid={errors.nom}>
                    <FormLabel>Nom</FormLabel>
                    <Input placeholder='Nom du stagiaire' {...register('name', { required: true })} />
                  </FormControl>

                  <FormControl mb={4} isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email@exemple.com' {...register('email', { required: true })} />
                  </FormControl>

                  <FormControl mb={4} isInvalid={errors.etablissement}>
                    <FormLabel>Etablissement</FormLabel>
                    <Input placeholder='Etablissement frequenter' {...register('etablissement', { required: true })} />
                  </FormControl>
    
                  <FormControl mb={4} isInvalid={errors.filiere}>
                    <FormLabel>Filiere</FormLabel>
                    <Input placeholder='Filiere du stagiaire' {...register('filiere', { required: true })} />
                  </FormControl>
    
                  <FormControl mb={4} isInvalid={errors.niveau}>
                    <FormLabel>Niveau</FormLabel>
                    <Input placeholder='Niveau du stagiaire' {...register('niveau', { required: true })} />
                  </FormControl>

                  <FormControl mb={4} isInvalid={errors.sexe}>
                    <FormLabel>sexe</FormLabel>
                    <Input placeholder='Homme ou Femme' {...register('sexe')} />
                  </FormControl>

                  <FormControl mb={4} isInvalid={errors.datenaissance}>
                    <FormLabel>Vous etez nee</FormLabel>
                    <Input type="date"{...register('datenaissance')} />
                  </FormControl>

                  <FormControl mb={4} isInvalid={errors.telephone}>
                    <FormLabel>telephone</FormLabel>
                    <Input type="tel" placeholder='Numero de tel' {...register('telephone')} />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' type='submit'>
                    {selectedStagiaire ? "Mettre à jour":"Enregistrer"}
                  </Button>
                  <Button  colorScheme='red' onClick={onClose} ml={3}>
                    Annuler
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          </Box>
  );
}
