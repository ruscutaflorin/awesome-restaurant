"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/app/store/user";
import { getRestaurantCategories } from "@/app/api/restaurants";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// instead of categories i should list the featured items for each category, like top 2 products of every category
const RestaurantFeaturedItems = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await getRestaurantCategories(params.uuid, token);
        setCategories(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    effect();
  }, [params.uuid, token]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="p-4 max-w-full mx-auto mt-3">
      <Carousel>
        {categories?.map((category, index) => (
          <Paper key={index} className="p-4 text-center">
            <Typography variant="h5" component="h2" className="font-bold">
              {category}
            </Typography>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default RestaurantFeaturedItems;
