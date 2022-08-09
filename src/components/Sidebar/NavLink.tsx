import { ElementType } from "react";
import { Icon, Link as ChkLink, Text, LinkProps as CHKLinkProps } from "@chakra-ui/react";
import ActiveLink from "../ActiveLink";

interface NavLinkProps extends CHKLinkProps {
    icon: ElementType,
    children: string,
    href: string
}

export default function NavLink({ children, icon, href, ...rest }: NavLinkProps){
    return(
        <ActiveLink href={href} passHref>
            <ChkLink { ...rest } display="flex" alignItems="center">
                <Icon as={ icon } fontSize="20"/>
                <Text ml="4" fontWeight="medium">
                    { children }
                </Text>
            </ChkLink>
        </ActiveLink>
    )
}