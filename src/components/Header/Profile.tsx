import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData?: boolean
}

export default function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            { showProfileData && 
                <Box mr="4" textAlign="right">
                    <Text>Marcos Moreira</Text>
                    <Text color="gray.300" fontSize="small">email@teste.com</Text>
                </Box>
            }
            <Avatar size="md" name="Marcos Moreira" src="https://github.com/marcospotato.png"/>
        </Flex>
    )
}