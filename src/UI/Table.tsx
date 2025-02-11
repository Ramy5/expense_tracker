import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Filter from "./Filter";
import { cn } from "../lib/cn";
import Pagination from "./Pagination";

type TTable = {
  data: RowData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any, any>[];
};

function Table({ data, columns }: TTable) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentPageTotal = table
    .getRowModel()
    .rows.reduce((sum, row) => sum + (row.original.amount || 0), 0);

  return (
    <div className={cn("p-4  mb-8")}>
      <div className={cn("w-full overflow-x-auto")}>
        <table className="w-full">
          <thead className={cn("text-left")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={cn("text-sm text-white bg-[#115d74e8]")}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={cn("p-3")}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div className={cn("mt-3")}>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  className={cn(
                    "border-b border-b-[#115d744c] shadow-xs bg-[#f1f1f11a]  text-sm hover:bg-gray-200 transition-all duration-200 hover:text-black"
                  )}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className={cn("p-[14px]")} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot className="sticky bottom-0 bg-gray-300 text-black font-bold">
            <tr>
              <td className="p-3 text-left">Total</td>
              <td></td>
              <td className="p-3">${currentPageTotal.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Pagination table={table} />
    </div>
  );
}

export default Table;
