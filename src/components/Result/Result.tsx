import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useMemo, useEffect } from 'react';
import { useGlobalProvider } from '../../hooks';
import { View } from '../../types';

export const Results = () => {
  const { userAnswers, results, onSetView } = useGlobalProvider();

  useEffect(() => {
    console.log('Current userAnswers in Results:', userAnswers);
  }, [userAnswers]);

  const correctAnswers = useMemo(() => {
    if (!Array.isArray(userAnswers)) {
      console.error('Expected userAnswers to be an array');
      return 0;
    }

    const correctAnswersArr = results.map((result) => result.correct_answer.trim());
    return userAnswers.reduce((previous, current, index) => {
      return correctAnswersArr[index] === current.trim()
       ? previous + 1
        : previous;
    }, 0);
  }, [userAnswers, results]);

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Centered alignment */}
      {/* Overall Result */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px', padding: '2px' }}>
        <Typography variant="h3" gutterBottom>
          Your results: {`${correctAnswers}/${results.length}`}
        </Typography>
      </Box>

      {/* All Questions */}
      <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px', marginRight: '20px' }}> {/* Grid layout for cards */}
        {results.map((result, index) => {
          const isCorrect = result.correct_answer.trim() === userAnswers[index];
          const bgColor = isCorrect? '#B0EBB4' : '#FCAEAE';
          const textColor = isCorrect? '#008800' : '#FF0000';

          return (
            <Card
              key={index}
              sx={{
                bgcolor: bgColor,
                color: textColor,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <CardContent>
                <Typography variant="body1">{result.question}</Typography>
                <Typography variant="subtitle2" color="text.primary">
                  Difficulty: {result.difficulty.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Your answer: {userAnswers[index]}
                </Typography>
                {!isCorrect && (
                  <Typography variant="body2" color="text.primary">
                    Correct answer: {result.correct_answer}
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 , gap: 10 }}>
        <Button variant="contained" color="primary" onClick={() => onSetView(View.Quiz)}>
          Start again
        </Button>
        <Button variant="contained" color="primary" onClick={() => onSetView(View.Create)}>
          New quiz
        </Button>
      </Box>
    </Box>
  );
};
