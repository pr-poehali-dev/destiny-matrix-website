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
  const fourthNumber = reduceToSingleDigit(
    firstNumber + secondNumber + thirdNumber,
  );

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
    centerNumber,
  };
};

// Map positions in the matrix to meaningful labels
export const matrixPositions = {
  firstNumber: {
    position: "1,1",
    name: "Сущность",
    description: "Глубинная суть вашей души и духовный код",
    element: "Огонь",
    planet: "Солнце",
  },
  secondNumber: {
    position: "1,2",
    name: "Энергетика",
    description: "Источник жизненной силы и энергетический потенциал",
    element: "Вода",
    planet: "Луна",
  },
  thirdNumber: {
    position: "1,3",
    name: "Устремление",
    description: "Кармические задачи и духовные цели в этом воплощении",
    element: "Воздух",
    planet: "Меркурий",
  },
  firstRowSum: {
    position: "2,1",
    name: "Аура здоровья",
    description: "Энергетическая защита и потенциал физического тела",
    element: "Эфир",
    planet: "Юпитер",
  },
  centerNumber: {
    position: "2,2",
    name: "Точка Силы",
    description:
      "Ключ к вашему высшему предназначению и источник магической силы",
    element: "Акаша",
    planet: "Плутон",
  },
  secondRowSum: {
    position: "2,3",
    name: "Судьбоносность",
    description: "Кармические узлы и предопределенные поворотные моменты",
    element: "Земля",
    planet: "Венера",
  },
  fourthNumber: {
    position: "3,1",
    name: "Ментальность",
    description: "Способ восприятия мира и тайные аспекты мышления",
    element: "Воздух",
    planet: "Сатурн",
  },
  thirdRowSum: {
    position: "3,2",
    name: "Путь Реализации",
    description: "Канал проявления энергии в материальном мире",
    element: "Огонь",
    planet: "Марс",
  },
  fourthRowSum: {
    position: "3,3",
    name: "Духовная Память",
    description: "Связь с прошлыми воплощениями и коллективным бессознательным",
    element: "Вода",
    planet: "Нептун",
  },
};

// Get interpretation for numbers 1-9
export const getNumberMeaning = (num: number): string => {
  const meanings = {
    1: "Число первоисточника. Олицетворяет духовную волю, божественное начало и принцип творения. Через вас проявляется энергия космического лидерства и первозданной силы. Вы — проводник первичного импульса вселенной.",
    2: "Число дуальности и равновесия. Воплощает мистическую связь между мирами, способность видеть скрытые измерения реальности. Вы — хранитель тайн и мостов между материальным и духовным планами.",
    3: "Триединое священное число. Символизирует способность к ясновидению, творческому прозрению и пророческому дару. Через вас проявляется космическая радость и созидательная энергия высших сфер.",
    4: "Число материализации и проявленного мира. Дает власть над элементами и силами природы. Вы — мастер материи, способный трансформировать энергию в форму и структурировать хаос вокруг себя.",
    5: "Пентаграмма, число человека и трансформации. Означает способность к магическим превращениям и алхимическим изменениям. Вы — адепт изменений, носитель энергии обновления и свободы.",
    6: "Число гармонии и совершенства. Несет в себе код исцеления и восстановления нарушенных энергетических связей. Вы — целитель душ и хранитель священного равновесия.",
    7: "Мистическое число таинств. Открывает доступ к древним знаниям и эзотерическим учениям. Через вас проявляется мудрость веков и способность проникать в суть вещей.",
    8: "Число бесконечности и кармической справедливости. Дает власть над циклами времени и материальными потоками. Вы — воплощение космического закона и бесконечного движения энергии.",
    9: "Число духовного совершенства и завершения. Символизирует способность к трансцендентальному познанию и духовному просветлению. Вы — носитель универсальной мудрости и космической любви.",
  };
  return (
    meanings[num as keyof typeof meanings] || "Значение скрыто от непосвященных"
  );
};

