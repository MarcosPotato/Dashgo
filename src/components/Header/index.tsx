import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";

import Logo from "./Logo";
import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import Search from "./Search";

export default function Header(){
  
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

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
      { !isWideVersion && (
        <IconButton 
          aria-label="open-navigation"
          icon={ <Icon as={ RiMenuLine } /> }
          fontSize="26"
          mr="2"
          variant="unstyled"
          display="flex"
          alignItems="center"
          onClick={ onOpen }
        />
      ) }
      
      <Logo />
      { isWideVersion && 
        <Search/>
      }
      <Flex
          align="center"
          ml="auto"
      >
          <NotificationsNav />
          <Profile showProfileData={ isWideVersion }/>
      </Flex>
    </Flex>  
  )
}