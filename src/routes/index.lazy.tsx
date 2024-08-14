import { SafesList } from '@/components/SafesList'
import { Box, Heading } from '@chakra-ui/react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Box px={12}>
      <Heading mb={4} size={'xl'}>Dashboard</Heading>
      <SafesList />
    </Box>
  )
}