// Get a more detailed interpretation for a specific position
export const getPositionInterpretation = (
  position: string,
  value: number,
): string => {
  const position_key = position as keyof typeof matrixPositions;

  if (!matrixPositions[position_key]) {
    return "Позиция скрыта в тумане астральных вибраций";
  }

  const posInfo = matrixPositions[position_key];
  const numberMeaning = getNumberMeaning(value);

  const elementMeanings: Record<string, string> = {
    Огонь: "проявляет силу воли, страсть и трансформацию",
    Вода: "связывает с интуицией, эмоциями и подсознанием",
    Воздух: "усиливает интеллект, коммуникацию и адаптивность",
    Земля: "укрепляет стабильность, практичность и материализацию",
    Эфир: "раскрывает связь с высшими измерениями бытия",
    Акаша: "открывает доступ к хроникам Акаши и вселенскому сознанию",
  };

  const planetaryInfluences: Record<string, string> = {
    Солнце: "отражает вашу истинную сущность и жизненную силу",
    Луна: "усиливает интуицию и связь с подсознанием",
    Меркурий: "активирует ментальные способности и коммуникацию",
    Венера: "гармонизирует отношения и творческое самовыражение",
    Марс: "стимулирует энергию действия и трансформации",
    Юпитер: "расширяет возможности и духовное понимание",
    Сатурн: "структурирует и дисциплинирует ваш путь",
    Нептун: "размывает границы и усиливает мистические способности",
    Плутон: "запускает глубинные трансформации и алхимические процессы",
  };

  const elementInfluence =
    elementMeanings[posInfo.element] || "влияет на неизвестные аспекты бытия";
  const planetInfluence =
    planetaryInfluences[posInfo.planet] ||
    "приносит таинственные космические вибрации";

  return `${posInfo.name} (${value}) — ${posInfo.description}. Число ${value} здесь ${numberMeaning} Элемент ${posInfo.element} ${elementInfluence}, а планета ${posInfo.planet} ${planetInfluence}.`;
};

// Calculate how many of each number appears in the matrix
export const calculateFrequencies = (
  matrixValues: Record<string, number>,
): Record<number, number> => {
  const frequencies: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  Object.values(matrixValues).forEach((value) => {
    if (value >= 1 && value <= 9) {
      frequencies[value]++;
    }
  });

  return frequencies;
};

// Return interpretation based on frequencies
export const interpretFrequencies = (
  frequencies: Record<number, number>,
): Record<string, string> => {
  const interpretation: Record<string, string> = {};

  // Strong energies (3 or more occurrences)
  const strongEnergies = Object.entries(frequencies)
    .filter(([_, count]) => count >= 3)
    .map(([number, _]) => parseInt(number));

  if (strongEnergies.length > 0) {
    interpretation.strong = `В вашей матрице доминируют энергии: ${strongEnergies.join(", ")}. Это сверхпроводники космической силы, через которые проявляется ваша истинная сущность. Данные вибрации формируют основу вашего энергетического поля и служат каналами для проявления высших аспектов вашей души.`;
  } else {
    interpretation.strong =
      "В вашей матрице нет явно доминирующих энергий, что указывает на гармоничное распределение космических вибраций. Ваша энергетическая структура находится в состоянии тонкого равновесия между различными аспектами бытия.";
  }

  // Missing energies (0 occurrences)
  const missingEnergies = Object.entries(frequencies)
    .filter(([_, count]) => count === 0)
    .map(([number, _]) => parseInt(number));

  if (missingEnergies.length > 0) {
    interpretation.missing = `В вашей матрице отсутствуют энергии: ${missingEnergies.join(", ")}. Это кармические пробелы — аспекты, которые ваша душа избрала для изучения в текущем воплощении. Эти энергии представляют скрытый потенциал и точки роста. Через осознанную работу с этими вибрациями вы можете достичь духовного просветления и гармонизации своей энергетической структуры.`;
  } else {
    interpretation.missing =
      "Ваша матрица содержит все энергетические вибрации от 1 до 9, что является редким феноменом космической гармонии. Это свидетельствует о вашей духовной зрелости и завершенности кармического пути. Вы обладаете доступом ко всем аспектам универсальной энергии и способны проявлять полный спектр космических вибраций.";
  }

  // Кармические комбинации
  const karmicPatterns: Record<string, string> = {
    strong_1_5_7:
      frequencies[1] >= 2 && frequencies[5] >= 2 && frequencies[7] >= 2
        ? "В вашей матрице проявлена триада Мага (1-5-7), указывающая на сильный потенциал к энергетическим практикам и преобразованию реальности силой мысли."
        : "",
    strong_2_4_8:
      frequencies[2] >= 2 && frequencies[4] >= 2 && frequencies[8] >= 2
        ? "Проявленная комбинация Алхимика (2-4-8) говорит о вашей способности трансформировать энергию между измерениями и воплощать высшие вибрации в материи."
        : "",
    strong_3_6_9:
      frequencies[3] >= 2 && frequencies[6] >= 2 && frequencies[9] >= 2
        ? "Ваша матрица содержит триаду Просветленного (3-6-9), что свидетельствует о высоком уровне духовного развития и способности к глубокому космическому познанию."
        : "",
    missing_1_5:
      frequencies[1] === 0 && frequencies[5] === 0
        ? "Отсутствие энергий 1 и 5 создает кармический узел Искателя, требующий от вас поиска собственной силы и принятия своей уникальности."
        : "",
    missing_3_9:
      frequencies[3] === 0 && frequencies[9] === 0
        ? "Недостаток вибраций 3 и 9 формирует паттерн Испытуемого, указывающий на необходимость развития духовного видения и интуитивного познания."
        : "",
  };

  // Фильтруем только существующие паттерны
  const activePatterns = Object.values(karmicPatterns).filter(
    (pattern) => pattern !== "",
  );

  if (activePatterns.length > 0) {
    interpretation.karmicPatterns = `${activePatterns.join(" ")}`;
  }

  return interpretation;
};

