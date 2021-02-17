import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  cardTransaction: {
    marginBottom: 20,
    display: "flex",
    width: 1035,
    height: 400,
    margin: "0 auto",
    border: "1px solid #878787",
    borderRadius: 5,
    padding: "7px 33px 0 33px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 470,
      padding: "7px 25px 7px 25px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      minHeight: 319,
      padding: "7px 7px 3px 7px",
    },
  },
}));

export default function CardTransactionSkeleton() {
  const classes = useStyles();
  return (
    <>
      {" "}
      <Skeleton variant="rect" className={classes.cardTransaction} />
    </>
  );
}
