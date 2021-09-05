import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./GraphQL/client";
import { BrowserRouter } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { getCategoriesNames } from "./GraphQL/queries";
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Query query={getCategoriesNames}>
          {({ loading, data, error }) => {
            if (loading) return "loading..";
            if (error) return <h1>Error has been occured</h1>;
            return <App categoriesName={data.categories} />;
          }}
        </Query>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
