import React from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import { LOAD_CATEGORIES } from "../../GraphQL/queries";

class Categories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={LOAD_CATEGORIES}>
        {({ loading, data }) => {
          if (loading) return "loading..";
          return data.categories.map((category) => {
            return (
              <div key={category.name}>
                <h1>{category.name}</h1>
              </div>
            );
          });
        }}
      </Query>
    );
  }
}
export default Categories;
