import { render, renderHook, screen } from "@testing-library/react";
import { SelectRoleController } from "./SelectRoleController";
import { useForm } from "react-hook-form";
import { CreateUserInputs } from "../../schemas/createUserSchema";

test("[role=select]", () => {
  const { result } = renderHook(() => useForm<CreateUserInputs>());

  render(
    <SelectRoleController
      control={result.current.control}
      options={[{ value: "hoge", label: "fuga" }]}
    />
  );
  expect(screen.getByRole("option")).toBeTruthy();
});
