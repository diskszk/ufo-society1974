import { Control, Controller } from "react-hook-form";
import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import { SelectOptions } from "../../types";
import { CreateUserInputs } from "../../schemas/createUserSchema";

type Props = {
  control: Control<CreateUserInputs>;
  options: SelectOptions;
};

export const SelectRoleController: React.FC<Props> = ({ control, options }) => {
  return (
    <Controller
      name={"roleType"}
      control={control}
      render={({ field }) => (
        <Box
          sx={{
            margin: "24px auto",
            width: "80%",
          }}
        >
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {"役職"}
            </InputLabel>
            <NativeSelect
              {...field}
              variant="standard"
              id="standard-select-currency-native"
              inputProps={{
                id: "uncontrolled-native",
              }}
              ref={field.ref}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
      )}
    />
  );
};
