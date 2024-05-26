import React, { useState } from "react";
import {
  Button,
  ClickAwayListener,
  IconButton,
  Paper,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface FloatingCartButtonProps {
  cartItems: any[];
  updateCart: (product: any, action: string) => void;
  onFinishPayment: () => void;
  totalAmount: number;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  cartItems,
  updateCart,
  onFinishPayment,
  totalAmount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <IconButton
            onClick={handleToggle}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-125"
            size="large"
          >
            <Badge
              badgeContent={cartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              )}
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {isOpen && (
            <Paper
              className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: "400px", overflowY: "auto", width: "300px" }}
            >
              <div className="p-4">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-3 last:mb-0"
                      >
                        <div className="text-left">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-600">${item.price}</p>
                        </div>
                        <div className="flex items-center">
                          <IconButton
                            size="small"
                            onClick={() => updateCart(item, "decrease")}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                          <p className="font-semibold mx-2">
                            Qty: {item.quantity}
                          </p>
                          <IconButton
                            size="small"
                            onClick={() => updateCart(item, "increase")}
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-semibold">Total:</p>
                      <p className="font-semibold">${totalAmount.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      className="w-full mt-4"
                      onClick={onFinishPayment}
                    >
                      Finish Payment
                    </Button>
                  </>
                ) : (
                  <p className="text-center text-gray-800">Cart is empty</p>
                )}
              </div>
            </Paper>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default FloatingCartButton;
