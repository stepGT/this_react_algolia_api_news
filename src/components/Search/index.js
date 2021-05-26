import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export function BasicTextFields({ value, onChange, onSubmit, children }) {
  const classes = useStyles();

  return (
    <form
      onSubmit={onSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={value}
        onChange={onChange}
        id="standard-basic"
        label={children}
      />
      <Button type="submit" variant="contained" color="primary">
        {children}
      </Button>
    </form>
  );
}
