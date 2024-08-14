import { FC, PropsWithChildren } from "react"
import { Flex } from "@chakra-ui/react"
import { Header } from "./header"
import { Footer } from "./footer"

export const Layout: FC<PropsWithChildren<object>> = ({ children }) => {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" w={'full'}>
      <Header />
      <Flex direction="column" w="100%" flexGrow={1}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}