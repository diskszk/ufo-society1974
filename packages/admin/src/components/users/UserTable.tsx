import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import UserTableBody from "./UserTableBody";
import { User } from "../../lib/types";
import { getUsers } from "../../lib/_users/getUsers";
import {
  createRequestFetchAction,
  createFailedFetchAction,
  crateSuccessFetchAction,
} from "../../store/LoadingStatusReducer";
import { AddIconButton } from "../AddIconButton";

type PresentationProps = {
  href: string;
  users: User[];
};

export const Presentation: React.FC<PresentationProps> = ({ href, users }) => {
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
                <AddIconButton href={href} label="アカウント作成" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, key) => {
              return <UserTableBody user={user} key={key} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(createRequestFetchAction());
        const userList = await getUsers();

        setUsers(userList);
        dispatch(crateSuccessFetchAction());
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
        history.push("/");
      }
    };

    fetch();
  }, [setUsers, dispatch, history]);

  return <Presentation href="/users/create" users={users} />;
};

export default UserTable;
