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
    this.asked = conf.asked;
    this.queue = [];
    
    for (let [key, ] of Object.entries(this.questions)) {
      this.queue.push(key);
    }
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
    this.asked[question.question_id] = false;
    this.queue.push(question.question_id);
  }

  getQuestionByID(question_id) {
    return this.questions[question_id];
  }

  replaceCatalog(catalog) {
    this.questions = catalog;
    this.asked = {};
    this.queue = [];

    for (let [key, ] of Object.entries(catalog)) {
      this.asked[key] = false;
      this.queue.push(key);
    }
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

  popQuestion() {
    let id = this.queue.pop();
    this.asked[id] = true;
    return this.questions[id];
  }
}

module.exports.Quiz = Quiz;
