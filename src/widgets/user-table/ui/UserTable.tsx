"use client";
import { useStores } from "@/app/hooks/use-store";
import { User } from "@/shared/types";
import { Checkbox, Table } from "@mantine/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";

type UserTableProps = {
  users: User[];
};

const Rows = observer(({ users }: UserTableProps) => {
  const [selected, setSelected] = useState<User | undefined>();
  const usersStore = useStores();

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>, user: User) => {
    setSelected(e.currentTarget.checked ? user : undefined);
    usersStore.setSelectedUser(e.currentTarget.checked ? user : undefined);
    console.log(usersStore.selectedUser?.name);
  };
  return (
    <>
      {users.map((user) => (
        <Table.Tr
          key={user.id}
          bg={
            user.id === selected?.id
              ? "var(--mantine-color-blue-light)"
              : undefined
          }
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              checked={user.id === selected?.id}
              onChange={(event) => {
                onSelect(event, user);
              }}
            />
          </Table.Td>
          <Table.Td>{user.name || "не указано"}</Table.Td>
          <Table.Td>{user.surName || "не указано"}</Table.Td>
          <Table.Td>{user.fullName || "не указано"}</Table.Td>
          <Table.Td>{user.email || "не указано"}</Table.Td>
          <Table.Td>
            {user.birthDate
              ? new Date(user.birthDate).toLocaleDateString()
              : "не указано"}
          </Table.Td>
          <Table.Td>{user.telephone || "не указано"}</Table.Td>
          <Table.Td>{user.employment || "не указано"}</Table.Td>
          <Table.Td>{user.userAgreement ? "+" : "-"}</Table.Td>
        </Table.Tr>
      ))}
    </>
  );
});

export const UserTable = observer(({ users }: UserTableProps) => {
  return (
    <Table withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Фамилия</Table.Th>
          <Table.Th>Полное имя</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Дата рождения</Table.Th>
          <Table.Th>Номер телефона</Table.Th>
          <Table.Th>Работа</Table.Th>
          <Table.Th>Согласие</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Rows users={users} />
      </Table.Tbody>
    </Table>
  );
});
