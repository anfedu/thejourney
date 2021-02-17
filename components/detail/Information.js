import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  IconButton,
  Divider,
  Hidden,
  Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ButtonBooking from "./ButtonBooking";
import { formatDate, formatMoney } from "../../src/formatter";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Nunito",
  },
  root: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  subTitle: {
    fontFamily: "Nunito",
    fontSize: 13,
    fontWeight: 800,
    color: "#ababab",
  },
  body: {
    fontSize: 18,
  },
  price: {
    fontSize: 24,
    fontFamily: "Nunito",
    color: "#ffaf00",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  count: {
    fontSize: 24,
    fontFamily: "Nunito",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  button: {
    backgroundColor: "#ffaf00",
    width: 19,
    height: 19,
    position: "relative",
    marginInline: 3,
    bottom: 3,
    [theme.breakpoints.down("xs")]: {
      marginInline: 7,
      width: 13,
      height: 13,
    },
  },
  countWrap: {
    marginInline: 20,
    [theme.breakpoints.down("xs")]: {
      marginInline: 5,
    },
  },
}));

export default function Information({ item }) {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const [price, setPrice] = React.useState(item.price);
  React.useEffect(() => {
    if (item.price) {
      setPrice(item.price);
    }
  }, [item.price]);
  const onPlus = () => {
    setPrice(price + item.price);
    setCount(count + 1);
  };
  const onMinus = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice(price - item.price);
    }
  };
  const array = [
    {
      id: 1,
      icon: "/hotel.png",
      title: "Accomodation",
      value: item.accomodation,
    },
    {
      id: 2,
      icon: "/plane.png",
      title: "Transportation",
      value: item.transportation,
    },
    { id: 3, icon: "/meal.png", title: "Eat", value: item.eat },
    {
      id: 4,
      icon: "/time.png",
      title: "Duration",
      value: { day: item.day, night: item.night },
    },
    { id: 5, icon: "/calendar.png", title: "Date Trip", value: item.dateTrip },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item sm={12} xs={12} md={12} lg={12}>
        <Typography variant="h6" className={classes.title}>
          Information Trip
        </Typography>
      </Grid>
      <Hidden mdDown>
        <Box
          variant="div"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {array.map((item, i) => (
            <Box variant="div" key={i}>
              <Typography variant="h6" className={classes.subTitle}>
                {item.title}
              </Typography>
              <Typography variant="h6" className={classes.body}>
                <img
                  style={{ position: "relative", top: 4, marginRight: 10 }}
                  src={item.icon}
                  alt=""
                />
                {item.title === "Date Trip"
                  ? formatDate(item.value)
                  : item.title === "Duration"
                  ? item.value.day + " Day " + item.value.night + " Night"
                  : item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Hidden>
      <Hidden lgUp>
        {array.map((item, i) => (
          <Grid item xs={6} lg={2} key={i}>
            <Typography variant="h6" className={classes.subTitle}>
              {item.title}
            </Typography>
            <Typography variant="h6" className={classes.body}>
              <img
                style={{ position: "relative", top: 4, marginRight: 10 }}
                src={item.icon}
                alt=""
              />
              {item.title === "Date Trip"
                ? formatDate(item.value)
                : item.title === "Duration"
                ? item.value.day + " Day " + item.value.night + " Night"
                : item.value}
            </Typography>
          </Grid>
        ))}
      </Hidden>
      <Grid item lg={12} sm={12} xs={12} style={{ marginBottom: 30 }}>
        <Typography variant="h6" className={classes.title}>
          Description
        </Typography>
        <Typography variant="h6" className={classes.subTitle}>
          {item.description}
        </Typography>
      </Grid>
      <Grid item xs={8} lg={6}>
        <Typography variant="h6" className={classes.price}>
          IDR. {formatMoney(item.price)}{" "}
          <span className={classes.count} style={{ color: "black" }}>
            {" "}
            / Person
          </span>
        </Typography>
      </Grid>
      <Grid item xs={4} lg={6} align="right">
        <Typography variant="h6" className={classes.count}>
          <IconButton className={classes.button} onClick={onMinus}>
            <RemoveIcon style={{ color: "white" }} />
          </IconButton>
          <span className={classes.countWrap}>{count}</span>
          <IconButton className={classes.button} onClick={onPlus}>
            <AddIcon style={{ color: "white" }} />
          </IconButton>
        </Typography>
      </Grid>

      <Grid item xs={12} lg={12}>
        <Divider style={{ height: 3 }} />
      </Grid>
      <Grid item xs={6} lg={6} className={classes.count}>
        Total :
      </Grid>
      <Grid item xs={6} lg={6} className={classes.price} align="right">
        IDR. {formatMoney(price)}
      </Grid>
      <Grid item xs={12} lg={12}>
        <Divider style={{ height: 3 }} />
      </Grid>
      <Grid item xs={12} lg={12} align="right" style={{ marginTop: 35 }}>
        <ButtonBooking price={price} count={count} tripId={item.id} />
      </Grid>
    </Grid>
  );
}
