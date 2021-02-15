import ProductCard from "../components/ProductCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import products from "../products.json";

const useStyles = makeStyles({
  heading: {
    marginLeft: "50px",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        className={classes.heading}
      >
        All Products
      </Typography>

      <Grid container direction="row" justify="center" alignItems="center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
