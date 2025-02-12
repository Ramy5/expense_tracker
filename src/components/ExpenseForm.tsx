import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../features/expenseSlice";
import { cn } from "../lib/cn";

type ExpenseFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: {
    id?: number;
    name: string;
    category: string;
    amount: number;
  };
};

type TValues = {
  name: string;
  category: string;
  amount: number;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  isOpen,
  onClose,
  initialValues,
}) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    amount: Yup.number()
      .positive("Amount must be positive")
      .required("Amount is required"),
  });

  const handleSubmit = (values: TValues) => {
    if (initialValues?.id) {
      dispatch(updateExpense({ id: initialValues.id, ...values }));
    } else {
      dispatch(addExpense({ id: Date.now(), ...values }));
    }
    onClose();
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, .6)" }}
      className={cn("fixed inset-0 flex items-center justify-center")}
    >
      <div
        className={cn(
          "bg-white p-6 rounded-lg shadow-lg w-[94%] animate_scale md:w-[85%] lg:w-1/2"
        )}
      >
        <h2 className={cn("text-lg font-bold mb-4")}>
          {initialValues ? "Edit Expense" : "Add Expense"}
        </h2>

        <Formik
          initialValues={initialValues || { name: "", category: "", amount: 0 }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={cn("flex items-center flex-wrap mb-20 gap-8")}>
              {/* Name Field */}
              <div className={cn("w-full sm:w-auto")}>
                <label className={cn("block text-sm font-medium mb-2")}>
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className={cn(
                    "w-full p-2 border rounded border-gray-400 text-gray-700"
                  )}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className={cn("text-red-500 text-sm")}
                />
              </div>

              {/* Category Field */}
              <div className="w-full sm:w-60">
                <label className={cn("block text-sm font-medium mb-2")}>
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className={cn(
                    "w-full p-2 border rounded border-gray-400 text-gray-700"
                  )}
                >
                  <option selected hidden>
                    Choose
                  </option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="p"
                  className={cn("text-red-500 text-sm")}
                />
              </div>

              {/* Amount Field */}
              <div className={cn("w-full sm:w-auto")}>
                <label className={cn("block text-sm font-medium mb-2")}>
                  Amount ($)
                </label>
                <Field
                  type="number"
                  name="amount"
                  className={cn(
                    "w-full p-2 border rounded border-gray-400 text-gray-700"
                  )}
                />
                <ErrorMessage
                  name="amount"
                  component="p"
                  className={cn("text-red-500 text-sm")}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className={cn("flex justify-center sm:justify-end gap-6")}>
              <button
                type="button"
                className={cn("px-4 py-2 rounded")}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={cn("px-4 py-2 !bg-[#115d74e8] !text-white rounded")}
              >
                {initialValues ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ExpenseForm;
