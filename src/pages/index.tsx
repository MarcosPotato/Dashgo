import { NextPage } from 'next'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../components/Form/Input'

interface FormValues{
  email: string
  password: string
}

const signInFormSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: Yup.string().required("Senha obrigatório"),
})

const Home: NextPage = () => {

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<FormValues> = async(values) => {
    
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxW={360}
        bgColor="gray.800"
        p="8"
        flexDir="column"
        onSubmit={ handleSubmit(handleSignIn) }
      >
        <Stack spacing={4}>
          <Input
            type="email"
            label="E-mail"
            error={ formState.errors.email }
            { ...register("email") }
          />
          <Input
            type="password"
            label="Senha" 
            error={ formState.errors.password }
            { ...register("password") }
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={ formState.isSubmitting }
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default Home
