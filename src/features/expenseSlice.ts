import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Expense {
  id: number;
  name: string;
  category: string;
  amount: number;
}

const loadFromLocalStorage = (): Expense[] => {
  const data = localStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (expenses: Expense[]) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const initialState: { expenses: Expense[]; editingExpense: Expense | null } = {
  expenses: loadFromLocalStorage(),
  editingExpense: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
      saveToLocalStorage(state.expenses);
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      saveToLocalStorage(state.expenses);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
        saveToLocalStorage(state.expenses);
      }
    },
    setEditingExpense: (state, action: PayloadAction<Expense | null>) => {
      state.editingExpense = action.payload;
    },
  },
});

export const { addExpense, deleteExpense, updateExpense, setEditingExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
