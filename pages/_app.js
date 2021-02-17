import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { AuthProvider } from "../src/Provider";
import { QueryProvider } from "../src/Query";
// import "../src/onHoverStyle.css";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>The Journey</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="logo.svg" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <QueryProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
