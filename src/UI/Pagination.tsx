import { cn } from "../lib/cn";

type TPaginationProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
};

const Pagination = ({ table }: TPaginationProps) => {
  return (
    <div className={cn("text-sm w-full px-6")}>
      <div className={cn("h-8")} />
      <div
        className={cn(
          "flex items-center w-full flex-wrap justify-center gap-4"
        )}
      >
        <button
          className={cn(
            "border !py-1 text-sm !text-white !bg-[#115d74e8] !px-3"
          )}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className={cn("border !py-1 text-sm !px-4")}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className={cn("border !py-1 text-sm !px-4")}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className={cn(
            "border !py-1 text-sm !text-white !bg-[#115d74e8] !px-3"
          )}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className={cn("flex items-center gap-1")}>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className={cn("flex items-center gap-1")}>
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className={cn("border p-1 w-12")}
          />
        </span>
        <select
          className={cn("border p-1")}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
