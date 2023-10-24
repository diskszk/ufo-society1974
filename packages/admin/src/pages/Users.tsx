import React from "react";
import { BackButton } from "../components/UIKit";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../types";
import { AddIconButton } from "../components/AddIconButton";

const UserTableBody = ({ user }: { user: User }) => {
  return (
    <TableRow key={user.uid}>
      <TableCell component="th" scope="row">
        {user.uid}
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell
        sx={{
          cursor: "pointer",
        }}
        onClick={() => void 0}
      >
        削除
      </TableCell>
    </TableRow>
  );
};

const UserTable = ({ users }: { users: User[] }) => {
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
                <Link to="/users/create">
                  <AddIconButton label="アカウント作成" />
                </Link>
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

export const UsersPage: React.FC = () => {
  const users: User[] = [];

  return (
    <section className="page">
      <h1>ユーザー管理ページ</h1>
      <div className="spacing-div"></div>
      <div className="spacing-div"></div>
      <UserTable users={users} />
      <div className="button-container-row">
        <BackButton>もどる</BackButton>
      </div>
    </section>
  );
};
