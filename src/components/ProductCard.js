import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

import { CartContext } from "../context/CartContext";

const useStyles = makeStyles({
  card: {
    margin: "20px",
    width: 250,
    height: 400,
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 180,
    width: 180,
    margin: "0 auto",
  },
  content: {
    marginTop: "auto",
  },
  score: {
    display: "flex",
    alignItems: "flex-end",
    width: 50,
    justifyContent: "space-between",
  },
  actions: {
    margin: "auto auto 20px",
  },
});

function ProductCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(CartContext);

  function addToCart() {
    const cart = context.cart;

    const product = props.product;

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
    history.push("/checkout");
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/assets/${props.product.image}`}
        title={props.product.name}
      />

      <CardContent className={classes.content}>
        <Typography gutterBottom variant="subtitle1" component="h2">
          {props.product.name}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="h3">
          R$ {props.product.price}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="h3"
          className={classes.score}
        >
          <StarIcon /> {props.product.score}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={addToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
