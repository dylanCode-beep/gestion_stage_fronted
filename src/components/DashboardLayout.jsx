import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <Flex h="100vh">
      <Sidebar/>
      <Flex direction="column" flex="1" ml={{base:0, md:"250px"}}>
        <Header/>
        <Box flex="1" p="6" overflow="auto">
          <Outlet/>
        </Box>
        <Footer/>
      </Flex>
    </Flex>
  )
}
