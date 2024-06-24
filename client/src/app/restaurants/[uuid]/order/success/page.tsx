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
import { addProductReview } from "@/app/api/restaurants";
import {
  ComprehendClient,
  DetectSentimentCommand,
  LanguageCode,
} from "@aws-sdk/client-comprehend";

const comprehendClient = new ComprehendClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: "AKIA5FTZDLTAHUTADXFZ",
    secretAccessKey: "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",
  },
});

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
import Stripe from "stripe";
const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [averageSentiment, setAverageSentiment] = useState<number | null>(null);

  const stripe = new Stripe(
    "sk_test_51PL76tBRrCx0c7zJCWUIxj2IKydSGWAV9fLqThxqYwwHLXSQap8ylPVfPbt71LUd6jcy4nilHupAgx0H39Yt99Rm00y4pi7NCr",
    {
      apiVersion: "2024-04-10",
    }
  );

  useEffect(() => {
    const fetchSessionData = async () => {
      if (session_id) {
        try {
          const response = await axios.get(
            `/api/checkout-session/${session_id}`
          );
          console.log(response.data.id);
          const lineItems = await stripe.checkout.sessions.listLineItems(
            `${response.data.id}`
          );
          console.log("these are line items", lineItems);
          const { metadata } = response.data;
          console.log("metadata", metadata);
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

  const sentimentMapping = {
    POSITIVE: 5,
    NEGATIVE: 1,
    MIXED: 4,
    NEUTRAL: 2,
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const analyzedReviews = await Promise.all(
        reviews.map(async (review) => {
          const input = {
            Text: `${review.reviewText || ""}`,
            LanguageCode: LanguageCode.EN || "zh-TW",
          };
          const command = new DetectSentimentCommand(input);
          const sentimentResponse = await comprehendClient.send(command);
          const sentiment =
            sentimentResponse.Sentiment as keyof typeof sentimentMapping;
          const rating = sentimentMapping[sentiment];
          // Sentiment: "POSITIVE" || "NEGATIVE" || "NEUTRAL" || "MIXED",
          return {
            ...review,
            rating: rating,
          };
        })
      );

      const totalSentiment = analyzedReviews.reduce(
        (sum, review) => sum + review.rating,
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

      setReviews(analyzedReviews);
      setSubmitting(false);
      setSubmissionComplete(true);
    } catch (error) {
      console.error("Error submitting reviews:", error);
      alert("Failed to submit reviews.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Order Success!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please leave your reviews for the products you ordered:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {cartItems.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 3,
                minHeight: "200px",
              }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Rating
                value={reviews[index]?.rating || 0}
                readOnly={!submissionComplete}
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
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={handleSubmit}
          disabled={submitting || submissionComplete}
        >
          {submitting ? (
            <CircularProgress style={{ color: "white" }} />
          ) : (
            <>Submit Reviews</>
          )}
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
