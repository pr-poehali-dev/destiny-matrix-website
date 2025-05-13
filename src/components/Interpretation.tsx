
import React from 'react';
import { motion } from 'framer-motion';
import { 
  matrixPositions, 
  getPositionInterpretation, 
  calculateFrequencies, 
  interpretFrequencies 
} from '../utils/matrixCalculator';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface InterpretationProps {
  matrixValues: Record<string, number>;
}

const Interpretation: React.FC<InterpretationProps> = ({ matrixValues }) => {
  // Only proceed if we have matrix values
  if (Object.keys(matrixValues).length === 0) {
    return null;
  }

  const frequencies = calculateFrequencies(matrixValues);
  const frequencyInterpretation = interpretFrequencies(frequencies);

  // Get the top 3 important values for the quick summary
  const keyPositions = ['centerNumber', 'firstNumber', 'fourthNumber'];

  return (
    <motion.div 
      className="mt-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Расшифровка вашей матрицы</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Ключевые числа</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {keyPositions.map((position) => {
            const posKey = position as keyof typeof matrixPositions;
            const info = matrixPositions[posKey];
            const value = matrixValues[position];
            
            if (!value) return null;
            
            return (
              <motion.div 
                key={position}
                className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{info.name}</h4>
                  <Badge className="bg-destiny-purple">{value}</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{info.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Энергетический баланс</h3>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md mb-4">
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div 
                key={num}
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
                  ${frequencies[num] > 0 
                    ? 'bg-destiny-purple text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                `}
              >
                {num}
                {frequencies[num] > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {frequencies[num]}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-sm">{frequencyInterpretation.strong}</p>
            <p className="text-sm">{frequencyInterpretation.missing}</p>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <AccordionItem value="detailed">
          <AccordionTrigger className="px-4">
            Подробное описание всех позиций
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <div className="space-y-3">
              {Object.entries(matrixValues).map(([position, value]) => {
                // Only show positions that are in our matrixPositions mapping
                if (matrixPositions[position as keyof typeof matrixPositions]) {
                  return (
                    <div key={position} className="pb-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-destiny-purple">{value}</Badge>
                        <h4 className="font-medium">
                          {matrixPositions[position as keyof typeof matrixPositions]?.name}
                        </h4>
                      </div>
                      <p className="text-sm mt-1">
                        {getPositionInterpretation(position, value)}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default Interpretation;
