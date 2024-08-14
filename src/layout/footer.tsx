"use client";
import { FC } from "react";
import { Avatar, Box, Divider, Flex, Heading, HStack, Text, Link } from "@chakra-ui/react";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { SocialLink } from "./social-link";

export const Footer: FC = () => {
  return (
    <Flex as="footer" justify={'space-between'} w="full" align="center" p={4}>
      <HStack gap={2}>
        <Heading fontSize="sm">Safe Delegates</Heading>
        <Divider orientation='vertical' borderColor="white" h={6}/>
        <Heading fontSize="xs">© 2024</Heading>
        <Heading fontSize="xs">All rights reserved</Heading>
      </HStack>
      <HStack gap={2}>
        <Avatar size="sm" name="Memory Grinder" src="/profile-picture.png" />
        <Box>
          <HStack gap={2}>
            <Heading fontSize="xs">0xMemoryGrinder</Heading>
            <HStack gap={1}>
              <SocialLink href="https://github.com/0xmemorygrinder" icon={BsGithub} />
              <SocialLink href="https://twitter.com/0xmemorygrinder" icon={BsTwitterX} />
            </HStack>
          </HStack>
          <Text fontSize="xs">Support me : <u><Link href="https://debank.com/profile/0x9D2Da9a98AF5CbAed356E190c2E05DCA21aba63e">0x9D2D...a63e</Link></u></Text>
        </Box>
      </HStack>
    </Flex>
  );
}