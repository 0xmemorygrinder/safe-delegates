import { FC } from "react";
import { Td, Tr, Button, Flex, Skeleton } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { Address } from "viem";
import { useSafeRow } from "./safes-row.logic";

export interface SafeRowProps {
  safe: Address;
}

export const SafesRow: FC<SafeRowProps> = (props) => {
  const { safeInfo, isLoading, explorerUrl } = useSafeRow(props);

  return (
    <Tr key={props.safe}>
      <Td px={1}>
        <Skeleton isLoaded={!isLoading}>
          <Link href={explorerUrl}>{safeInfo?.address.slice(0, 6)}...{safeInfo?.address.slice(-4)}</Link>
        </Skeleton>
      </Td>
      <Td px={1}>
        <Skeleton isLoaded={!isLoading}>
        {safeInfo?.threshold}/{safeInfo?.owners.length}
        </Skeleton>
      </Td>
      <Td px={1}>
        <Flex gap={2} justify={"end"}>
          <Skeleton isLoaded={!isLoading}>
            <Link to="/safes/$safeId" params={{ safeId: safeInfo?.address || ''}}>
              <Button bg="primary.500" color="white" size="sm">Manage</Button>
            </Link>
          </Skeleton>
        </Flex>
      </Td>
    </Tr>
  )
}