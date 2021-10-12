var Quiz = require('../../app/controllers/quiz').Quiz;

describe('Quiz ', function () {
  var quiz;
  beforeAll(function () {
    quiz = new Quiz();
  });

  test('constructor works properly, succeeds', function () {
    expect(quiz).not.toEqual(null);
  });

  test('add question to question catalog, succeeds', function () {
    let question = {
      question_id: 0,
      question: 'What is the right answer?',
      answer1: 'wrong answer',
      answer2: 'wrong answer',
      answer3: 'wrong answer',
      answer4: 'right answer',
      right_answer: 4,
    };
    quiz.addQuestion(question);
    expect(quiz.getQuestion(question.question_id)).toEqual(question);
  });
});
