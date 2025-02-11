import classes from "./Button.module.css";

type TButton = {
  onClick: () => void;
};

const Button = ({ onClick }: TButton) => {
  return (
    <button onClick={onClick} className={classes.button}>
      <span>Add Expense</span>
    </button>
  );
};

export default Button;
