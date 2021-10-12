var Dice = require('../../app/controllers/dice').Dice;

describe('Dice ', function () {
  var dice;
  beforeEach(function () {
    let conf = {
      d4: 0,
      d6: 2,
      d8: 0,
      d10: 0,
      d12: 0,
      d20: 0,
    };
    dice = new Dice(conf);
  });

  test('constructor works properly, succeeds', function () {
    expect(dice).not.toEqual(null);
    expect(dice.d6).toEqual(2);
  });

  test('dice count setters work properly, succeeds', function () {
    dice.setDiceCountForD4(1);
    dice.setDiceCountForD6(2);
    dice.setDiceCountForD8(3);
    dice.setDiceCountForD10(4);
    dice.setDiceCountForD12(5);
    dice.setDiceCountForD20(6);

    expect(dice.getDiceCountForD4()).toEqual(1);
    expect(dice.getDiceCountForD6()).toEqual(2);
    expect(dice.getDiceCountForD8()).toEqual(3);
    expect(dice.getDiceCountForD10()).toEqual(4);
    expect(dice.getDiceCountForD12()).toEqual(5);
    expect(dice.getDiceCountForD20()).toEqual(6);
  });

  test('dice roll function works properly, succeeds', function() {
    dice.setDiceCountForD4(1);
    dice.setDiceCountForD6(2);
    dice.setDiceCountForD8(3);
    dice.setDiceCountForD10(4);
    dice.setDiceCountForD12(5);
    dice.setDiceCountForD20(6);

    expect(dice.roll().d4.length).toEqual(1);
    expect(dice.roll().d6.length).toEqual(2);
    expect(dice.roll().d8.length).toEqual(3);
    expect(dice.roll().d10.length).toEqual(4);
    expect(dice.roll().d12.length).toEqual(5);
    expect(dice.roll().d20.length).toEqual(6);
  });
});
