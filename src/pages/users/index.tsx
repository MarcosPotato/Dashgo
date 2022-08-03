import { 
    Box, 
    Button, 
    Checkbox, 
    Flex, 
    Heading, 
    Icon, 
    Table,
    Tr,
    Th, 
    Thead,
    Tbody,
    Text,
    Td
} from "@chakra-ui/react";

import { RiAddLine, RiEditLine } from "react-icons/ri";

import Header from "../../components/Header";
import Pagination from "../../components/pagination";
import SideBar from "../../components/Sidebar";

export default function UserList() {
    return(
        <Box>
            <Header/>
            <Flex w="100%" my={6} maxWidth={ 1480 } mx="auto" px="6">
                <SideBar />

                <Box flex="1" borderRadius="8" p="8" bg="gray.800">
                    <Flex
                        mb="8"
                        justify="space-between"
                        align="center"
                    >
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>
                        <Button as="a" size="sm" fontSize="small" colorScheme="pink" leftIcon={<Icon fontSize="16" as={ RiAddLine } />}>
                            Criar Novo
                        </Button>
                    </Flex>
                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px="6" color="gray.300" w="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>Usuário</Th>
                                <Th>Data de Cadastro</Th>
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px="6" color="gray.300" w="8">
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Marcos Moreira</Text>
                                        <Text fontSize="small" color="gray.300">email@teste.com</Text>
                                    </Box>
                                </Td>
                                <Td>04/58/2022</Td>
                                <Th>
                                    <Button as="a" size="sm" fontSize="small" colorScheme="purple" leftIcon={<Icon fontSize="16" as={ RiEditLine } />}>
                                        Editar
                                    </Button>
                                </Th>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}