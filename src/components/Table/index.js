import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function BasicTable({ list, onDismiss }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Заголовок</TableCell>
            <TableCell align="right">Автор</TableCell>
            <TableCell align="right">Комментарии</TableCell>
            <TableCell align="right">Очки</TableCell>
            <TableCell align="right">Архив</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((el) => (
            <TableRow key={el.objectID}>
              <TableCell component="th" scope="row">
                {el.title}
              </TableCell>
              <TableCell align="right">{el.author}</TableCell>
              <TableCell align="right">{el.num_comments}</TableCell>
              <TableCell align="right">{el.points}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => onDismiss(el.objectID)}
                  variant="contained"
                  color="secondary"
                  disableElevation
                >
                  Отбросить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
