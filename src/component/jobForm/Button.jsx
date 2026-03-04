const Button = ({ type, onClickFunction, Content, className, ...rest }) => {
  return (
    <>
      <button
        type={type}
        onClick={onClickFunction}
        className={className}
        {...rest}
      >
        {Content}
      </button>
    </>
  );
};

export default Button;
