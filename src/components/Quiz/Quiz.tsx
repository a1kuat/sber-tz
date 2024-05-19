import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useGlobalProvider } from "../../hooks";
import { Question } from "../Question";
import { View, QuizFormValues } from "../../types";

const initialValues: QuizFormValues = {
  answers: [], 
};

export const Quiz = () => {
  const { results, onSetView, onSetUserAnswers } = useGlobalProvider();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState(initialValues.answers);

  const handleNext = () => {
    if (answers[activeQuestion]) {
      if (activeQuestion < results.length - 1) {
        setActiveQuestion(activeQuestion + 1);
      } else {
        const answersArray = Object.values(answers).map(answer => String(answer));
        console.log("Submitting answers:", answersArray); // Now this should log an array
        onSetUserAnswers(answersArray);
        onSetView(View.Done);
      }
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Quiz
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 1,
          p: 2,
          m: 2,
        }}
      >
        <p className="mb-1">
          Question {activeQuestion + 1}/{results.length}
        </p>
        {results.map((result, index) => (
          <Question
            key={index}
            result={result}
            name={`answers[${index}]`}
            isHidden={activeQuestion!== index}
            onChange={(e) => setAnswers((prevAnswers) => ({
            ...prevAnswers,
              [index]: e.target.value
            }))}
          />
        ))}
        {error && (
          <div style={{ color: "red", marginTop: "24px" }}>
            Please select one answer
          </div>
        )}
        <Button onClick={handleNext} variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit answer
        </Button>
      </Box>
    </Box>
  );
};
