import PropTypes from "prop-types";

const Form = ({ onSubmit, className, children }) => {
  return (
    <>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </>
  );
};

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.array,
};
