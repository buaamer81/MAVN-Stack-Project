<template>
  <div>
    <h1>Our Quiz App</h1>
    <button @click="fetchQuestions" v-if="loading">Start Quiz</button>
    <div v-if="questions.length > 0">
      <div v-for="question in questions" :key="question.id">
        <p>{{ question.question }}</p>
        <ul>
          <li v-for="option in question.options" :key="option">
            <label>
              <input
                type="radio"
                v-model="userAnswers[question.id]"
                :value="option"
              />
              {{ option }}
            </label>
          </li>
        </ul>
      </div>
      <button @click="submitQuiz">Submit Quiz</button>
    </div>
    <div v-if="score !== null">
      <p>Your Score: {{ score }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  data() {
    return {
      questions: [],
      loading: false,
      userAnswers: {},
      score: null
    };
  },
  methods: {
    async fetchQuestions() {
      this.loading = true;
      try {
        let response = await fetch("http://localhost:3000/api/questions");
        let jsonResponse = await response.json();
        let data = jsonResponse.questions.map((question) => {
          question.options = question.options;
          return question;
        });
        this.questions = data;
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        this.loading = false;
      }
    },
    async submitQuiz() {
      try {
        let response = await fetch("http://localhost:3000/api/submit", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers: this.getUserAnswersArray() }),
        });
        let jsonResponse = await response.json();
        this.score = jsonResponse.score;
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    },
    getUserAnswersArray() {
      return Object.keys(this.userAnswers).map(questionId => ({
        questionId,
        answer: this.userAnswers[questionId],
      }));
    },
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f8f8;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
  margin-top: auto;
  padding: 30px;
  font-weight: bold;
}

button {
  background-color: green;
  color: #fff;
  font-size: 1.5em;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

label {
  display: block;
}
</style>
