import { FC } from "react";
import { Card, CardHeader, Heading, CardBody, Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Spinner } from "@chakra-ui/react";
import { SafesRow } from "./SafeRow";
import { useSafesList } from "./safes-list.logic";

export const SafesList: FC = () => {
  const { connected, safes, isLoading } = useSafesList();

  return (
    <Card w="full">
      <CardHeader>
        <Heading size='lg'>My safes</Heading>
      </CardHeader>

      <CardBody>
        <TableContainer>
          { connected && (
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th px={1} textColor="white">Safe</Th>
                  <Th px={1} textColor="white">Owners</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  isLoading && (
                    <Tr>
                      <Td colSpan={3}><Spinner /></Td>
                    </Tr>
                  )
                }
                {
                  !isLoading && safes!.map(safe => (
                    <SafesRow key={safe} safe={safe} />
                  ))
                }
              </Tbody>
            </Table>
          )}
          { !connected && (
            <Text my={12} textAlign={"center"}>Connect your wallet to see your safes</Text>
          )}
        </TableContainer>
      </CardBody>
    </Card>
  )
}