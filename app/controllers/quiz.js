class Quiz {
  constructor(conf) {
    conf = Object.assign(
      {
        questions: {},
        asked: {},
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

  getQuestionByID(question_id) {
    return this.questions[question_id];
  }

  replaceCatalog(catalog) {
    this.questions = catalog;
  }

  setAsked(asked) {
    this.asked = asked;
  }

  getAskedList() {
    return this.asked;
  }

  getQuestionCatalog() {
    return this.questions;
  }
}

module.exports.Quiz = Quiz;
