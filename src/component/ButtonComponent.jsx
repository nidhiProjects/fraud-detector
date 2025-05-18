const ButtonComponent = ({
  title,
  padding,
  handleClick,
  type = "button",
  className,
}) => {
  return (
    <div className={`button-container ${className}`}>
      <div className="corner-tl"></div>
      <div className="corner-tr"></div>
      <div className="corner-bl"></div>
      <div className="corner-br"></div>
      <button
        className="my-button "
        type={type}
        onClick={handleClick}
        style={{ padding }}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonComponent;
