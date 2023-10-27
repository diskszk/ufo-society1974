import { Link } from "react-router-dom";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { AddIconButton } from "../../components/AddIconButton";
import { User } from "../../types";
import { UserListItem } from "./UserListItem";

type Props = {
  users: User[];
  isApproved: boolean;
};

export const UserList: React.FC<Props> = ({ users, isApproved }) => {
  return (
    <div className="user-table">
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ユーザーID</TableCell>
              <TableCell>お名前</TableCell>
              <TableCell>役職</TableCell>
              <TableCell>
                {isApproved && (
                  <Link to="/users/create">
                    <AddIconButton label="アカウント作成" />
                  </Link>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, key) => {
              return (
                <UserListItem key={key} user={user} isApproved={isApproved} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
