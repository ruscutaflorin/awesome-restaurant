"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Rating,
  Paper,
} from "@mui/material";

interface Product {
  id: number;
  name: string;
}

interface Review {
  restaurantId: number;
  userId: number;
  productId: number;
  rating: number;
  reviewText: string;
}

const SuccessPage: React.FC = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const fetchSessionData = async () => {
      if (session_id) {
        try {
          const response = await axios.get(
            `/api/checkout-session/${session_id}?session_id=${session_id}`
          );
          const { metadata } = response.data;
          setCartItems(JSON.parse(metadata.cartItems));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching session data:", error);
          setLoading(false);
        }
      }
    };

    fetchSessionData();
  }, [session_id]);

  const handleInputChange = (index: number, field: string, value: any) => {
    const newReviews = [...reviews];
    newReviews[index] = { ...newReviews[index], [field]: value };
    setReviews(newReviews);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await Promise.all(
        reviews.map((review) => axios.post("/api/reviews", review))
      );
      alert("Reviews submitted successfully!");
      push("/restaurants"); // Redirect to home or another page
    } catch (error) {
      console.error("Error submitting reviews:", error);
      alert("Failed to submit reviews.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Success!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please leave your reviews for the products you ordered:
      </Typography>
      <Grid container spacing={2}>
        {cartItems.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Rating
                value={reviews[index]?.rating || 0}
                onChange={(event, newValue) =>
                  handleInputChange(index, "rating", newValue)
                }
              />
              <TextField
                label="Review"
                multiline
                rows={4}
                value={reviews[index]?.reviewText || ""}
                onChange={(event) =>
                  handleInputChange(index, "reviewText", event.target.value)
                }
                fullWidth
                margin="normal"
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          Submit Reviews
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
