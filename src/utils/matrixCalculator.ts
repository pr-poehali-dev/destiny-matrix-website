
/**
 * Utility functions for calculating destiny matrix values
 */

// Sum all digits in a number until we get a single digit (1-9)
export const reduceToSingleDigit = (num: number): number => {
  // If number is already 1-9, return it
  if (num <= 9) return num;
  
  // Sum all digits
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  
  // Recursively reduce until we have a single digit
  return reduceToSingleDigit(sum);
};

// Extract day, month, year from date string and compute important values
export const calculateMatrix = (birthdate: string): Record<string, number> => {
  // Parse the date
  const date = new Date(birthdate);
  
  // Get day, month, year
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const year = date.getFullYear();
  
  // Calculate first number: reduced birth day
  const firstNumber = reduceToSingleDigit(day);
  
  // Calculate second number: reduced birth month
  const secondNumber = reduceToSingleDigit(month);
  
  // Calculate third number: reduced birth year
  const thirdNumber = reduceToSingleDigit(year);
  
  // Calculate fourth number: sum of the first three numbers
  const fourthNumber = reduceToSingleDigit(firstNumber + secondNumber + thirdNumber);
  
  // First row sums
  const firstRowSum = reduceToSingleDigit(firstNumber + secondNumber);
  const secondRowSum = reduceToSingleDigit(secondNumber + thirdNumber);
  const thirdRowSum = reduceToSingleDigit(firstNumber + fourthNumber);
  const fourthRowSum = reduceToSingleDigit(fourthNumber + thirdNumber);
  
  // Diagonals
  const firstDiagonal = reduceToSingleDigit(firstNumber + thirdNumber);
  const secondDiagonal = reduceToSingleDigit(secondNumber + fourthNumber);
  
  // Center
  const centerNumber = reduceToSingleDigit(firstRowSum + secondRowSum);
  
  return {
    firstNumber,
    secondNumber,
    thirdNumber,
    fourthNumber,
    firstRowSum,
    secondRowSum,
    thirdRowSum, 
    fourthRowSum,
    firstDiagonal,
    secondDiagonal,
    centerNumber
  };
};

// Map positions in the matrix to meaningful labels
export const matrixPositions = {
  firstNumber: {
    position: "1,1",
    name: "Характер",
    description: "Базовые черты вашей личности"
  },
  secondNumber: {
    position: "1,2",
    name: "Энергия",
    description: "Ваш энергетический потенциал"
  },
  thirdNumber: {
    position: "1,3",
    name: "Интерес",
    description: "Что вас интересует в жизни"
  },
  firstRowSum: {
    position: "2,1",
    name: "Здоровье",
    description: "Ваш потенциал здоровья"
  },
  centerNumber: {
    position: "2,2",
    name: "Центр",
    description: "Ваша жизненная цель"
  },
  secondRowSum: {
    position: "2,3",
    name: "Удача",
    description: "Ваш потенциал удачи"
  },
  fourthNumber: {
    position: "3,1",
    name: "Логика",
    description: "Ваше мышление"
  },
  thirdRowSum: {
    position: "3,2",
    name: "Труд",
    description: "Ваше отношение к работе"
  },
  fourthRowSum: {
    position: "3,3",
    name: "Память",
    description: "Ваша память и способность учиться"
  }
};

// Get interpretation for numbers 1-9
export const getNumberMeaning = (num: number): string => {
  const meanings = {
    1: "Лидерство, индивидуальность, начало всего нового",
    2: "Дипломатия, партнерство, гармония, чувствительность",
    3: "Коммуникация, самовыражение, оптимизм, творчество",
    4: "Стабильность, практичность, организованность, основательность",
    5: "Свобода, адаптивность, перемены, приключения",
    6: "Гармония, ответственность, сочувствие, баланс",
    7: "Анализ, мудрость, интуиция, внутренняя глубина",
    8: "Власть, материальный успех, достижения, организованность",
    9: "Гуманизм, альтруизм, завершение, духовная мудрость"
  };
  
  return meanings[num as keyof typeof meanings] || "Значение не определено";
};

// Get a more detailed interpretation for a specific position
export const getPositionInterpretation = (position: string, value: number): string => {
  // This could be expanded with much more detailed interpretations
  const position_key = position as keyof typeof matrixPositions;
  
  if (!matrixPositions[position_key]) {
    return "Позиция не определена";
  }
  
  const posInfo = matrixPositions[position_key];
  return `${posInfo.name} (${value}): ${posInfo.description}. ${getNumberMeaning(value)}`;
};

// Calculate how many of each number appears in the matrix
export const calculateFrequencies = (matrixValues: Record<string, number>): Record<number, number> => {
  const frequencies: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };
  
  Object.values(matrixValues).forEach(value => {
    if (value >= 1 && value <= 9) {
      frequencies[value]++;
    }
  });
  
  return frequencies;
};

// Return interpretation based on frequencies
export const interpretFrequencies = (frequencies: Record<number, number>): Record<string, string> => {
  const interpretation: Record<string, string> = {};
  
  // Strong energies (3 or more occurrences)
  const strongEnergies = Object.entries(frequencies)
    .filter(([_, count]) => count >= 3)
    .map(([number, _]) => parseInt(number));
  
  if (strongEnergies.length > 0) {
    interpretation.strong = `У вас ярко выражены энергии: ${strongEnergies.join(', ')}. Это ваши доминирующие качества.`;
  } else {
    interpretation.strong = "У вас нет сильно доминирующих энергий, что говорит о сбалансированности вашей личности.";
  }
  
  // Missing energies (0 occurrences)
  const missingEnergies = Object.entries(frequencies)
    .filter(([_, count]) => count === 0)
    .map(([number, _]) => parseInt(number));
  
  if (missingEnergies.length > 0) {
    interpretation.missing = `У вас отсутствуют энергии: ${missingEnergies.join(', ')}. Это указывает на качества, которые вам стоит развивать.`;
  } else {
    interpretation.missing = "У вас представлены все энергии, что говорит о вашей многогранности.";
  }
  
  return interpretation;
};
