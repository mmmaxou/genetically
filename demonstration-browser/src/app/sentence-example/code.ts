export const CodeStrings = {
  generateRandomSentence: `
  /**
   * Create a random sequence of numbers of the length of the objective sentence
   */
  generateRandomSentence() {
    const l = this.objectiveSentence.length;

    // Create an array of the objective's length
    const randomSentence = Array.from(Array(l))
      // Create a random character for each element
      .map(() => {
        // One random number
        const n = Math.round(Math.random() * 26);

        // Convert it into a character
        const c = String.fromCharCode(n + 97);

        // Transform the character corresponding to CharCode 123 to have spaces
        return c.toLowerCase().replace(' ', '{');
      })
      // Join the array of character into a string
      .join('');
    this.randomSentence = randomSentence;
    this.encoded = this.encode(this.randomSentence);
    this.decoded = this.decode(this.encoded);
  }
  `,
  encode: `
    `,
};
