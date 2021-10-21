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
    expect(quiz.getQuestionByID(question.question_id)).toEqual(question);
  });

  test('replace question catalog, succeeds', function () {
    let catalog = {
      0: {
        question_id: 0,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
      1: {
        question_id: 1,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
      2: {
        question_id: 2,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
      3: {
        question_id: 3,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
    };

    quiz.replaceCatalog(catalog);
    expect(quiz.getQuestionCatalog()).toEqual(catalog);
  });

  test('replace asked list, succeeds', function () {
    let asked = { 0: false, 1: false, 2: false, 3: false };
    quiz.setAsked(asked);
    expect(quiz.getAskedList()).toEqual(asked);
  });

  test('add an entry in the asked list when an question is added to the catalog, succeeds', function () {
    let question = {
      question_id: 4,
      question: 'What is the right answer?',
      answer1: 'wrong answer',
      answer2: 'wrong answer',
      answer3: 'wrong answer',
      answer4: 'right answer',
      right_answer: 4,
    };

    quiz.addQuestion(question);

    expect(quiz.getAskedList()[4]).not.toEqual(undefined);
    expect(quiz.getAskedList()[4]).toEqual(false);
  });

  test('build new asked list when question catalog is replaced, succeeds', function () {
    let catalog = {
      0: {
        question_id: 0,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
      1: {
        question_id: 1,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
      2: {
        question_id: 2,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
      3: {
        question_id: 3,
        question: 'What is the right answer?',
        answer1: 'wrong answer',
        answer2: 'wrong answer',
        answer3: 'wrong answer',
        answer4: 'right answer',
        right_answer: 4,
      },
    };

    quiz.replaceCatalog(catalog);
    expect(quiz.getAskedList()).toEqual({
      0: false,
      1: false,
      2: false,
      3: false,
    });
  });

  test('get a question and mark it as asked, succeeds', function() {
    let question = quiz.popQuestion();
    expect(question.question_id).toEqual(3);
    expect(quiz.getAskedList()[3]).toEqual(true);
    expect(quiz.popQuestion().question_id).not.toEqual(3);
  });
});
