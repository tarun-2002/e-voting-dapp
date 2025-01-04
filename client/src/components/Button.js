import "./Button.css";

const Button = (props) => {
  return (
    <button className="button" type="button" onClick={props.handleClick}>{props.btnName}</button>
  );
};

export default Button;
