import { FC } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "@tanstack/react-router";
import { SafeBadge } from "./safe-badge";

export const Header: FC = () => {
  return (
    <Flex as="header" w="full" align="center" p={4}>
      <Box flexGrow={1} flexBasis={0}>
        <Link href="/">
          <Heading fontSize="md" as="h1" >Safe Delegates</Heading>
        </Link>
      </Box>
      <SafeBadge />
      <Flex flexGrow={1} flexBasis={0} justifyContent="end">
        <ConnectButton showBalance={false} accountStatus="address"/>
      </Flex>
    </Flex>
  );
}