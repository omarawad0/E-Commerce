
### `yarn start` to start the react client

## clone this [endpoint](https://github.com/omarawad0/Graphql-endpoint) and yarn start the GraphQL endpoint

## the design implemented: [Figma](https://www.figma.com/file/MSyCAqVy1UgNap0pvqH6H3/Junior-Frontend-Test-Designs)
## Live 
## [Website](https://e-commerce-graphy.netlify.app/)
## Demo
- ![e-commerce](https://user-images.githubusercontent.com/57134858/136223231-f05fe6ca-1033-4029-815c-b1a32bb592ef.gif)

## -In this project i used only React class components and old version of Apollo and Graphql to be able to work with legacy code


## Functionality

- PLP - product listing page, a.k.a. category page
- PDP - product description page, a.k.a. product page
- Cart page + Cart overlay (minicart)

## Details

- Ability to add/remove products and change their amounts in cart - on the cart page itself, PLP and PDP should be provided.
- For products that have various options (attributes) - the options should be selected.
- The selected options of added to cart products should be visible in cart overlay and in cart page.
- If an attribute is a swatch attribute (type = swatch), a representation of the value should be rendered on PDP and PLP, rather than text description (e.g. the color itself, not "Blue" or "0000FF")
- Filtering products by category name for all of the categories from BE
- The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text
- Ability to change the currency of the store to one of the available currencies
