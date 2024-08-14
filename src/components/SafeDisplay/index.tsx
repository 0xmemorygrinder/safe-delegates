"use client";
import { FC, useState } from "react";
import { 
  Card,
  CardHeader,
  Heading,
  CardBody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Flex,
  Button,
  Text,
  Icon,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { Address } from "viem";
import { BsTrash } from "react-icons/bs";
import { useSafeDisplay } from "./safe-display.logic";
import { EditPopover } from "./EditPopover";

export interface SafeDisplayProps {
  safe: Address;
}

export const SafeDisplay: FC<SafeDisplayProps> = (props) => {
  const { address, connected, delegates, isLoading, explorerBaseUrl, onCreate, onDelete } = useSafeDisplay(props);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delegate, setDelegate] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  return (
    <>
      <Card w="full">
        <CardHeader>
          <Flex justifyContent="space-between">
            <Heading size='lg'>Safe's delegates</Heading>
            <Button bg="primary.500" color="white" size="sm" onClick={onOpen}>Add delegate</Button>
          </Flex>
        </CardHeader>

        <CardBody>
          <TableContainer>
            { connected && (
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th px={1} textColor="white">Delegator</Th>
                    <Th px={1} textColor="white">Delegate</Th>
                    <Th px={1} textColor="white">Label</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    isLoading && (
                      <Tr>
                        <Td colSpan={4} textAlign="center"><Spinner /></Td>
                      </Tr>
                    )
                  }
                  {
                    !isLoading && delegates!.length === 0 && (
                      <Tr>
                        <Td textAlign="center" colSpan={4}>No delegates found</Td>
                      </Tr>
                    ) 
                  }
                  {
                    !isLoading && delegates!.map((delegation, idx) => (
                      <Tr key={idx}>
                        <Td px={1}>
                            <Link to={`${explorerBaseUrl}/${delegation.delegator}`}>{delegation?.delegator.slice(0, 6)}...{delegation?.delegator.slice(-4)}</Link>
                        </Td>
                        <Td px={1}>
                        <Link to={`${explorerBaseUrl}/${delegation.delegate}`}>{delegation?.delegate.slice(0, 6)}...{delegation?.delegate.slice(-4)}</Link>
                        </Td>
                        <Td px={1}>{delegation.label}</Td>
                        <Td px={1} >
                          {
                            delegation.delegator === address && (
                              <Flex gap={2} justify={"end"}>
                                <EditPopover label={delegation.label} onSave={(label) => onCreate(delegation.delegate, label)} />
                                <Button variant="outline" color="white" size="sm" px={2} onClick={() => onDelete(delegation.delegate)}><Icon as={BsTrash} /></Button>
                              </Flex>
                          )}
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            )}
            { !connected && (
              <Text my={12} textAlign={"center"}>Connect your wallet to see your safe's delegates</Text>
            )}
          </TableContainer>
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="#18191b">
          <ModalHeader>Add a delegate</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input value={delegate} onChange={(e) => setDelegate(e.target.value)} placeholder='Delegate address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Label</FormLabel>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder='Keeper' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button bg="primary.500" onClick={() => {
              console.log('delegate', delegate);
              if (delegate && label) {
                onCreate(delegate as Address, label);
              }
            }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}