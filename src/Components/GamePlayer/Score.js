class Score {
  constructor(score) {
    this.score = score ?? {
      "Binary Decoder": {
        level: 1.0,
        score: 0,
      },
    };
  }
}

export default Score;
