import React, { useState, useEffect } from "react";
import { motion, Anim, AnimatePresence } from "framer-motion";
import DateInput from "@/components/DateInput";
import Matrix from "@/components/Matrix";
import Interpretation from "@/components/Interpretation";
import { calculateMatrix } from "@/utils/matrixCalculator";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [matrixValues, setMatrixValues] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Установлен темный режим по умолчанию
  const [showResults, setShowResults] = useState(false);
  const [occultQuote, setOccultQuote] = useState("");

  const occultQuotes = [
    "То, что вверху, подобно тому, что внизу, и то, что внизу, подобно тому, что вверху.",
    "Числа — суть ключи к пониманию устройства мира и души человека.",
    "В центре круга находится всё, и в то же время — ничто.",
    "Ищущий истину обретёт её в символах и тайных знаках.",
    "Познай себя, и ты познаешь Вселенную и Богов.",
    "Мир — это книга, и те, кто не путешествует, читают лишь одну её страницу.",
    "Как наверху, так и внизу. Как внутри, так и снаружи.",
    "То, что не убивает тебя, заключает с тобой контракт на перерождение.",
    "Чтобы построить свет, нужно пройти через тьму.",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * occultQuotes.length);
    setOccultQuote(occultQuotes[randomIndex]);
    document.documentElement.classList.add("dark");
  }, []);

  const handleCalculate = (birthdate: string) => {
    setIsLoading(true);
    setShowResults(false);

    // Добавляем таинственную задержку для эффекта
    setTimeout(() => {
      const calculatedMatrix = calculateMatrix(birthdate);
      setMatrixValues(calculatedMatrix);
      setIsLoading(false);

      // Выбираем новую случайную цитату при каждом расчете
      const randomIndex = Math.floor(Math.random() * occultQuotes.length);
      setOccultQuote(occultQuotes[randomIndex]);

      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }, 2000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen cosmic-bg ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto px-4 py-8 relative">
        <header className="text-center mb-12 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="absolute right-4 top-0 text-destiny-softPurple hover:text-destiny-purple hover:bg-destiny-shadow/30"
            aria-label={
              isDarkMode ? "Включить светлый режим" : "Включить темный режим"
            }
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-destiny-purple to-destiny-vividPurple font-cinzel tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Матрица Судьбы
          </motion.h1>

          <motion.div
            className="flex justify-center items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="h-px w-16 bg-destiny-purple/30"></div>
            <Icon
              name="Star"
              className="mx-3 h-5 w-5 text-destiny-purple animate-pulse"
            />
            <div className="h-px w-16 bg-destiny-purple/30"></div>
          </motion.div>

          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto font-cinzel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Откройте тайны своей души и предназначения через древнюю
            нумерологическую систему
          </motion.p>

          <motion.p
            className="text-sm text-destiny-softPurple/60 mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            «{occultQuote}»
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="p-6 interpretation-card rounded-md relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="ritual-circle"></div>
            <h2 className="text-2xl font-cinzel mb-4 text-center text-destiny-softPurple">
              Введите данные для расчета
            </h2>
            <DateInput onCalculate={handleCalculate} isLoading={isLoading} />
          </motion.div>

          <motion.div
            className="p-6 interpretation-card rounded-md relative flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h2 className="text-2xl font-cinzel mb-4 text-center text-destiny-softPurple">
              Ваша матрица судьбы
            </h2>
            <Matrix matrixValues={matrixValues} loading={isLoading} />
          </motion.div>
        </div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <Interpretation matrixValues={matrixValues} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-16 text-center text-sm text-gray-400 py-4 relative z-10">
          <p className="font-cinzel tracking-wide">
            © 2025 Матрица Судьбы •{" "}
            <span className="text-destiny-softPurple/50">
              Все тайны вселенной скрыты в числах
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
