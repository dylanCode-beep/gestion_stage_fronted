import React, {useState,useEffect} from 'react'
import { TableContainer, TableCaption,Table,Thead,Tr,Th,Tbody,Td,Button, Container, Box, Spinner, Text, useDisclosure,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,FormControl,FormLabel,Input,ModalFooter,ModalHeader } from '@chakra-ui/react';
import {FaTrash,FaEdit, FaPlus} from 'react-icons/fa'
import { BASE_URL } from '../helpers/config';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



export default function Encadreurs() {
  const [encadreurs,setEncadreurs] = useState([])
  const {register,handleSubmit,reset, setValue,formState:{errors}} = useForm();
  const [selectedEncadreur, setSelectedEncadreur] = useState(null)
  const [loading, setLoading] = useState(true)
  const {isOpen,onOpen,onClose} = useDisclosure();

const fetchEncadreurs = async ()=>{
   try {
    const res = await axios.get(`${BASE_URL}/encadreurs`)
    setEncadreurs(res.data)
    setLoading(false)
   } catch (error) {
    console.log("Erreur de recuperation des Stagiaires",error)
    setLoading(false)
   }
 };

 useEffect(() =>{
   fetchEncadreurs();
   setLoading(true)
 },[])

  const openCreateModal = () =>{
   setSelectedEncadreur(null)
    onOpen();
    reset();
 };

 const openEditModal = (user) => {
    setSelectedEncadreur(user);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('num_cni', user.encadreur.num_cni);
    setValue('telephone', user.encadreur.telephone);
    onOpen();
  };

 const onSubmit = async (data)=>{
  try{
      if (selectedEncadreur) {
      await axios.put(`${BASE_URL}/encadreurs/${selectedEncadreur.id}`, data)
      toast.success('Encadreur mis a jour avec success')
    }else{
      await axios.post(`${BASE_URL}/encadreurs/register`, data)
      toast.success('Nouvelle encadreur creer avec success')     
    } 
    await fetchEncadreurs();
      onClose();
      reset();
      }
    catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement ❌");
    }

 }

 const handlDelete = async (id) =>{
    window.confirm('Confirmez-vous la suppression de cette encadreur?')
    await axios.delete(`${BASE_URL}/encadreurs/${id}`)
    toast.info('Encadreur supprimer')
    fetchEncadreurs();
 }

 

  return (
    <Box>
    <TableContainer>
         <Button onClick={openCreateModal} colorScheme='blue'>
          <FaPlus/>
         </Button>
         <Table variant='striped' colorScheme='teal'>
           <TableCaption fontSize="20px">Liste des Encadreurs ✔</TableCaption>
           <Thead>
             <Tr>
               <Th>#</Th>
               <Th>Nom</Th> 
               <Th>telephone</Th> 
               <Th>Actions</Th>       
             </Tr>
           </Thead>
           <Tbody>
               {loading ? (
                 <Box alignContent="center" py={10}>
                  <Spinner size="xl" thickness='4px' color="teal.500"/>
                  <Text mt={4}>Chargement des Encadreurs...</Text>
                  </Box>
                  ):(
                encadreurs.map((user) =>(
               <Tr key={user.id}>
                 <Td>{user.id}</Td>
                 <Td>{user.name}</Td>
                 <Td>{user.encadreur?.telephone??'non defini'}</Td>
                 <Td>
                   <Button m={1} onClick={()=>openEditModal(user)} size="sm" colorScheme='yellow'>
                     <FaEdit/>
                   </Button>
                   <Button size="sm" onClick={()=>handlDelete(user.id)} colorScheme='red'>
                     <FaTrash/>
                   </Button>
                 </Td>
               </Tr>
                ))
             )}
           </Tbody>
         </Table>
       </TableContainer>

       <Modal isOpen={isOpen} onClose={onClose}>
                   <ModalOverlay />
                   <ModalContent>
                     <ModalHeader>{selectedEncadreur ? "Modifier encadreur":"Creer un nouvelle encadreur"}</ModalHeader>
                     <ModalCloseButton />
                     <form onSubmit={handleSubmit(onSubmit)}>
                       <ModalBody>
                         <FormControl mb={4} isInvalid={errors.nom}>
                           <FormLabel>Nom</FormLabel>
                           <Input placeholder="Nom de l'encadreur" {...register('name', { required: true })} />
                         </FormControl>
       
                         <FormControl mb={4} isInvalid={errors.email}>
                           <FormLabel>Email</FormLabel>
                           <Input placeholder='Email@exemple.com' {...register('email', { required: true })} />
                         </FormControl>
       
           
                         <FormControl mb={4} isInvalid={errors.num_cni}>
                           <FormLabel>Numero CNI</FormLabel>
                           <Input placeholder='Numero CNI' {...register('num_cni', { required: true })} />
                         </FormControl>
           
       
                         <FormControl mb={4} isInvalid={errors.telephone}>
                           <FormLabel>telephone</FormLabel>
                           <Input placeholder='Numero de tel' {...register('telephone')} />
                         </FormControl>
                       </ModalBody>
       
                       <ModalFooter>
                         <Button colorScheme='blue' type='submit'>
                           {selectedEncadreur ? "Mettre à jour":"Enregistrer"}
                         </Button>
                         <Button  colorScheme='red' onClick={onClose} ml={3}>
                           Annuler
                         </Button>
                       </ModalFooter>
                     </form>
                   </ModalContent>
                 </Modal>

       </Box>
  )
}
