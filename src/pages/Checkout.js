import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { CartContext } from "../context/CartContext";

import CartItem from "../components/CartItem";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  heading: {
    marginLeft: 20,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 20px",
  },
  button: {
    height: 40,
    marginTop: 10,
  },
}));

function Checkout(props) {
  const classes = useStyles();

  const context = useContext(CartContext);

  function addProductToCart(product) {
    const cart = [...context.cart];

    const productInCart = cart.find((p) => p.product.id === product.id);
    const index = cart.indexOf(productInCart);
    if (index === -1) {
      const newItem = { product, total: 1 };
      cart.push(newItem);
    } else {
      cart[index].total++;
    }

    context.setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function removeProductFromCart(product) {
    const cart = [...context.cart];

    const productInCart = cart.find((item) => item.product.id === product.id);

    if (!productInCart) return;

    const index = cart.indexOf(productInCart);

    if (productInCart.total === 1) {
      cart.splice(index, 1);
    } else {
      cart[index].total--;
    }

    context.setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function clearCart() {
    context.setCart([]);
    localStorage.setItem("cart", "");
  }

  let subtotal = 0;
  let shipping = 0;
  for (let item of context?.cart) {
    subtotal += item.product.price * item.total;
    shipping += item.total * 10;
  }

  if (subtotal >= 250) {
    shipping = 0;
  }

  return (
    <Container maxWidth="md">
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        className={classes.heading}
      >
        Checkout
      </Typography>

      <List className={classes.root}>
        {context.cart?.map((item) => (
          <div key={item.product.id}>
            <CartItem
              item={item}
              removeProductFromCart={removeProductFromCart}
              addProductToCart={addProductToCart}
            />
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>

      <Box className={classes.actions}>
        <Box>
          <Typography variant="subtitle2" component="p">
            Subtotal: R$ {subtotal.toFixed(2)}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Shipping: R$ {shipping.toFixed(2)}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Total: R$ {(subtotal + shipping).toFixed(2)}
          </Typography>
        </Box>

        <Button
          variant="contained"
          className={classes.button}
          onClick={clearCart}
          disabled={!context?.cart.length}
        >
          Clear Cart
        </Button>
      </Box>
    </Container>
  );
}

export default Checkout;
