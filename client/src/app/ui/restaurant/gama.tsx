import { CategoryDetailed } from "@/app/types/types";
import React from "react";
import { Paper, Typography, Grid } from "@mui/material";

type Props = {
  categories: CategoryDetailed[];
};

const RestaurantProducts: React.FC<Props> = ({ categories }) => {
  return (
    <div className="p-4">
      {categories.map((category) => (
        <Paper key={category.id} className="p-4 mb-4">
          <Typography variant="h6" component="h2" className="font-bold">
            {category.name}
          </Typography>
          <Grid container spacing={2} className="mt-2">
            {category.products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Paper className="p-4">
                  <Typography variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="mt-2">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" className="mt-2">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" className="mt-2">
                    Base Price: ${product.basePrice}
                  </Typography>
                  <Typography variant="body2" className="mt-2">
                    Ingredients: {product.ingredients.join(", ")}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default RestaurantProducts;
