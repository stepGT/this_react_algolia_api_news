import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function ContainedButtons({ onClick, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={onClick} variant="contained">
        {children}
      </Button>
    </div>
  );
}

export function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export const withLoading =
  (Component) =>
  ({ isLoading, ...rest }) => {
    return isLoading ? <CircularIndeterminate /> : <Component {...rest} />;
  };

export const ButtonWithLoading = withLoading(ContainedButtons);
