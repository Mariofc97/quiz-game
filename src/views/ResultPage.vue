<template>
  <div class="container my-4">
    <!-- User avatar + username arriba a la derecha (responsive) -->
    <div
      class="page-userbar d-flex justify-content-end align-items-center mb-2 gap-2"
    >
      <UserAvatar v-if="user" :user="user" />
    </div>

    <div class="text-center">
      <h3>Quiz Completed!</h3>
      <h1 class="display-1 fw-bold font-monospace">
        {{ score() }}/{{ quizAmount }}
      </h1>
      <h4>{{ evaluateScore.percentage }}% - {{ evaluateScore.message }}</h4>
      <hr style="width: 85%; margin: auto" />

      <div v-for="(quiz, idx) in quizzes" :key="idx" class="quiz-card">
        <h4>Question {{ idx + 1 }}: {{ quiz.question }}</h4>

        <div style="position: relative">
          <div class="bar bar-green"></div>
          <h5 class="ans correct-ans">
            {{ quiz.correct_answer }}
          </h5>
          <h5 class="correct-ans-text">Correct Answer</h5>
        </div>

        <div style="position: relative">
          <div
            class="bar"
            :class="{
              'bar-green': ansCheckList[idx],
              'bar-red': !ansCheckList[idx],
            }"
          ></div>

          <h5
            class="ans"
            :class="{
              'correct-ans': ansCheckList[idx],
              'user-ans': !ansCheckList[idx],
            }"
          >
            {{ selectedAnswer[idx] }}
          </h5>
          <h5 class="user-ans-text">Your Answer</h5>
        </div>
      </div>

      <button @click="backCategory" class="btn btn-primary btn-size">
        Take Other Quizzes
      </button>
    </div>
  </div>
</template>

<script>
import UserAvatar from "../components/UserAvatar.vue";

export default {
  name: "ResultPage",
  components: {
    UserAvatar,
  },
  data() {
    return {
      user: null,
      ansCheckList: [],
    };
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);
    }
  },
  mounted() {
    this.saveQuizScore();
  },
  methods: {
    backCategory() {
      this.$router.push({
        path: "/categories",
      });
    },
    saveQuizScore() {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(
          (u) => u.username === loggedInUser.username
        );

        if (userIndex !== -1) {
          const newScore = {
            date: new Date().toLocaleString(),
            category: this.$route.query.quizCategory,
            score: this.score(),
            total: this.quizAmount,
            percentage: this.evaluateScore.percentage,
          };

          if (!users[userIndex].scores) {
            users[userIndex].scores = [];
          }

          users[userIndex].scores.push(newScore);
          localStorage.setItem("users", JSON.stringify(users));

          loggedInUser.scores = users[userIndex].scores;
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        }
      }
    },
    score() {
      let score = 0;
      for (let quiz in this.quizzes) {
        if (this.selectedAnswer[quiz] == this.quizzes[quiz].correct_answer) {
          this.ansCheckList[quiz] = true;
          score++;
        } else {
          this.ansCheckList[quiz] = false;
        }
      }
      console.log(this.ansCheckList);
      return score;
    },
  },
  computed: {
    quizzes() {
      return JSON.parse(this.$route.query.quizzes);
    },
    selectedAnswer() {
      return JSON.parse(this.$route.query.selectedAnswer);
    },

    quizAmount() {
      return this.$route.query.quizAmount;
    },
    evaluateScore() {
      const percentage = (this.score() * 100) / this.quizAmount;
      if (percentage >= 90)
        return { percentage: percentage, message: "Excellent!" };
      if (percentage >= 70)
        return { percentage: percentage, message: " Good job!" };
      if (percentage >= 50)
        return { percentage: percentage, message: "Not bad!" };
      return { percentage: percentage, message: "Keep studying!" };
    },
    quizCategory() {
      return this.$route.query.quizCategory || "..";
    },
  },
};
</script>

<style>
.btn-size {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px 20px;
  width: 200px;
}

.quiz-card {
  width: 80%;
  margin: 30px auto;
  padding: 20px;
  border: solid 1px #cccccc;
  border-radius: 15px;
  text-align: left;
}
.bar {
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
}
.bar-red {
  background-color: red;
}
.bar-green {
  background-color: rgb(6, 176, 6);
}
.ans {
  height: 50px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.correct-ans {
  background-color: #e3ffe6;
}
.correct-ans-text {
  position: absolute;
  top: 11px;
  right: 20px;
  color: rgb(79, 164, 79);
}
.user-ans {
  background-color: #fff2f2;
}
.user-ans-text {
  position: absolute;
  top: 11px;
  right: 20px;
}
</style>
