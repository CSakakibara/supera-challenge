import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import products from "../products.json";

const useStyles = makeStyles({
  heading: {
    marginLeft: "50px",
  },
  filter: {
    marginLeft: "50px",
  },
  formControl: {
    minWidth: 120,
  },
});

function Home() {
  const classes = useStyles();

  const [filteredProducts, setFilterdProducts] = useState(products);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      const newFilteredProducts = [...filteredProducts];
      newFilteredProducts.sort((a, b) =>
        a[filter] === b[filter] ? 0 : a[filter] < b[filter] ? -1 : 1
      );
      setFilterdProducts(newFilteredProducts);
    }
  }, [setFilterdProducts, filter]);

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

      <Box className={classes.filter}>
        <FormControl className={classes.formControl}>
          <InputLabel id="filter">Order By</InputLabel>
          <Select
            labelId="filter"
            id="select"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="score">Score</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container direction="row" justify="center" alignItems="center">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
