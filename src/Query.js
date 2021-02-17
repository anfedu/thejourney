import React, { useReducer, createContext, useState } from "react";

// const url = "https://anfdewetourapi.herokuapp.com"

const QueryContext = createContext({
  user: null,
  getCountry: () => {},
  getTransaction: () => {},
});

// <--- get meta data
function queryReducer(state, action) {
  switch (action.type) {
    case "COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "TRIPS":
      return {
        ...state,
        trips: action.payload,
      };
    case "TRIP":
      return {
        ...state,
        trip: action.payload,
      };
    case "TRANSACTION":
      return {
        ...state,
        transaction: action.payload,
      };
    case "TRANSACTIONUSER":
      return {
        ...state,
        transactionUser: action.payload,
      };
    default:
      return state;
  }
}
function QueryProvider(props) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(queryReducer, {
    country: [],
    trips: [],
    trip: {},
    transaction: [],
    transactionUser: [],
  });

  const toJSON = (_) => _.json();

  const getCountry = async () => {
    setLoading(true);
    await fetch(`${process.env.server}/api/v1/country`)
      .then(toJSON)
      .then((data) => {
        dispatch({
          tyle: "COUNTRY",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getTrips = async () => {
    setLoading(true);
    await fetch(`${process.env.server}/api/v1/trip`)
      .then(toJSON)
      .then((data) => {
        if (data !== undefined) {
          dispatch({
            type: "TRIPS",
            payload: data.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getTrip = async (id) => {
    setLoading(true);
    await fetch(`https://anfdewetourapi.herokuapp.com/api/v1/trip/${id}`)
      .then(toJSON)
      .then((data) => {
        dispatch({
          type: "TRIP",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getTransaction = async () => {
    setLoading(true);
    await fetch(`${process.env.server}/api/v1/transaction`)
      .then(toJSON)
      .then((data) => {
        dispatch({
          type: "TRANSACTION",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getTransactionUser = async (id) => {
    setLoading(true);
    await fetch(`${process.env.server}/api/v1/transactionuser/${id}`)
      .then(toJSON)
      .then((data) => {
        dispatch({
          type: "TRANSACTIONUSER",
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
        getCountry,
        getTrips,
        getTrip,
        getTransaction,
        getTransactionUser,
      }}
      {...props}
    />
  );
}
// --->

export { QueryContext, QueryProvider };
