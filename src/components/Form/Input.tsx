import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

import { 
    Input as CKInput, 
    FormLabel, 
    FormControl,
    InputProps as CKInputProps,
    FormErrorMessage
} from '@chakra-ui/react'

interface InputProps extends CKInputProps{
    name: string,
    label?: string,
    error?: FieldError
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ 
    name, 
    label, 
    error = null, 
    ...rest 
}, ref) =>{
    return(
        <FormControl isInvalid={!!error}>
            { label &&
                <FormLabel htmlFor={ name }>
                    { label }
                </FormLabel>
            }
            <CKInput
                id={ name }
                name={ name }
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                size="lg"
                _hover={{
                    bgColor: "gray.900"
                }}
                ref={ ref }
                {...rest}
            />
            { !!error && 
                <FormErrorMessage>
                    { error.message }
                </FormErrorMessage>
            }
        </FormControl>
    )
}

export default forwardRef(Input)