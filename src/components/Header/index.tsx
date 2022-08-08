import { Flex } from "@chakra-ui/react";

import Logo from "./Logo";
import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import Search from "./Search";

export default function Header(){
    return (
      <Flex
        w="100%"
        as="header"
        maxW={1480}
        marginX="auto"
        h="20"
        px="6"
        mt="4"
        align="center"
      >
        <Logo />
        <Search/>
        <Flex
            align="center"
            ml="auto"
        >
            <NotificationsNav />
            <Profile />
        </Flex>
      </Flex>  
    )
}