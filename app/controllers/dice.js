class Dice {
  constructor(conf) {
    conf = Object.assign(
      {
        d4: 0,
        d6: 0,
        d8: 0,
        d10: 0,
        d12: 0,
        d20: 0,
      },
      conf
    );

    this.d4 = conf.d4;
    this.d6 = conf.d6;
    this.d8 = conf.d8;
    this.d10 = conf.d10;
    this.d12 = conf.d12;
    this.d20 = conf.d20;
  }

  setDiceCountForD4(count) {
    this.d4 = count;
  }

  getDiceCountForD4() {
    return this.d4;
  }

  setDiceCountForD6(count) {
    this.d6 = count;
  }

  getDiceCountForD6() {
    return this.d6;
  }

  setDiceCountForD8(count) {
    this.d8 = count;
  }

  getDiceCountForD8() {
    return this.d8;
  }

  setDiceCountForD10(count) {
    this.d10 = count;
  }

  getDiceCountForD10() {
    return this.d10;
  }

  setDiceCountForD12(count) {
    this.d12 = count;
  }

  getDiceCountForD12() {
    return this.d12;
  }

  setDiceCountForD20(count) {
    this.d20 = count;
  }

  getDiceCountForD20() {
    return this.d20;
  }

  roll() {
    let res = { d4: [], d6: [], d8: [], d10: [], d12: [], d20: [] };
    for (let i = 0; i < this.d4; i++) {
      res.d4.push(this.randomNumberInRange(1, 4));
    }
    for (let i = 0; i < this.d6; i++) {
      res.d6.push(this.randomNumberInRange(1, 6));
    }
    for (let i = 0; i < this.d8; i++) {
      res.d8.push(this.randomNumberInRange(1, 8));
    }
    for (let i = 0; i < this.d10; i++) {
      res.d10.push(this.randomNumberInRange(1, 10));
    }
    for (let i = 0; i < this.d12; i++) {
      res.d12.push(this.randomNumberInRange(1, 12));
    }
    for (let i = 0; i < this.d20; i++) {
      res.d20.push(this.randomNumberInRange(1, 20));
    }
    console.log(res);
    return res;
  }

  randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports.Dice = Dice;
