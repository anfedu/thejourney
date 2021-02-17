import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Nunito",
    fontWeight: 900,
    fontSize: 36,
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: 900,
  },
  label: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "#8A8C90",
  },
  icon: { color: "grey", width: 30, height: 30, position: "relative", top: 3 },
  buttonImage: {
    width: 230,
    height: 255,
    backgroundColor: "#eee",
    [theme.breakpoints.down("xs")]: {
      width: 200,
      height: 200,
      borderRadius: "100%",
    },
  },
  image: {
    width: 230,
    height: 255,
    borderRadius: 5,
    [theme.breakpoints.down("xs")]: {
      width: 200,
      height: 200,
      borderRadius: "100%",
    },
  },
  labelImage: {
    fontFamily: "Nunito",
    width: 230,
    height: 45,
    backgroundColor: "#ffaf00",
    paddingTop: 13,
    position: "absolute",
    bottom: -65,
    textTransform: "none",
    cursor: "pointer",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 13,
    "&:hover": {
      backgroundColor: "#ffaf77",
    },
    [theme.breakpoints.down("xs")]: {
      bottom: -70,
      width: 150,
      borderRadius: 23,
    },
  },
  textphoto: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 900,
    color: "white",
  },
  card: {
    borderRadius: 5,
    [theme.breakpoints.down("xs")]: {
      minHeight: 500,
    },
  },
  grid1: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  grid2: { marginTop: 90, [theme.breakpoints.up("sm")]: { display: "none" } },
}));

export default function CardProfile({ user, login }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const userId = parseInt(user.id);
  const token = user.token;
  const [files, setFiles] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState(null);
  const onChange = (e) => {
    let file = e.target.files[0];
    setFiles(file);
  };
  const updatePhotoProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profileImage", files);
    // const url = `http://localhost:5000/api/v1/user/3`;
    const url = `${process.env.server}/api/v1/user/${userId}`;
    const config = {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, config)
      .then((res) => res.json())
      .then((res) => {
        login(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, "this is error e");
      });
  };

  React.useEffect(() => {
    if (files) {
      updatePhotoProfile();
    }
  }, [files]);

  const arrayUser = [
    { id: 1, icon: AccountCircleIcon, value: user.username, label: "Username" },
    { id: 2, icon: EmailIcon, value: user.email, label: "Email" },
    { id: 3, icon: PhoneIcon, value: user.phone, label: "Mobile Phone" },
    { id: 1, icon: LocationOnIcon, value: user.address, label: "Address" },
  ];
  return (
    <Grid item xs={12} sm={11} lg={7}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            spacing={1}
            justify={matches ? "center" : "flex-start"}
          >
            <Grid item sm={7} lg={7} className={classes.grid1}>
              <Typography variant="h3" className={classes.title}>
                Personal Info
              </Typography>
              <Grid container spacing={0}>
                {arrayUser.map((item, i) => (
                  <React.Fragment key={i}>
                    <Grid item sm={2} lg={2}>
                      <item.icon className={classes.icon} />
                    </Grid>
                    <Grid item sm={10} lg={10} style={{ marginLeft: -11 }}>
                      <Typography variant="h6" className={classes.subtitle}>
                        {item.value}
                      </Typography>
                      <Typography variant="body1" className={classes.label}>
                        {item.label}
                      </Typography>
                      <br />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={10}
              sm={5}
              lg={5}
              align={matches ? "center" : "right"}
            >
              <Button
                variant="outlined"
                component="label"
                className={classes.buttonImage}
                onChange={onChange}
              >
                {loading ? (
                  <CircularProgress size={50} style={{ color: "white" }} />
                ) : user.image !== "image.png" ? (
                  <img
                    src={`${process.env.server}/images/${user.profile}`}
                    className={classes.image}
                    alt=""
                  />
                ) : (
                  <PhotoCameraIcon
                    style={{ color: "#878787", width: 90, height: 90 }}
                  />
                )}
                <input
                  id="attachment"
                  name="attachmentImage"
                  type="file"
                  hidden
                />
                <label
                  htmlFor="attachment"
                  className={classes.labelImage}
                  style={{}}
                >
                  <Typography variant="h1" className={classes.textphoto}>
                    Change {!matches && "Photo"} Profile
                  </Typography>
                </label>
              </Button>
            </Grid>
            <Grid item xs={12} sm={7} lg={7} className={classes.grid2}>
              <Grid container spacing={0}>
                {arrayUser.map((item, i) => (
                  <React.Fragment key={i}>
                    <Grid item xs={2} sm={2} lg={2}>
                      <item.icon className={classes.icon} />
                    </Grid>
                    <Grid
                      item
                      xs={10}
                      sm={10}
                      lg={10}
                      style={{ marginLeft: matches ? 0 : -11 }}
                    >
                      <Typography variant="h6" className={classes.subtitle}>
                        {item.value}
                      </Typography>
                      <Typography variant="body1" className={classes.label}>
                        {item.label}
                      </Typography>
                      <br />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
