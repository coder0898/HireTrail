// const Button = ({ type, onClickFunction, Content, className, ...rest }) => {
//   return (
//     <>
//       <button
//         type={type}
//         onClick={onClickFunction}
//         className={className}
//         {...rest}
//       >
//         {Content}
//       </button>
//     </>
//   );
// };

// export default Button;

const Button = ({
  type = "button",
  onClick,
  children, // use standard 'children' instead of 'Content'
  disable,
  className = "", // default to empty string
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${
        disable ? "opacity-50 cursor-not-allowed" : ""
      }`} // merge default + custom classes
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
