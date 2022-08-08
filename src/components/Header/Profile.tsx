import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

export default function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Marcos Moreira</Text>
                <Text color="gray.300" fontSize="small">email@teste.com</Text>
            </Box>
            <Avatar size="md" name="Marcos Moreira" src="https://github.com/marcospotato.png"/>
        </Flex>
    )
}