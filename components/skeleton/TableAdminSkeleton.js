import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Skeleton } from "@material-ui/lab";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({}) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">No</StyledTableCell>
              <StyledTableCell>Users</StyledTableCell>
              <StyledTableCell align="left">Trip</StyledTableCell>
              <StyledTableCell align="left">Proof Payment</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4].map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell align="left">{i + 1}</StyledTableCell>
                <StyledTableCell align="left">
                  <Skeleton />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Skeleton />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Skeleton />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Skeleton />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
