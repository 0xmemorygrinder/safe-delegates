'use client';
import { FC } from "react";
import { useParams } from "@tanstack/react-router";
import { Badge } from "@chakra-ui/react";

export const SafeBadge: FC = () => {
  const { safeId } = useParams({ strict: false });

  return safeId ? <Badge bg="#edeef0" color="black" fontSize="sm" borderRadius={'full'} py={1} px={2}>{safeId}</Badge> : null;
}