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
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios-instance";

export interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<[Post]> => {
  const { data } = await axiosInstance.get("/posts"); // Axios auto-parses JSON
  return data as [Post];
};

const fetchPostsByUserId = async (user_id: string): Promise<[Post]> => {
  const { data } = await axiosInstance.get(`/users/${user_id}/posts`); // Axios auto-parses JSON
  return data as [Post];
};

export function PostTable({ initialData, userId }: { initialData: [Post]; userId?: string }) {
  const { data } = useQuery({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: () => (userId ? fetchPostsByUserId(userId) : fetchPosts()),
    initialData,
  });

  const router = useRouter();

  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const posts = useMemo(() => {
    if (!filter) return data;
    const keyword = filter.toLocaleLowerCase();
    console.log("-----------------------");
    return data.filter((post) => {
      return post.title.toLocaleLowerCase().includes(keyword);
    });
  }, [data, filter]);

  const columns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Title
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        );
      },
    },
    { accessorKey: "body", header: "Body" },
  ];
  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
    state: {
      sorting,
    },
    // onSortingChange: setSorting,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="grid gap-4 p-4">
      <Input
        placeholder="Filter title"
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
                const post_id = row.getValue("id");
                router.push(`/posts/${post_id}`);
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
