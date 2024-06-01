"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Button, Paper } from "@mui/material";

const FailedPage: React.FC = () => {
  const { push } = useRouter();
  const restaurantUUID = useParams().uuid;
  const handleRetry = () => {
    push(`/restaurants/${restaurantUUID}/home`);
  };

  const handleContactSupport = () => {
    alert("Please contact support at support@example.com");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="error">
          Payment Failed
        </Typography>
        <Typography variant="h6" gutterBottom>
          Unfortunately, your payment could not be processed. Please try again
          or contact our support team for assistance.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRetry}
            sx={{ mr: 2 }}
          >
            Retry
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleContactSupport}
          >
            Contact Support
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FailedPage;
