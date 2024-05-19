import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useGlobalProvider } from "../../hooks";
import { QuestionAndAnswers, ApiResponse, View, CreateQuizFormValues} from "../../types";
import { ApiUrl, shuffleArray } from "../../constants";
import axios from "axios";

// Initial form values setup
const initialValues: CreateQuizFormValues = {
  category: "20",
  amount: 10,
  difficulty: "",
  type: "",
};

export const CreateQuiz = () => {
  const { onSetResults, onSetShowLoader, onSetView } = useGlobalProvider();
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState(initialValues);

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({...formValues, [event.target.name]: event.target.value });
  };

  // Submit form handler using Axios
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = ApiUrl(formValues);

    try {
      onSetShowLoader(true);
      const res = await axios.get(url); 
      const data: ApiResponse = res.data;

      if (data.response_code === 1) {
        setError("Not enough results. Please try again.");
        return;
      }

      const results: QuestionAndAnswers[] = data.results.map((result) => ({
        question: result.question,
        correct_answer: result.correct_answer,
        answers: shuffleArray([...result.incorrect_answers, result.correct_answer]),
        difficulty: result.difficulty, 
      }));

      onSetResults(results);
      onSetView(View.Quiz);
    } catch (error) {
      console.error(error);
    } finally {
      onSetShowLoader(false);
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
        component="form"
        onSubmit={handleSubmit}
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
        <TextField
          select
          label="Category"
          name="category"
          value={formValues.category}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="20">Mythology</MenuItem>
          <MenuItem value="21">Sports</MenuItem>
          <MenuItem value="22">Geography</MenuItem>
          <MenuItem value="23">History</MenuItem>
          <MenuItem value="24">Politics</MenuItem>
          <MenuItem value="25">Geography</MenuItem>
          <MenuItem value="26">Celebrities</MenuItem>
          <MenuItem value="27">Animals</MenuItem>
          <MenuItem value="28">Vehicles</MenuItem>
          <MenuItem value="28">Entertainment: Comics</MenuItem>
          <MenuItem value="30">Science: Gadgets</MenuItem>
        </TextField>
        <TextField
          label="Number of questions"
          name="amount"
          value={formValues.amount.toString()}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 1 , max: 20 }}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Difficulty"
          name="difficulty"
          value={formValues.difficulty}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Any difficulty</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>
        <TextField
          select
          label="Type"
          name="type"
          value={formValues.type}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Any type</MenuItem>
          <MenuItem value="multiple">Multiple choice</MenuItem>
          <MenuItem value="boolean">True/False</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create quiz
        </Button>
      </Box>
      {error && (
        <div style={{ color: "red", marginTop: "24px" }}>
          {error}
        </div>
      )}
    </Box>
  );
};
