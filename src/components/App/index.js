import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import * as constants from "../../constants";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function App() {
  const classes = useStyles();
  const [searchTopStories, setSearchTopStories] = useState([]);

  useEffect(() => {
    axios(
      `${constants.PATH_BASE}${constants.PATH_SEARCH}?${constants.PARAM_SEARCH}&${constants.PARAM_PAGE}&${constants.HITSPERPAGE}${constants.DEFAULT_COUNT}`
    )
      .then((result) => setSearchTopStories(result.data.hits))
      .catch((error) => console.log(error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="right">Num comments</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchTopStories.map((el) => (
            <TableRow key={el.objectID}>
              <TableCell component="th" scope="row">
                {el.title}
              </TableCell>
              <TableCell align="right">{el.num_comments}</TableCell>
              <TableCell align="right">{el.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
