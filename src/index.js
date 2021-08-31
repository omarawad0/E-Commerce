import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./GraphQL/client";
import { BrowserRouter } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { LOAD_CATEGORIES } from "./GraphQL/queries";
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Query query={LOAD_CATEGORIES}>
          {({ loading, data, error }) => {
            if (loading) return "loading..";
            if (error) return <h1>Error has been occured</h1>;
            return <App categories={data.categories} />;
          }}
        </Query>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
