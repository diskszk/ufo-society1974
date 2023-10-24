import { TextField, TextFieldProps } from "@mui/material";

export const StyledTextField: React.FC<TextFieldProps> = (props) => (
  <TextField
    {...props}
    sx={{
      margin: "1.5em 0",
      width: "80%",
    }}
  />
);