// Дополнительные глубокие интерпретации для особых комбинаций
export const getSpecialCombinations = (
  matrixValues: Record<string, number>,
): string[] => {
  const specialInsights: string[] = [];

  // Центральное число имеет особое значение
  if (matrixValues.centerNumber) {
    const centerMeanings: Record<number, string> = {
      1: "Ваша Точка Силы — число 1, священный символ первоисточника. Это указывает на прямую связь с Абсолютом и способность инициировать новые циклы бытия. Вы — проводник изначальной космической энергии и носитель творящей силы Логоса.",
      2: "Центральная вибрация вашей матрицы — число 2, символ Высшей Полярности. Это отражает вашу роль как медиатора между мирами, хранителя равновесия и смотрителя Врат. Через вас проходит поток универсальной гармонии, соединяющий противоположности.",
      3: "В центре вашей матрицы находится число 3 — священный символ Троицы. Это наделяет вас способностью синтезировать высшие энергии и проявлять их в творческом самовыражении. Вы — носитель божественной искры созидания и хранитель трехчастной структуры бытия.",
      4: "Число 4 в центре вашей матрицы символизирует Тетраграмматон — священное имя Творца. Это дает вам власть над четырьмя стихиями и способность формировать материальную реальность. Вы — воплощение космического порядка и архитектор проявленного мира.",
      5: "Ваша центральная вибрация — число 5, пентаграмма Высшего Человека. Это символ микрокосма, отражающего макрокосм. Вы — ходящий между мирами, способный преодолевать границы измерений и трансформировать энергии всех уровней бытия.",
      6: "Центр вашей матрицы занимает число 6 — символ совершенной гармонии и Соломоновой печати. Это указывает на вашу способность устанавливать высший порядок и равновесие. Вы — воплощение принципа любви как универсальной силы, соединяющей все аспекты мироздания.",
      7: "В центре вашей судьбы стоит число 7 — ключ к Тайным Вратам. Это священное число посвящения и мистических откровений. Вы — носитель древнего знания и хранитель семи печатей мудрости, способный проникать в самые глубокие тайны бытия.",
      8: "Число 8 в центре вашей матрицы символизирует Бесконечность и Колесо Кармы. Это дает вам власть над циклами времени и причинно-следственными связями. Вы — мастер материальных энергий и алхимик, способный трансмутировать низшие вибрации в высшие.",
      9: "Ваша центральная вибрация — число 9, символ высшего совершенства и космической полноты. Это число завершения и трансценденции. Вы — носитель универсальной мудрости и космического сознания, способный объединять все проявления в единое целое.",
    };
    specialInsights.push(
      centerMeanings[matrixValues.centerNumber] ||
        "Центральное число вашей матрицы скрывает тайну, доступную лишь подготовленному сознанию.",
    );
  }

  // Особые комбинации диагоналей
  if (matrixValues.firstDiagonal && matrixValues.secondDiagonal) {
    if (matrixValues.firstDiagonal === matrixValues.secondDiagonal) {
      specialInsights.push(
        `Обе диагонали вашей матрицы имеют одинаковое значение ${matrixValues.firstDiagonal} — это редкий феномен Зеркала Гермеса. Такое совпадение указывает на гармоничное сочетание сознательного и бессознательного, материального и духовного в вашей судьбе. Вы обладаете уникальной способностью видеть истину по обе стороны завесы и служить проводником высших энергий между измерениями.`,
      );
    }
    if (matrixValues.firstDiagonal + matrixValues.secondDiagonal === 10) {
      specialInsights.push(
        `Диагонали вашей матрицы (${matrixValues.firstDiagonal} и ${matrixValues.secondDiagonal}) образуют Священную Декаду (сумма 10), что указывает на завершенность большого кармического цикла. Вы находитесь на пороге нового этапа духовной эволюции, где прошлые испытания превращаются в мудрость и силу для будущих свершений.`,
      );
    }
  }

  // Мистические треугольники в матрице
  const triangles = [
    [
      matrixValues.firstNumber,
      matrixValues.secondNumber,
      matrixValues.firstRowSum,
    ],
    [
      matrixValues.secondNumber,
      matrixValues.thirdNumber,
      matrixValues.secondRowSum,
    ],
    [
      matrixValues.fourthNumber,
      matrixValues.thirdRowSum,
      matrixValues.fourthRowSum,
    ],
    [
      matrixValues.firstRowSum,
      matrixValues.centerNumber,
      matrixValues.secondRowSum,
    ],
  ];

  triangles.forEach((triangle, index) => {
    if (
      triangle[0] === triangle[1] &&
      triangle[1] === triangle[2] &&
      triangle[0] !== undefined
    ) {
      const triangleNames = [
        "Верхний левый",
        "Верхний правый",
        "Нижний",
        "Центральный",
      ];
      specialInsights.push(
        `${triangleNames[index]} треугольник вашей матрицы образует мощный энергетический резонатор с вибрацией числа ${triangle[0]}. Это особый знак усиленного канала для проявления соответствующих энергий в вашей жизни. Такая концентрация однородных вибраций создает эффект духовного лазера, способного прожигать завесы иллюзий и материализовать высшие аспекты вашего предназначения.`,
      );
    }
  });

  // Врата Посвящения (особые числовые комбинации)
  const gates = [
    {
      name: "Врата Мага",
      condition:
        matrixValues.firstNumber === 1 && matrixValues.centerNumber === 7,
    },
    {
      name: "Портал Пророка",
      condition:
        matrixValues.secondNumber === 3 && matrixValues.fourthRowSum === 9,
    },
    {
      name: "Ключ Алхимика",
      condition:
        matrixValues.thirdNumber === 8 && matrixValues.firstRowSum === 4,
    },
    {
      name: "Печать Высшего Я",
      condition:
        matrixValues.centerNumber === 5 && matrixValues.fourthNumber === 5,
    },
    {
      name: "Код Бессмертия",
      condition:
        matrixValues.firstDiagonal === 7 && matrixValues.secondDiagonal === 7,
    },
  ];

  gates.forEach((gate) => {
    if (gate.condition) {
      specialInsights.push(
        `В вашей матрице судьбы активированы "${gate.name}" — редкая конфигурация энергий, открывающая доступ к высшим аспектам сознания и тайным знаниям. Эта комбинация указывает на важную миссию вашей души в текущем воплощении и особую защиту высших сил на вашем пути.`,
      );
    }
  });

  return specialInsights;
};
