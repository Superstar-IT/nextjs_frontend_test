"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import axiosInstance from "@/lib/axios-instance";

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const fetchCommentByPostId = async (post_id: string): Promise<[Comment]> => {
  const { data } = await axiosInstance.get(`/posts/${post_id}/comments`); // Axios auto-parses JSON
  return data as [Comment];
};

export function CommentTable({ initialData, postId }: { initialData: [Comment]; postId: string }) {
  const { data } = useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => fetchCommentByPostId(postId),
    initialData,
    enabled: !!postId,
  });

  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "body", header: "body" },
  ];
  const table = useReactTable({
    data,
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
            <tr key={row.id} className="hover:bg-gray-700">
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
