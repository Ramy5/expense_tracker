import ExpenseList from "./components/ExpenseList";
import { cn } from "./lib/cn";

function App() {
  return (
    <p
      className={cn(
        "max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[60rem] lg:px-6 mx-auto"
      )}
    >
      <ExpenseList />
    </p>
  );
}

export default App;
