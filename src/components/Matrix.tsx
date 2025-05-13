import React from "react";
import { motion } from "framer-motion";
import { matrixPositions } from "../utils/matrixCalculator";

// Define types for our props
interface MatrixProps {
  matrixValues: Record<string, number>;
  loading: boolean;
}

const Matrix: React.FC<MatrixProps> = ({ matrixValues, loading }) => {
  // Create a 3x3 grid for the matrix
  const gridPositions = [
    ["firstNumber", "secondNumber", "thirdNumber"],
    ["firstRowSum", "centerNumber", "secondRowSum"],
    ["fourthNumber", "thirdRowSum", "fourthRowSum"],
  ];

  // Helper to check if a value exists in the matrix
  const hasValue = (key: string): boolean => {
    return typeof matrixValues[key] === "number";
  };

  // Символы для каждой ячейки матрицы
  const cellSymbols: Record<string, string> = {
    firstNumber: "☉", // Sun
    secondNumber: "☽", // Moon
    thirdNumber: "☿", // Mercury
    firstRowSum: "♃", // Jupiter
    centerNumber: "★", // Star (Center)
    secondRowSum: "♀", // Venus
    fourthNumber: "♄", // Saturn
    thirdRowSum: "♂", // Mars
    fourthRowSum: "♆", // Neptune
  };

  return (
    <div className="mx-auto max-w-md p-4 relative">
      <div className="matrix-grid">
        {gridPositions.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => {
              const position = cell as keyof typeof matrixPositions;
              const positionInfo = matrixPositions[position];
              const value = matrixValues[cell];
              const symbol = cellSymbols[cell];

              return (
                <motion.div
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={`matrix-cell ${hasValue(cell) ? "active" : ""}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: loading ? 0.5 : 1,
                    scale: hasValue(cell) ? 1 : 0.9,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * (rowIndex * 3 + cellIndex),
                  }}
                  whileHover={{ scale: hasValue(cell) ? 1.05 : 0.9 }}
                >
                  {hasValue(cell) ? (
                    <>
                      <span className="absolute top-1 left-1 text-xs opacity-60">
                        {symbol}
                      </span>
                      <span className="matrix-value">{value}</span>
                      <span className="matrix-energy text-xs">
                        {positionInfo?.name || "Неизвестно"}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-600 opacity-30">⋯</span>
                  )}
                </motion.div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <motion.div
        className="mt-4 text-center text-sm text-destiny-softPurple/60 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: Object.keys(matrixValues).length > 0 ? 1 : 0 }}
        transition={{ delay: 0.8 }}
      >
        Матрица раскрывает потоки энергий, проходящие через ваше астральное тело
      </motion.div>
    </div>
  );
};

export default Matrix;
