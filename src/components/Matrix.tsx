
import React from 'react';
import { motion } from 'framer-motion';
import { matrixPositions } from '../utils/matrixCalculator';

// Define types for our props
interface MatrixProps {
  matrixValues: Record<string, number>;
  loading: boolean;
}

const Matrix: React.FC<MatrixProps> = ({ matrixValues, loading }) => {
  // Create a 3x3 grid for the matrix
  const gridPositions = [
    ['firstNumber', 'secondNumber', 'thirdNumber'],
    ['firstRowSum', 'centerNumber', 'secondRowSum'],
    ['fourthNumber', 'thirdRowSum', 'fourthRowSum']
  ];

  // Helper to check if a value exists in the matrix
  const hasValue = (key: string): boolean => {
    return typeof matrixValues[key] === 'number';
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="matrix-grid">
        {gridPositions.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => {
              const position = cell as keyof typeof matrixPositions;
              const positionInfo = matrixPositions[position];
              const value = matrixValues[cell];

              return (
                <motion.div
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={`matrix-cell ${hasValue(cell) ? 'active' : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: loading ? 0.5 : 1, 
                    scale: hasValue(cell) ? 1 : 0.9
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.1 * (rowIndex * 3 + cellIndex) 
                  }}
                  whileHover={{ scale: hasValue(cell) ? 1.05 : 0.9 }}
                >
                  {hasValue(cell) ? (
                    <>
                      <span className="matrix-value">{value}</span>
                      <span className="matrix-energy text-xs">
                        {positionInfo?.name || 'Неизвестно'}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </motion.div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Matrix;
