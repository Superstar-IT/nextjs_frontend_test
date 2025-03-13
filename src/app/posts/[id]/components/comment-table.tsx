"use client";

import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios-instance";

import { NewCommentForm } from "./new-comment-form";

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
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => fetchCommentByPostId(postId),
    initialData,
    enabled: !!postId,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const addNewComment = (comment: Comment) => {
    const lastComment = data.at(-1);
    comment.id = (lastComment?.id ?? 0) + 1;
    comment.postId = lastComment?.postId ?? 0;
    queryClient.setQueryData(["posts", postId, "comments"], (oldData: [Comment]) => [...oldData, comment]);
    setIsOpen(false);
  };

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
      <div className="flex items-center justify-end">
        <Dialog
          open={isOpen}
          onOpenChange={(value) => {
            setIsOpen(value);
          }}
        >
          <DialogTrigger>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Add Comment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Comment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <NewCommentForm onSubmit={addNewComment} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
