const Select = ({ name, value, onChange, className, children, ...props }) => {
  return (
    <>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        {...props}
      >
        {children}
      </select>
    </>
  );
};

export default Select;
