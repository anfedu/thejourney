import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  icon: { color: "grey", width: 30, height: 30, position: "relative", top: 3 },
  buttonImage: {
    borderRadius: "100%",
  },
  image: {
    width: 200,
    height: 200,
    fontWeight: "bold",
    fontSize: 120,
    "&:hover": {
      opacity: 0.7,
    },
  },
  photocamera: {
    zIndex: 99,
    position: "absolute",
    color: "white",
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "pink",
    },
  },
}));

export default function CardProfile({ user, login }) {
  const classes = useStyles();
  const theme = useTheme();
  const userId = parseInt(user.id);
  // const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const token = user.token;
  const [files, setFiles] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
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

  function randomColor(string) {
    return "#f" + string.slice(1, 6);
  }

  return (
    <Grid
      item
      xs={12}
      sm={12}
      lg={12}
      align="center"
      style={{ marginBottom: "3%" }}
    >
      <Button
        component="label"
        className={classes.buttonImage}
        onChange={onChange}
      >
        {loading ? (
          <>
            <Avatar
              src={`${process.env.server}/images/${user.profile}`}
              className={classes.image}
              style={{
                backgroundColor: randomColor(user.phone ? user.phone : "pink"),
              }}
            />
            <CircularProgress
              size={50}
              style={{ color: "white", position: "absolute" }}
            />
          </>
        ) : user.image !== "image.png" ? (
          <Avatar
            src={`${process.env.server}/images/${user.profile}`}
            className={classes.image}
            style={{
              backgroundColor: randomColor(user.phone ? user.phone : "pink"),
            }}
          >
            {user?.username?.slice(0, 1).toUpperCase()}
          </Avatar>
        ) : (
          ""
        )}
        <input id="attachment" name="attachmentImage" type="file" hidden />
      </Button>
    </Grid>
  );
}
