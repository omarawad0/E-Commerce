import { gql } from "@apollo/client";

export const LOAD_CATEGORIES = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          amount
          currency
        }
        brand
      }
    }
  }
`;
export const getCurrencies = gql`
  query {
    currencies
  }
`;

export const getCategoriesNames = gql`
  query {
    categories {
      name
    }
  }
`;

export const getProduct = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
`;
