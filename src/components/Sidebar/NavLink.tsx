import { ElementType } from "react";
import { Icon, Link, Text, LinkProps as CHKLinkProps } from "@chakra-ui/react";

interface NavLinkProps extends CHKLinkProps {
    icon: ElementType,
    children: string
}

export default function NavLink({ children, icon, ...rest }: NavLinkProps){
    return(
        <Link { ...rest } display="flex" alignItems="center">
            <Icon as={ icon } fontSize="20"/>
            <Text ml="4" fontWeight="medium">
                { children }
            </Text>
        </Link>
    )
}