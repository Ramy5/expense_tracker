/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { cn } from "../lib/cn";
import Button from "../UI/Button";
import Table from "../UI/Table";
import { ColumnDef } from "@tanstack/react-table";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deleteExpense, setEditingExpense } from "../features/expenseSlice";

const ExpenseList = () => {
  const { expenses, editingExpense } = useSelector(
    (state: RootState) => state.expenses
  );
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const deleteRow = (id: number) => {
    dispatch(deleteExpense(id));
  };

  const editRow = (expense: any) => {
    dispatch(setEditingExpense(expense));
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    dispatch(setEditingExpense(null));
  };

  const expenseColumns: ColumnDef<any, any>[] = [
    {
      accessorKey: "name",
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "category",
      header: () => <span>Category</span>,
      cell: (info) => info.getValue(),
      meta: { filterVariant: "select" },
    },
    {
      accessorKey: "amount",
      header: () => <span>Amount ($)</span>,
      cell: (info) => `$${info.getValue().toFixed(2)}`,
      meta: { filterVariant: "range" },
    },
    {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: ({ row }) =>
        row.original.name !== "Total" ? (
          <div className="flex space-x-4">
            <button
              onClick={() => editRow(row.original)}
              style={{
                color: "blue",
                cursor: "pointer",
                border: "none",
                background: "none",
              }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => deleteRow(row.original.id)}
              style={{
                color: "red",
                cursor: "pointer",
                border: "none",
                background: "none",
              }}
            >
              ❌ Delete
            </button>
          </div>
        ) : null,
    },
  ];

  return (
    <>
      <div className={cn("pt-8 pb-2 px-4 flex justify-end")}>
        <Button onClick={() => setIsOpen(true)} />
      </div>

      {expenses.length === 0 ? (
        <p
          className={cn(
            "text-center text-2xl md:text-3xl font-semibold text-cyan-700 mt-12"
          )}
        >
          No expenses found. Add a new expense to get started.
        </p>
      ) : (
        <Table data={expenses} columns={expenseColumns} />
      )}

      {/* Expense Form Modal for Adding/Editing */}
      <ExpenseForm
        isOpen={isOpen}
        onClose={handleClose}
        initialValues={editingExpense || undefined}
      />
    </>
  );
};

export default ExpenseList;
