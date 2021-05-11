import React from "react";
import PropTypes from "prop-types";

export const Button = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
};

export const Loading = () => <div>Загрузка ...</div>;

export const withLoading = (Component) => ({ isLoading, ...rest }) => {
  return isLoading ? <Loading /> : <Component {...rest} />;
};

export const ButtonWithLoading = withLoading(Button);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
