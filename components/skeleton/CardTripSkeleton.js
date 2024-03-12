import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardTrip: {
    width: "100%",
    height: 350,
    padding: "7px 9px",
    borderRadius: 5,
    cursor: "pointer",
    // marginInline: theme.spacing(2),
  },
}));

export default function CardTripSkeleton() {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" className={classes.cardTrip} />
    </>
  );
}
