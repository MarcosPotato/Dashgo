import { 
    Input as CKInput, 
    FormLabel, 
    FormControl,
    InputProps as CKInputProps
} from '@chakra-ui/react'

interface InputProps extends CKInputProps{
    name: string,
    label?: string
}

export default function Input({ name, label, ...rest }: InputProps){
    return(
        <FormControl>
            { label &&
                <FormLabel htmlFor={ name }>
                    Senha
                </FormLabel>
            }
            <CKInput
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                size="lg"
                _hover={{
                    bgColor: "gray.900"
                }}
                {...rest}
                id={ name }
                name={ name }
            />
        </FormControl>
    )
}