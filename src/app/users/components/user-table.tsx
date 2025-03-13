"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios-instance";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

const fetchUsers = async (): Promise<[User]> => {
  const { data } = await axiosInstance.get("/users"); // Axios auto-parses JSON
  return data as [User];
};

export function UserTable({ initialData }: { initialData: [User] }) {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialData,
  });

  const router = useRouter();

  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");

  const columns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "username", header: "UserName" },
    { accessorKey: "email", header: "Email" },
  ];

  const users = useMemo(() => {
    if (!filter) return data;
    const keyword = filter.toLocaleLowerCase();
    return data.filter((user) => {
      return user.name.toLocaleLowerCase().includes(keyword) || user.username.toLocaleLowerCase().includes(keyword);
    });
  }, [data, filter]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
  });

  return (
    <div className="grid gap-4 p-4">
      <Input
        placeholder="Filter name or username"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
        className="max-w-sm"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-300 p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-700"
              onClick={() => {
                const user_id = row.getValue("id");
                router.push(`/users/${user_id}`);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="mt-2">
        <label className="mr-2">Rows per page:</label>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            table.setPageSize(Number(e.target.value));
          }}
          className="rounded border bg-transparent p-1"
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
