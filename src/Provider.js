import React, { useReducer, createContext, useState } from "react";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [values, setValues] = useState({});

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const values = {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        address: localStorage.getItem("address"),
        profile: localStorage.getItem("profile"),
        role: localStorage.getItem("role"),
      };
      setValues(values);
    } else {
      console.log("on server side");
    }
  }, []);

  function login(data) {
    localStorage.setItem("id", data.id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email);
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("address", data.address);
    localStorage.setItem("profile", data.profile);
    localStorage.setItem("role", data.role);
    dispatch({
      type: "LOGIN",
      payload: data,
    });
  }

  function logout() {
    localStorage.clear();
    dispatch({ type: "LOGOUT", payload: initialState });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user === null ? values : state.user,
        dispatch,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
