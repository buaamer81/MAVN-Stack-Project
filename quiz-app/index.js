// index.js
const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
// Define routes

// Route for fetching quiz questions
app.get('/api/questions', (req, res) => {
    // Your logic to fetch quiz questions goes here
    const questions = [
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            answer: "Paris"
        },
        {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            id: 3,
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "NaCl", "O2"],
            answer: "H2O"
        },
        {
            id: 4,
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
            answer: "William Shakespeare"
        },
        {
            id: 5,
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            answer: "Blue Whale"
        },
        {
            id: 6,
            question: "What is the tallest mountain in the world?",
            options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Denali"],
            answer: "Mount Everest"
        },
        {
            id: 7,
            question: "Who painted the Mona Lisa?",
            options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
            answer: "Leonardo da Vinci"
        },
        {
            id: 8,
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe", "Cu"],
            answer: "Au"
        }
    ];
    res.json({ questions });
});

// Route for submitting quiz answers
app.post('/api/submit', (req, res) => {
    const { answers } = req.body; // Assuming answers are submitted as an array in the request body
    // Your logic to evaluate submitted answers goes here
    // Compare submitted answers with correct answers and calculate score
    const score = calculateScore(answers); // Implement calculateScore function as per your logic
    res.json({ score });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to calculate score (example)
function calculateScore(answers) {
    let score = 0;
    const correctAnswers = [
        { questionId: 1, answer: "Paris" },
        { questionId: 2, answer: "Mars" },
        { questionId: 3, answer: "H2O" },
        { questionId: 4, answer: "William Shakespeare" },
        { questionId: 5, answer: "Blue Whale" },
        { questionId: 6, answer: "Mount Everest" },
        { questionId: 7, answer: "Leonardo da Vinci" },
        { questionId: 8, answer: "Au" }
        // Add correct answers for more questions
    ];
    answers.forEach(answer => {
        const correctAnswer = correctAnswers.find(a => a.questionId === answer.questionId);
        if (correctAnswer && correctAnswer.answer === answer.answer) {
            score++;
        }
    });
    return score;
}
