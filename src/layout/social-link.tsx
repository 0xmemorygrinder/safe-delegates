"use client";

import { FC } from "react";
import { Link } from "@tanstack/react-router";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface SocialLinkProps {
  href: string;
  icon: IconType;
}


export const SocialLink: FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <Link to={href}>
      <Icon w={3} h={3} as={icon} />
    </Link>
  )
}