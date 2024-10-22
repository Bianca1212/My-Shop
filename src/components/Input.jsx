import PropTypes from "prop-types";

const Input = ({ name, type, placeholder, value, onChange }) => {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-2 text-center rounded-md border-gray-700 w-full md:w-auto max-w-xs"
      />
    </>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  //   value: PropTypes.object,
  //   props: PropTypes.string,
};
