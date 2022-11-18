import Link from "next/link"

import { getUsers, User, useUsers } from "../../services/hooks/useUsers"

import Header from "../../components/Header"
import Pagination from "../../components/Pagination"
import SideBar from "../../components/Sidebar"

import { RiAddLine, RiEditLine } from "react-icons/ri"
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
    Spinner,
    Link as CKLink
} from "@chakra-ui/react"
import { useState } from "react"
import { queryClient } from "../../services/queryClient"
import { api } from "../../services/api"
/* import { GetServerSideProps } from "next" */

interface UserListProps{
    users: User[]
    totalCount: number
}

export default function UserList(/*{ users, totalCount }: UserListProps */) {

    const [page, setPage] = useState<number>(1)

    const { data, isLoading, error, isFetching } = useUsers(page/* , {
        initialData: users
    } */)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const handlePrefetchUser = async(userId: string) => {
        await queryClient.prefetchQuery(['user', userId], async() => {
            const response = await api.get(`/users/${userId}`)
            console.log(response)
        },{
            staleTime: 1000 * 60 * 10 //10 min
        })
    }

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
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            { (isFetching && !isLoading) && (
                                <Spinner size="sm" color="gray.500" ml="5" />
                            )}
                        </Heading>
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
                                        <Th>Data de Cadastro</Th>
                                    ) }
                                    <Th width="8"></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                { data?.users?.map((user: any) => (
                                    <Tr key={ user.id }>
                                        <Td px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <CKLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                    <Text fontWeight="bold">{ user.name }</Text>
                                                </CKLink>
                                                <Text fontSize="small" color="gray.300">{ user.createdAt }</Text>
                                            </Box>
                                        </Td>
                                        { isWideVersion && (
                                            <Td>04/58/2022</Td>
                                        )}
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
                                    </Tr>
                                )) }
                            </Tbody>
                        </Table>
                        <Pagination
                            totalCountOfRegisters={ data?.totalCount || 0 }
                            currentPage={ page }
                            onChangePage={setPage}
                        />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

/* export const getServerSideProps: GetServerSideProps = async() => {

    const { users, totalCount } = await getUsers(1)

    return {
        props: {
            users,
            totalCount
        }
    }
} */