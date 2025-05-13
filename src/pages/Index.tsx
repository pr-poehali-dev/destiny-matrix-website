
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DateInput from '@/components/DateInput';
import Matrix from '@/components/Matrix';
import Interpretation from '@/components/Interpretation';
import { calculateMatrix } from '@/utils/matrixCalculator';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [matrixValues, setMatrixValues] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (birthdate: string) => {
    setIsLoading(true);
    setShowResults(false);
    
    // Simulate a loading delay for better UX
    setTimeout(() => {
      const calculatedMatrix = calculateMatrix(birthdate);
      setMatrixValues(calculatedMatrix);
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen cosmic-bg ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="absolute right-4 top-0"
            aria-label={isDarkMode ? "Включить светлый режим" : "Включить темный режим"}
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-destiny-purple to-destiny-vividPurple"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Матрица Судьбы
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Узнайте свои скрытые таланты, сильные стороны и жизненное предназначение с помощью древней нумерологии
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">Введите данные</h2>
            <DateInput 
              onCalculate={handleCalculate} 
              isLoading={isLoading} 
            />
          </motion.div>

          <motion.div 
            className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">Ваша матрица</h2>
            <Matrix matrixValues={matrixValues} loading={isLoading} />
          </motion.div>
        </div>

        {showResults && (
          <motion.div
            className="result-appear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Interpretation matrixValues={matrixValues} />
          </motion.div>
        )}

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          <p>
            © 2025 Матрица Судьбы • Все расчеты основаны на нумерологических методиках
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
