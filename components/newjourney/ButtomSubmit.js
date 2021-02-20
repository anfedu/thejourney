import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { AuthContext } from "../../src/Provider";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: "#2E86DE",
    textTransform: "none",
    color: "white",
    height: 30,
    width: 100,
    marginTop: theme.spacing(2),
  },
}));

export default function ButtomSubmit({
  values,
  files,
  setAlert,
  setFiles,
  setValues,
  setState,
  EditorState,
}) {
  const classes = useStyles();
  const context = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const { user } = context;
  const postJourney = async () => {
    if (
      values.title.trim() === "" ||
      values.editor.trim() === "" ||
      files === null
    ) {
      setAlert({ error: "Content or image must not be empty" });
    } else {
      setLoading(true);
      const token = user.token;
      const userId = user.id;
      const editor = values.editor.replace(/<img[^>]*>/g, "");
      const data = new FormData();
      data.append("image", files);
      data.append("editor", editor);
      data.append("userId", userId);
      data.append("title", values.title);
      data.append("bookmark", 0);
      // const url = `http://localhost:5000/api/v1/journey`;
      const url = `${process.env.server}/api/v1/journey`;
      const config = {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(url, config)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setAlert({ success: "Post journey successfully" });
            setLoading(false);
            setValues({ title: "", editor: "" });
            setFiles(null);
            setState({ state: EditorState.createEmpty() });
          }
        })
        .catch((err) => {
          setAlert({ error: err.message });
          setLoading(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postJourney();
  };

  return (
    <Grid item lg={12} align="right">
      <Button
        variant="contained"
        className={classes.submit}
        onClick={handleSubmit}
      >
        {loading ? (
          <CircularProgress size={15} style={{ color: "white" }} />
        ) : (
          "Post"
        )}
      </Button>
    </Grid>
  );
}
