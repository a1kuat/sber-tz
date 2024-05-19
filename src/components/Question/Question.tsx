import { QuestionAndAnswers } from "../../types";
import { FormControlLabel, RadioGroup, Radio, Box } from "@mui/material";

interface Props {
  result: QuestionAndAnswers;
  name: string;
  isHidden: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Question = ({ result, name, isHidden, onChange }: Props) => {
  return (
    <Box sx={{ display: isHidden? 'none' : 'block', width: '100%'}}>
      <header className="card-header">
        <p className="card-header-title">{result.question}</p>
      </header>
      <div className="card-content">
        <div className="content">
          <RadioGroup name={name} onChange={onChange}>
            {result.answers.map((answer, index) => (
              <FormControlLabel
                key={index}
                value={answer.trim()}
                control={<Radio />}
                label={answer.trim()}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </Box>
  );
};
