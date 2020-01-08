import {CodeStrings} from './code';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import GeneticAlgorithm from 'genetica';

@Component({
  selector: 'app-sentence-example',
  templateUrl: './sentence-example.component.html',
  styleUrls: ['./sentence-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceExampleComponent implements OnInit {
  public objectiveSentence = 'Earth has few secrets from the birds';
  public randomSentence: string;
  public encoded: number[];
  public decoded: string;
  public code = CodeStrings;

  constructor() {}

  ngOnInit() {
    this.generateRandomSentence();
    this.createGeneticAlgorithm();
  }

  onStartEnvironment() {
    console.log('start');
  }
  onStopEnvironment() {
    console.log('stop');
  }
  onChangeObjective() {}

  createGeneticAlgorithm() {}

  /**
   *
   * @param sentence A normal string
   */
  encode(sentence: string): number[] {
    return sentence.split('').map((character) => {
      character = character.toLowerCase().replace(' ', '{');
      return character.charCodeAt(0) - 97;
    });
  }

  /**
   *
   * @param n CharCode between 0 and 26
   */
  decode(encodedCharacters: number[]): string {
    const shiftedCharacters = encodedCharacters.map((n) => n + 97);
    return String.fromCharCode(...shiftedCharacters).replace(/\{/g, ' ');
  }

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
}
