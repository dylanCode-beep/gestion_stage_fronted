
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'


export default function Footer() {


  return (
       <Box
       as='footer'
       w="100%"
       py="3"
       px="6"
       bg={useColorModeValue("gray.100", "gray.800")}
       mt="auto"
       boxShadow="inner">
        <Flex justify="space-between" align="center">
         <Text fontSize="sm" color="gray.600">
          {new Date().getFullYear()} GestionStagiaire. Tous droits reserves.
         </Text>
         <Text fontSize="sm" color="gray.500">
          Version 1.0.0
         </Text>
        </Flex>
       </Box>
  )
}
