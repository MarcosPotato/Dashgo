
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from "react-query";

import Input from "../../components/Form/Input";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";

import { 
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    VStack
} from "@chakra-ui/react";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

interface FormValues{
    name: string
    email: string
    password: string
    password_confirmation: string
}
  
const createUserFormSchema = Yup.object().shape({
    name: Yup.string().required("Nome obrigatório"),
    email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: Yup.string().min(6, "No mínimo 6 carracteres").required("Senha obrigatório"),
    password_confirmation: Yup.string().oneOf([
        null, Yup.ref("password")
    ], "As senhas precisam ser iguais")
})

export default function CreateUser() {

    const route = useRouter()

    const createUser = useMutation(async(user: FormValues) => {
        const response = await api.post("users", {
            user: {
                name: user.name,
                email: user.email,
                password: user.password_confirmation,
                created_at: new Date()
            }
        })

        return response.data.user
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
        }
    })

    const { register, handleSubmit, formState } = useForm<FormValues>({
        resolver: yupResolver(createUserFormSchema)
    })

    const handleCreateUser = async(data: FormValues) => {
        await createUser.mutateAsync(data)

        route.push("/users")
    }

    return(
        <Box>
            <Header/>
            <Flex w="100%" my={6} maxWidth={ 1480 } mx="auto" px="6">
                <SideBar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius="8"
                    p={["6",
                    "8"]}
                    bg="gray.800"
                    onSubmit={ handleSubmit(handleCreateUser) }
                >
                    <Heading size="lg" fontWeight="norma">Criar Usuário</Heading>

                    <Divider my="6" bgColor="gray.700"/>

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                label="Nome Completo"
                                error={ formState.errors.name }
                                { ...register("name") }
                            />
                            <Input
                                label="Email"
                                type="email" 
                                error={ formState.errors.email }
                                { ...register("email") }
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                label="Senha"
                                type="password"
                                error={ formState.errors.password }
                                { ...register("password") }
                            />
                            <Input
                                label="Confirmação da senha"
                                type="password" 
                                error={ formState.errors.password_confirmation }
                                { ...register("password_confirmation") }
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button colorScheme="pink" type="submit" isLoading={ formState.isSubmitting }>
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}