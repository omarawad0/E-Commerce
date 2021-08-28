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
          {({ loading, data }) => {
            if (loading) return "loading..";
            console.log(data);
            return <App categories={data.categories} />;
          }}
        </Query>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
