class Quiz {
  constructor(conf) {
    conf = Object.assign(
      {
        questions: {},
      },
      conf
    );

    this.questions = conf.questions;
  }

  addQuestion(question) {
    question = Object.assign(
      {
        question_id: 0,
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        right_answer: 1,
      },
      question
    );
    this.questions[question.question_id] = question;
  }

  getQuestion(question_id) {
    return this.questions[question_id];
  }
}

module.exports.Quiz = Quiz;
