import { Box, Divider, Icon, Link, MenuItem, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaExchangeAlt, FaHome, FaUser, FaUserShield } from 'react-icons/fa';
import { FiLock, FiGrid } from 'react-icons/fi';
import { IoMdBusiness, IoMdSchool } from 'react-icons/io';


export default function Sidebar() {

  const bg = useColorModeValue("gray.100","gray.900");
  const activeBg = useColorModeValue("blue.500", "blue.700");
  const activeColor = useColorModeValue("white", "white");

 const activeItem = "Dashboard";

 const memuItems = 
 [
  {name:"Dashboard", Icon:FaHome, to:"/"},
  {name:"Utilisateurs", Icon:FaUser, to:'/users'},
  {name:"Encadreurs", Icon:FaUser, to:'/encadreurs'},
  {name:"Stagiaires", Icon:IoMdSchool, to:"/stagiaires"},
  {name:"Cellules", Icon:IoMdBusiness, to:"/cellules"},
  {name:"Affectation", Icon:FaExchangeAlt, to:"/affection"},
  {name:"Rapports", Icon:FaExchangeAlt, to:"/Rapports"},
  {name:"Themes", Icon:FaExchangeAlt, to:"/Theme"},
  {name:"Permissions", Icon:FiLock, to:"/permissions"},
  {name:"Roles", Icon:FaUserShield,to:"roles"},
 ];
  return (
     <Box bg={bg} w="250px" h="100vh" p="5" boxShadow="md" position="fixed" top="0" left="0">
          <Text fontSize="2xl" fontWeight="bold" mb="8">Dashboard</Text>
          <VStack spacing="4" align="stretch">
            {memuItems.map((item) =>(
              <Link key={item.name} href={item.to} 
              display="flex" alignItems="center" px="3" py="2" 
              borderRadius="md" bg={activeItem === item.name ? activeColor:"transparent"} 
              color={activeItem === item.name ? activeColor:"inherit"}
              _hover={{bg:activeBg, color: activeColor, textDecoration:"none"}}
              >
                <Icon as={item.Icon} mr="3" boxSizing='5'/>
                <Text fontWeight="medium">{item.name}</Text>
              </Link>
            ))}
          </VStack>
      </Box>
  )
}
