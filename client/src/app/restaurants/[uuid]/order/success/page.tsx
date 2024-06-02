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
import {
  addProductReview,
  fetchSentimentAnalysis,
} from "@/app/api/restaurants";
import { useAuthStore } from "@/app/store/user";

interface Product {
  id: number;
  name: string;
  restaurantId: number;
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
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [averageSentiment, setAverageSentiment] = useState<number | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (session_id) {
        try {
          const response = await axios.get(
            `/api/checkout-session/${session_id}`
          );

          const { metadata } = response.data;
          const { cartItems, restaurantID } = metadata;
          const restaurantId = parseInt(restaurantID);
          const items = JSON.parse(cartItems);

          setCartItems(items);
          const initialReviews = items.map((item: Product) => ({
            restaurantId: restaurantId,
            userId: 4,
            productId: item.id,
            rating: 0,
            reviewText: "",
          }));

          setReviews(initialReviews);
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
      const analyzedReviews = await Promise.all(
        reviews.map(async (review) => {
          const sentimentResponse = await fetchSentimentAnalysis(
            review.reviewText
          );
          return {
            ...review,
            userId: parseInt(sentimentResponse.data.sentiment),
          };
        })
      );

      const totalSentiment = analyzedReviews.reduce(
        (sum, review) => sum + review.userId,
        0
      );
      const avgSentiment = totalSentiment / analyzedReviews.length;
      setAverageSentiment(avgSentiment);

      await Promise.all(
        analyzedReviews.map((review) =>
          addProductReview(
            review.restaurantId,
            review.productId,
            review.userId,
            review.rating,
            review.reviewText
          )
        )
      );

      setSubmitting(false);
      setSubmissionComplete(true);
    } catch (error) {
      console.error("Error submitting reviews:", error);
      alert("Failed to submit reviews.");
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
          disabled={submitting || submissionComplete}
        >
          Submit Reviews
        </Button>
      </Box>
      {averageSentiment !== null && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          {averageSentiment < 3 ? (
            <Typography variant="h6" color="error">
              We are sorry for your bad experience. We will strive to improve.
            </Typography>
          ) : averageSentiment === 3 ? (
            <Typography variant="h6" color="warning">
              Thank you for your feedback. We will strive to improve.
            </Typography>
          ) : (
            <Typography variant="h6" color="primary">
              Thank you for your positive feedback!
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SuccessPage;
