import React, { useState, useEffect } from 'react';
import {
  TableContainer, TableCaption, Table, Thead, Tr, Th, Tbody, Td,
  Button, FormControl, FormLabel, Input, useDisclosure, Box,
  ModalContent, Modal, ModalOverlay, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { BASE_URL } from '../helpers/config';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Cellules() {
  const [cellule, setCellules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCellule, setSelectedCellule] = useState(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

 
  const fetchCellules = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/cellules`);
      setCellules(res.data); // ou res.data.cellules selon ton API
    } catch (error) {
      console.error("Erreur de récupération des cellules :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCellules();
  }, []);

  // 🟦 Ouvrir modal création
  const openCreateModal = () => {
    setSelectedCellule(null);
    reset();
    onOpen();
  };

  // 🟨 Ouvrir modal édition
  const openEditModal = (cellule) => {
    setSelectedCellule(cellule);
    setValue('nom', cellule.nom);
    setValue('code', cellule.code);
    setValue('description', cellule.description || '');
    onOpen();
  };

  // ✅ Soumission du formulaire (ajout ou update)
  const onSubmit = async (data) => {
    try {
      if (selectedCellule) {
        await axios.put(`${BASE_URL}/cellules/${selectedCellule.id}`, data);
        toast.success('Cellule mise à jour avec succès 🚀');
      } else {
        await axios.post(`${BASE_URL}/cellules/register`, data);
        toast.success('Cellule créée avec succès 🎉');
      }

      await fetchCellules();
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement ❌");
    }
  };

  // 🗑️ Suppression
  const handleDelete = async (id) => {
    if (window.confirm("Confirmez-vous la suppression de cette cellule ?")) {
      try {
        await axios.delete(`${BASE_URL}/cellules/${id}`);
        toast.info('Cellule supprimée 🗑️');
        fetchCellules();
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Box>
      <TableContainer>
        <Button onClick={openCreateModal} colorScheme='blue'>
          <FaPlus />
        </Button>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption fontSize="20px">Liste des Cellules ✔</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Nom</Th>
              <Th>Code</Th>
              <Th>Nombre de Stagiaires</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cellule.map((cel) => (
              <Tr key={cel.id}>
                <Td>{cel.id}</Td>
                <Td>{cel.nom}</Td>
                <Td>{cel.code}</Td>
                <Td>{cel.nombre_stagiaire}</Td>
                <Td>
                  <Button onClick={() => openEditModal(cel)} m={1} size="sm" colorScheme='yellow'>
                    <FaEdit />
                  </Button>
                  <Button onClick={() => handleDelete(cel.id)} size="sm" colorScheme='red'>
                    <FaTrash />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* ➕ Modal Création / Edition */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCellule ? "Modifier la cellule" : "Créer une cellule"}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl mb={4} isInvalid={errors.nom}>
                <FormLabel>Nom</FormLabel>
                <Input placeholder='Nom de la cellule' {...register('nom', { required: true })} />
              </FormControl>

              <FormControl mb={4} isInvalid={errors.code}>
                <FormLabel>Code</FormLabel>
                <Input placeholder='Code unique' {...register('code', { required: true })} />
              </FormControl>

              <FormControl mb={4} isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Input placeholder='Description de la cellule' {...register('description', { required: true })} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' type='submit'>
                {selectedCellule ? "Mettre à jour" : "Enregistrer"}
              </Button>
              <Button colorScheme='red' ml={3} onClick={onClose}>
                Annuler
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
