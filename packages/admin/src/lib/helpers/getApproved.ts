import { RoleType } from "../../types";

export const getApproved = ({
  currentUserRole,
  approvedRole,
  status,
}: {
  currentUserRole: RoleType;
  approvedRole: RoleType;
  status: string;
}): boolean => {
  if (status !== "edit") {
    return false;
  }

  return currentUserRole === approvedRole;
};
