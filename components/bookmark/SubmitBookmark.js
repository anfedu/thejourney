import React from "react";
import { IconButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { QueryContext } from "../../src/Query";
import { useRouter } from "next/router";

export default function SubmitBookmark({ bookmark, user, item }) {
  const router = useRouter();
  const [color, setColor] = React.useState("white");
  const [loading, setLoading] = React.useState(false);
  const query = React.useContext(QueryContext);
  const { dispatch, state } = query;
  const rows = [...state.journey];
  const rowsBookmark = [...state.journeyBookmark];

  function removeItemOnce(arr) {
    var findIndex = arr.findIndex((d) => d.id === item.id);
    if (findIndex > -1) {
      arr.splice(findIndex, 1);
    }
    return arr;
  }

  const updateJourney = async () => {
    // const url = `http://localhost:5000/api/v1/journey/${parseInt(item.id)}`;
    const url = `${process.env.server}/api/v1/journey/${parseInt(item.id)}`;
    const bookmark = { bookmark: parseInt(user.id) };
    const config = {
      method: "PATCH",
      body: JSON.stringify(bookmark),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };
    const configBack = {
      method: "PATCH",
      body: JSON.stringify({ bookmark: 0 }),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    if (user.id !== null && item.bookmark === parseInt(user.id)) {
      setLoading(true);
      await fetch(url, configBack)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setLoading(false);
            if (router.pathname === "/bookmark") {
              const newArray = removeItemOnce(rowsBookmark);
              dispatch({
                type: "JOURNEYBOOKMARK",
                payload: [...newArray],
              });
            } else {
              setColor("white");
              const objIndex = rows.findIndex((d) => d.id === item.id);
              rows[objIndex].bookmark = 0;
              dispatch({
                type: "JOURNEY",
                payload: [...rows],
              });
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    } else {
      setLoading(true);
      await fetch(url, config)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setLoading(false);
            if (router.pathname === "/bookmark") {
              const newArray = removeItemOnce(rowsBookmark);
              dispatch({
                type: "JOURNEYBOOKMARK",
                payload: [...newArray],
              });
            } else if (user.id !== null) {
              setColor("aquamarine");
              const objIndex = rows.findIndex((d) => d.id === item.id);
              rows[objIndex].bookmark = parseInt(user.id);
              dispatch({
                type: "JOURNEY",
                payload: [...rows],
              });
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateJourney();
  };

  React.useEffect(() => {
    if (item.bookmark === parseInt(user.id)) {
      setColor("aquamarine");
    } else {
      setColor("white");
    }
  }, []);

  return (
    <>
      <IconButton
        className={bookmark}
        style={{
          backgroundColor: color,
        }}
        onClick={handleUpdate}
      >
        {loading ? (
          <CircularProgress size={20} style={{ position: "absolute" }} />
        ) : (
          <img style={{ width: 20, height: 20 }} src="/bookmark.png" alt="" />
        )}
      </IconButton>
    </>
  );
}
