import React from "react";
import { IconButton } from "@mui/material";
import { LibraryAddOutlined } from "@mui/icons-material";

type Props = {
  label: string;
  href: string;
};
export const AddIconButton: React.FC<Props> = ({ label, href }) => (
  <IconButton href={href}>
    <span>{label}</span>
    <LibraryAddOutlined fontSize={"large"} />
  </IconButton>
);
