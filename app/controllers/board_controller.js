class BoardFactory {
    constructor() {}

    createBoard() {
        return new Board();
    }
}

module.exports.BoardFactory = BoardFactory;