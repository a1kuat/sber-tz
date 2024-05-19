import { CreateQuizFormValues } from "../types";

export const ApiUrl = ({
  amount,
  category,
  difficulty,
  type,
}: CreateQuizFormValues): string => {
  let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}`;

  if (difficulty) {
    url += `&difficulty=${difficulty}`;
  }
  if (type) {
    url += `&type=${type}`;
  }

  return url;
};

export const shuffleArray = (values: string[]) => {
  let index = values.length,
      randomIndex;

  while (index != 0) {
    randomIndex = Math.floor(Math.random() * index);
    index--;
    
    [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
  }

  return values;
}; 