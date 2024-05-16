"use client";
import { CategoryDetailed, RestaurantDetailed } from "@/app/types/types";
import React, { useEffect, useState } from "react";
import { getRestaurant } from "@/app/api/restaurants";
import { useParams } from "next/navigation";
import RestaurantHeader from "@/app/ui/restaurant/header";
import RestaurantFeaturedItems from "@/app/ui/restaurant/featured";
import RestaurantSearch from "@/app/ui/restaurant/search";
import RestaurantProducts from "@/app/ui/restaurant/gama";
import { useAuthStore } from "@/app/store/user";
import {
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const RestaurantHomePage = () => {
  const [restaurant, setRestaurant] = useState<RestaurantDetailed | null>(null);
  const [categories, setCategories] = useState<CategoryDetailed[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await getRestaurant(params.uuid, token);
        setRestaurant(response.data);
        setCategories(
          response.data.categories.filter(
            (category: CategoryDetailed) =>
              category.products && category.products.length > 0
          )
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    effect();
  }, [params.uuid, token]);

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleToggleCategories}
        endIcon={showCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        className="mt-4"
      >
        {showCategories ? "Hide Categories" : "Show Categories"}
      </Button>
      {showCategories && (
        <Grid container spacing={2} className="mt-4">
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper className="p-4 text-center">
                <Typography variant="h6">{category.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <p className="flex items-center justify-center mt-20">Featured Items</p>
      <RestaurantFeaturedItems />
      {restaurant && <RestaurantProducts categories={categories} />}
    </div>
  );
};

export default RestaurantHomePage;
