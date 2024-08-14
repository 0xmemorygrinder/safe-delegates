import { Box, Heading } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { SafeDisplay } from "../components/SafeDisplay"
import { Address } from "viem";

export const Route = createFileRoute('/safes/$safeId')({
  component: PostComponent,
})

function PostComponent() {
  const { safeId } = Route.useParams();
  
  return (
    <Box px={12}>
      <Heading mb={4} size={'xl'}>Manage</Heading>
      <SafeDisplay safe={safeId as Address} />
    </Box>
  )
}