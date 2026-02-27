const Button = ({ type, onClickFunction, Content, className }) => {
  return (
    <>
      <button type={type} onClick={onClickFunction} className={className}>
        {Content}
      </button>
    </>
  );
};

export default Button;
