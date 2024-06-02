import React, { useState } from "react";
import { Button, ClickAwayListener, IconButton, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface FloatingCategoryButtonProps {
  categories: { name: string }[];
  scrollToCategory: (categoryName: string) => void;
}

const FloatingCategoryButton: React.FC<FloatingCategoryButtonProps> = ({
  categories,
  scrollToCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (categoryName: string) => {
    scrollToCategory(categoryName);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          <IconButton
            onClick={handleToggle}
            style={{ backgroundColor: "rgb(249 115 22)", color: "white" }}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-125"
            size="large"
          >
            <MenuIcon />
          </IconButton>
          {isOpen && (
            <Paper className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  onClick={() => handleClick(category.name)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100"
                >
                  {category.name}
                </Button>
              ))}
            </Paper>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default FloatingCategoryButton;
