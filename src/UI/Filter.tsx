/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@tanstack/react-table";
import { InputHTMLAttributes, useEffect, useMemo, useState } from "react";
import { cn } from "../lib/cn";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant }: { filterVariant?: string } =
    column.columnDef.meta ?? {};

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === "range"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return filterVariant === "range" ? (
    <div>
      <div className={cn("flex items-center space-x-2 mt-3")}>
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className={cn(
            "p-2 text-white border w-26 border-gray-300 text-xs placeholder:text-gray-200 shadow"
          )}
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className={cn(
            "p-2 text-white border w-26 border-gray-300 text-xs placeholder:text-gray-200 shadow"
          )}
        />
      </div>
      <div className={cn("h-1")} />
    </div>
  ) : filterVariant === "select" ? (
    <select
      className={cn(
        "py-2 px-2 text-white border border-gray-300 cursor-pointer text-xs placeholder:text-gray-200 shadow"
      )}
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option className={cn("text-[#115d74e8]")} value="">
        All
      </option>
      {sortedUniqueValues.map((value) => (
        <option className={cn("text-[#115d74e8]")} value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className={cn(
          "p-2 text-white border border-gray-300 text-xs placeholder:text-gray-200 shadow"
        )}
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

export default Filter;
