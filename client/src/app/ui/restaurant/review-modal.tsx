import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
  review: {
    restaurantId: number;
    productId: number;
    rating: number;
    userId: number;
    reviewText: string;
    sentiment: string;
  } | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  handleClose,
  review,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!review) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isSmallScreen ? "90%" : 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Review
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {review.reviewText}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Sentiment: {review.sentiment}
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
