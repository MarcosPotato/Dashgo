import { useQuery } from "react-query";

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
    Td,
    useBreakpointValue,
    Spinner
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";

import { RiAddLine, RiEditLine } from "react-icons/ri";

import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import SideBar from "../../components/Sidebar";

export default function UserList() {

    const { data, isLoading, error } = useQuery("users", async() => {
        const response = await fetch("http://localhost:3000/api/users")
        const data = await response.json()

        console.log("teste")
        console.log(data)

        const users = data.users?.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })
        }))

        return users
    })

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

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
                        <Link href="/users/create" passHref>
                            <Button as="a" size="sm" fontSize="small" colorScheme="pink" leftIcon={<Icon fontSize="16" as={ RiAddLine } />}>
                                Criar Novo
                            </Button>
                        </Link>
                    </Flex>
                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ): error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados do usuário</Text>
                        </Flex>
                    ):(
                        <>
                        <Table colorScheme="whiteAlpha">
                            <Thead>
                                <Tr>
                                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                        <Checkbox colorScheme="pink" />
                                    </Th>
                                    <Th>Usuário</Th>
                                    { isWideVersion && (
                                        <>
                                        <Th>Data de Cadastro</Th>
                                        <Th width="8"></Th>
                                        </>
                                    ) }
                                </Tr>
                            </Thead>
                            <Tbody>
                                { data?.map((users: any) => (
                                    <Tr key={ users.id }>
                                        <Td px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight="bold">{ users.name }</Text>
                                                <Text fontSize="small" color="gray.300">{ users.createdAt }</Text>
                                            </Box>
                                        </Td>
                                        { isWideVersion && (
                                            <>
                                            <Td>04/58/2022</Td>
                                            <Td>
                                                <Button
                                                as="a"
                                                size="sm"
                                                fontSize="small"
                                                colorScheme="purple"
                                                leftIcon={<Icon fontSize="16" as={ RiEditLine } />}
                                                >
                                                    Editar
                                                </Button>
                                            </Td>
                                            </>
                                        )}
                                    </Tr>
                                )) }
                            </Tbody>
                        </Table>
                        <Pagination />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}