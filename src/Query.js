import React, { useReducer, createContext, useState } from "react";

const QueryContext = createContext({
  user: null,
  getJourney: () => {},
  getJourneyUser: () => {},
});

// <--- get meta data
function queryReducer(state, action) {
  switch (action.type) {
    case "JOURNEY":
      return {
        ...state,
        journey: action.payload,
      };
    case "JOURNEYDETAIL":
      return {
        ...state,
        journeyDetail: action.payload,
      };
    case "JOURNEYUSER":
      return {
        ...state,
        journeyUser: action.payload,
      };
    case "JOURNEYBOOKMARK":
      return {
        ...state,
        journeyBookmark: action.payload,
      };
    default:
      return state;
  }
}
function QueryProvider(props) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(queryReducer, {
    journey: [],
    journeyDetail: {},
    journeyUser: [],
    journeyBookmark: [],
  });

  const toJSON = (_) => _.json();
  // const url = "http://localhost:5000";
  const url = process.env.server;

  const getJourney = async () => {
    setLoading(true);
    await fetch(`${url}/api/v1/journey`)
      .then(toJSON)
      .then((data) => {
        dispatch({
          type: "JOURNEY",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getJourneyDetail = async (id) => {
    setLoading(true);
    await fetch(`${url}/api/v1/journey/${id}`)
      .then(toJSON)
      .then((data) => {
        dispatch({
          type: "JOURNEYDETAIL",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTM3NDA1MzJ9.rV2dlsXGf1xoUzxbMQBAbxbgJW2q1gEu0HfM6lBxgvI";
  const getJourneyUser = async (id) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(`${url}/api/v1/journeyuser/${id}`, config)
      .then(toJSON)
      .then((data) => {
        dispatch({
          type: "JOURNEYUSER",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getJourneyBookmark = async (id) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(`${url}/api/v1/journeybookmark/${id}`, config)
      .then(toJSON)
      .then((data) => {
        dispatch({
          type: "JOURNEYBOOKMARK",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <QueryContext.Provider
      value={{
        loading,
        setLoading,
        state,
        dispatch,
        getJourney,
        getJourneyUser,
        getJourneyDetail,
        getJourneyBookmark,
      }}
      {...props}
    />
  );
}
// --->

export { QueryContext, QueryProvider };
