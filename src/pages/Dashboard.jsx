import { Box, Container, Heading, Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import axios from 'axios';
import { BASE_URL } from '../helpers/config';
import { useAuth } from '../context/AuthContext';



export default function dashboard() {
  const {user} = useAuth();

  return (
      <Box
       bg="green.700"
          p={6}
          mb={6}
          borderRightRadius="10"
          borderLeftRadius="45"
          width="600px">
            <Heading size="md" color="white">
              Bienvenue dans votre espace personnel  😎🎉🎉
            </Heading>
            
          </Box>
      
         
  )
}
