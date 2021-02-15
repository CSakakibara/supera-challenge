import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  total: {
    width: 30,
    display: "inline-block",
    textAlign: "center",
  },
  text: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: 140,
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "100%",
    },
  },
}));

function CartItem(props) {
  const classes = useStyles();

  const total = props.item.product.price * props.item.total;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={props.item.product.name}
          src={`${process.env.PUBLIC_URL}/assets/${props.item.product.image}`}
        />
      </ListItemAvatar>

      <ListItemText
        primary={props.item.product.name}
        secondary={`R$ ${total.toFixed(2)}`}
        className={classes.text}
      />

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="remove one item"
          onClick={() => props.removeProductFromCart(props.item.product)}
        >
          <RemoveIcon />
        </IconButton>
        <Box className={classes.total} component="span" m={1}>
          {props.item.total}
        </Box>
        <IconButton
          edge="end"
          aria-label="add one item"
          onClick={() => props.addProductToCart(props.item.product)}
        >
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CartItem;
