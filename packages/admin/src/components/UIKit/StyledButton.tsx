import { Button, ButtonProps } from "@mui/material";

export const StyledButton: React.FC<ButtonProps> = (props) => (
  <Button
    {...props}
    sx={{
      backgroundColor: "#efefef",
      color: "#000",
      fontSize: "1em",
      height: "3em",
      marginBottom: "2.25em",
      width: "12em",
      zIndex: 0,
    }}
    variant="contained"
  >
    {props.children}
  </Button>
);
