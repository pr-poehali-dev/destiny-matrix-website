import React from "react";
import { motion } from "framer-motion";
import {
  matrixPositions,
  getPositionInterpretation,
  calculateFrequencies,
  interpretFrequencies,
  getSpecialCombinations,
} from "../utils/matrixCalculator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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
  const specialInsights = getSpecialCombinations(matrixValues);

  // Показатели для быстрой интерпретации
  const keyPositions = ["centerNumber", "firstNumber", "fourthNumber"];

  // Оккультные названия для характеристик числа
  const occultNames: Record<string, string> = {
    centerNumber: "Архетип Души",
    firstNumber: "Печать Сущности",
    fourthNumber: "Ключ Сознания",
  };

  return (
    <motion.div
      className="mt-12 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <h2
        className="text-2xl md:text-3xl font-cinzel mb-6 text-center mystical-header"
        data-text="Тайные знаки вашей судьбы"
      >
        Тайные знаки вашей судьбы
      </h2>

      <div className="occult-divider"></div>

      <div className="mb-8">
        <h3 className="text-xl font-cinzel mb-4 text-destiny-purple tracking-wide">
          Ключевые Архетипы Матрицы
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {keyPositions.map((position) => {
            const posKey = position as keyof typeof matrixPositions;
            const info = matrixPositions[posKey];
            const value = matrixValues[position];

            if (!value) return null;

            return (
              <motion.div
                key={position}
                className="interpretation-card p-4 rounded-md"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(138, 75, 175, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-cinzel text-destiny-softPurple">
                    {occultNames[position] || info.name}
                  </h4>
                  <Badge className="bg-destiny-mystic border border-destiny-purple/50">
                    {value}
                  </Badge>
                </div>
                <p className="text-sm text-gray-300">
                  <span className="text-destiny-softPurple font-medium">
                    {info.name}
                  </span>
                  : {info.description}
                </p>
                <div className="mt-2 text-xs text-destiny-softPurple/70">
                  <span className="mr-2">Элемент: {info.element}</span>
                  <span>Планета: {info.planet}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {specialInsights.length > 0 && (
        <motion.div
          className="mb-8 interpretation-card p-5 rounded-md border-l-4 border-destiny-ritual"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-cinzel mb-2 text-destiny-softPurple flex items-center">
            <Icon
              name="Sparkles"
              className="mr-2 h-5 w-5 text-destiny-purple"
            />
            Мистические Откровения
          </h3>
          <div className="space-y-3 text-gray-300">
            {specialInsights.map((insight, index) => (
              <p key={index} className="text-sm italic">
                {insight}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-cinzel mb-4 text-destiny-purple tracking-wide">
          Энергетический Узор Души
        </h3>
        <div className="interpretation-card p-5 rounded-md">
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div
                key={num}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full text-base font-cinzel relative
                  ${
                    frequencies[num] > 0
                      ? "bg-destiny-mystic border border-destiny-purple/50 text-white shadow-[0_0_10px_rgba(138,75,175,0.3)]"
                      : "bg-destiny-shadow/50 border border-destiny-mystic/20 text-gray-500"
                  }
                  transition-all duration-300 hover:scale-110
                `}
              >
                {num}
                {frequencies[num] > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destiny-blood text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-destiny-purple/30">
                    {frequencies[num]}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-4 text-gray-300">
            <p className="text-sm">{frequencyInterpretation.strong}</p>
            <p className="text-sm">{frequencyInterpretation.missing}</p>
            {frequencyInterpretation.karmicPatterns && (
              <p className="text-sm border-t border-destiny-purple/20 pt-4 text-destiny-softPurple/80">
                {frequencyInterpretation.karmicPatterns}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="occult-divider"></div>

      <Accordion
        type="single"
        collapsible
        className="interpretation-card rounded-md"
      >
        <AccordionItem value="detailed" className="border-b-0">
          <AccordionTrigger className="px-4 font-cinzel text-destiny-softPurple">
            <span className="flex items-center">
              <Icon name="Scroll" className="mr-2 h-5 w-5" />
              Мистические значения всех позиций
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2">
            <div className="space-y-5">
              {Object.entries(matrixValues).map(([position, value]) => {
                if (matrixPositions[position as keyof typeof matrixPositions]) {
                  return (
                    <motion.div
                      key={position}
                      className="pb-4 border-b border-destiny-purple/10 last:border-0"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2">
                        <Badge className="bg-destiny-mystic border border-destiny-purple/50">
                          {value}
                        </Badge>
                        <h4 className="font-cinzel text-destiny-softPurple">
                          {
                            matrixPositions[
                              position as keyof typeof matrixPositions
                            ]?.name
                          }
                        </h4>
                      </div>
                      <p className="text-sm mt-2 text-gray-300 leading-relaxed">
                        {getPositionInterpretation(position, value)}
                      </p>
                    </motion.div>
                  );
                }
                return null;
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 text-center">
        <motion.p
          className="text-sm text-destiny-softPurple/50 italic font-cinzel tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          "В числах скрыты великие тайны мироздания"
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Interpretation;
