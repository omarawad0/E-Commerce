import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { getCategoriesNames } from "../../../GraphQL/queries";

class CategoriesNames extends Component {
  render() {
    return (
      <>
        <Query query={getCategoriesNames}>
          {({ loading, data }) => {
            if (loading) return "...loading";
            return data.categories.map((category) => {
              return this.props.children(category.name);
            });
          }}
        </Query>
      </>
    );
  }
}

export default CategoriesNames;
