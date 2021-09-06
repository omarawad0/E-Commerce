import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { getProduct } from "../../GraphQL/queries";
import Button from "../shared/Button/Button";
import classnames from "classnames";
import styles from "./ProductPage.module.css";
import Circle from "../shared/Circle/Circle";
import { getPriceWithCurrentCurrency } from "../shared/utils/getPriceWithCurrentCurrency";

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImagePreview: "",
      productCart: {
        name: "",
        brand: "",
        id: "",
        image: "",
        prices: [],
        quantity: 1,
        attributes: [],
      },
    };
  }

  handleAttributesItems = ({
    selectedItem,
    attributeId,
    attributeType,
    attributeName,
  }) => {
    const rest = this.state.productCart.attributes.filter((attribute) => {
      return (
        attribute.attributeId !== attributeId && attribute.attributeId !== ""
      );
    });

    this.setState({
      productCart: {
        ...this.state.productCart,
        attributes: [
          ...rest,
          { attributeId, attributeType, attributeName, selectedItem },
        ],
      },
    });
  };

  handleAddingToCard = ({
    name,
    brand,
    gallery,
    prices,
    attributes,
    inStock,
  }) => {
    //validations

    //make each product id unique and personalized by using attributes preferences
    const securedProductId = [...this.state.productCart.attributes]
      .sort((a, b) =>
        a.attributeId > b.attributeId
          ? 1
          : b.attributeId > a.attributeId
          ? -1
          : 0
      )
      .reduce(
        (acc, curr) => acc + curr.selectedItem.id,
        `${this.props.match.params.productId}-`
      );
    //check if the product is not already in the cart
    const ProductIsAlreadyInCart = this.props.globalCart.find((product) => {
      return product.id === securedProductId;
    });

    //check if user selected the attributes
    if (
      attributes.length !== this.state.productCart.attributes.length &&
      attributes.length > 0
    ) {
      alert("Please Select The Preferred item Attributes For Your Product");
    } else if (ProductIsAlreadyInCart !== undefined) {
      alert("This Product Is Already In The Cart");
    } else if (!inStock) {
      alert("Unfortunately, This Product Is NOT in Stock");
    } else {
      this.setState(
        {
          productCart: {
            ...this.state.productCart,
            name: name,
            brand: brand,
            image: gallery[0],
            prices: prices,
            id: securedProductId,
          },
        },
        () => {
          this.props.setToGlobalCart(this.state.productCart);
        }
      );
    }
  };

  render() {
    const {
      currency: { currentCurrency, symbolCurrency },
      match: {
        params: { productId },
      },
    } = this.props;
    return (
      <Query query={getProduct} variables={{ id: productId }}>
        {({ loading, data, error }) => {
          if (loading) return "loading..";
          if (error || !data.product) return <h1>Product does not exist!</h1>;
          const {
            name,
            gallery,
            brand,
            attributes,
            description,
            prices,
            inStock,
          } = data.product;
          return (
            <div className={styles.pageContainer}>
              <div className={styles.galleryContainer}>
                <div className={styles.previewImages}>
                  {gallery.map((image) => {
                    return (
                      <img
                        src={image}
                        key={image}
                        className={styles.smallImage}
                        alt=""
                        onClick={() =>
                          this.setState({ selectedImagePreview: image })
                        }
                      />
                    );
                  })}
                </div>
                <div className={styles.largeImage}>
                  {!inStock && (
                    <div className={styles.notInStock}>
                      <span>OUT OF STOCK</span>
                    </div>
                  )}
                  <img
                    src={
                      this.state.selectedImagePreview === ""
                        ? gallery[0]
                        : this.state.selectedImagePreview
                    }
                    className={classnames({
                      [styles.notInStockBox]: !inStock,
                    })}
                    alt={name}
                  />
                </div>
              </div>
              <div className={styles.productInfo}>
                <h1>{brand}</h1>
                <h2>{name}</h2>
                {attributes[0]
                  ? attributes.map((attribute) => {
                      return (
                        <form
                          id={attribute.id}
                          key={attribute.id}
                          className={styles.attributesContainer}
                        >
                          <div className={styles.attribute}>
                            <p>{`${attribute.name}:`}</p>
                            <div className={styles.itemsContainer}>
                              {attribute.items.map((item, index) => {
                                return (
                                  <div key={item.id}>
                                    <input
                                      type="radio"
                                      name={attribute.id}
                                      id={`${attribute.id}${item.id}`}
                                      value={item.value}
                                      onChange={() =>
                                        this.handleAttributesItems({
                                          selectedItem: item,
                                          attributeId: attribute.id,
                                          attributeType: attribute.type,
                                          attributeName: attribute.name,
                                        })
                                      }
                                    />
                                    <label
                                      className={styles.item}
                                      htmlFor={`${attribute.id}${item.id}`}
                                    >
                                      {attribute.type === "swatch" ? (
                                        <Circle
                                          color={item.value}
                                          size="medium"
                                        />
                                      ) : (
                                        <Button
                                          buttonType="button"
                                          variant="primary"
                                          isIcon={false}
                                          size="medium"
                                          id={`${attribute.id}${item.id}`}
                                          stylesProps={{
                                            pointerEvents: "none",
                                          }}
                                        >
                                          {item.value}
                                        </Button>
                                      )}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </form>
                      );
                    })
                  : null}
                <div className={styles.price}>
                  <p className={styles.priceHeader}>PRICES:</p>

                  <p className={styles.priceAmount}>
                    {`${symbolCurrency}${getPriceWithCurrentCurrency(
                      prices,
                      currentCurrency
                    )}`}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    this.handleAddingToCard({
                      name,
                      brand,
                      gallery,
                      prices,
                      attributes,
                      inStock,
                    });
                  }}
                  buttonType="submit"
                  variant="secondary"
                  isIcon={false}
                  size="fullWidth"
                >
                  ADD TO CART
                </Button>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductPage;
