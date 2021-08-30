import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { getProduct } from "../../GraphQL/queries";
import Button from "../shared/Button/Button";

import styles from "./ProductPage.module.css";
import SwatchAttribute from "../shared/SwatchAttribute/SwatchAttribute";
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
        cartAttributes: [
          {
            attributeId: "",
            attributeType: "",
            items: {},
          },
        ],
      },

      isFormFilled: false,
    };
  }

  handleCartChange = ({
    items,
    attributeId,
    attributeType,
    attributesLength,
  }) => {
    const rest = this.state.productCart.cartAttributes.filter((attribute) => {
      return (
        attribute.attributeId != attributeId && attribute.attributeId != ""
      );
    });

    this.setState(
      {
        productCart: {
          ...this.state.productCart,
          cartAttributes: [...rest, { attributeId, attributeType, items }],
        },
      },
      () => {
        this.setState({
          isFormFilled:
            attributesLength === this.state.productCart.cartAttributes.length,
        });
      }
    );
  };

  handleAddingToCard = ({ name, brand, id, gallery, prices }) => {
    this.setState(
      {
        productCart: {
          ...this.state.productCart,
          name: name,
          brand: brand,
          id: id,
          image: gallery[0],
          prices: prices,
        },
      },
      () => {
        //setGlobalState
        this.props.setGlobalCart(this.state.productCart);
      }
    );
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
        {({ loading, data }) => {
          if (loading) return "loading..";
          const { name, gallery, brand, attributes, description, id, prices } =
            data.product;
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
                        onClick={() =>
                          this.setState({ selectedImagePreview: image })
                        }
                      />
                    );
                  })}
                </div>
                <div className={styles.largeImage}>
                  <img
                    src={
                      this.state.selectedImagePreview === ""
                        ? gallery[0]
                        : this.state.selectedImagePreview
                    }
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
                                        this.handleCartChange({
                                          items: [
                                            { ...item, selected: true },
                                            {
                                              ...(attribute.items[index + 1] ||
                                                attribute.items[index - 1]),
                                              selected: false,
                                            },
                                          ],
                                          attributeId: attribute.id,
                                          attributeType: attribute.type,
                                          attributesLength: attributes.length,
                                        })
                                      }
                                    />
                                    <label
                                      className={styles.item}
                                      htmlFor={`${attribute.id}${item.id}`}
                                    >
                                      {attribute.type === "swatch" ? (
                                        <SwatchAttribute
                                          color={item.value}
                                          size="large"
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
                  {prices
                    .filter((price) => price.currency === currentCurrency)
                    .map((currentPrice) => (
                      <p
                        key={currentPrice.currency}
                        className={styles.priceAmount}
                      >
                        {`${symbolCurrency}${currentPrice.amount}`}
                      </p>
                    ))}
                </div>
                <Button
                  onClick={() => {
                    this.handleAddingToCard({
                      name,
                      brand,
                      id,
                      gallery,
                      prices,
                    });
                  }}
                  isDisabled={!this.state.isFormFilled}
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
