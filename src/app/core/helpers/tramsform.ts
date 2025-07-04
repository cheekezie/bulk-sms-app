export class Modify {
  static initials(name: string | null | undefined): string {
    if (name) {
      const wordArray = name.split(' ').filter((w) => w);
      const wordLength = wordArray.length;
      return `${wordArray[0][0]}${
        wordLength > 1 ? wordArray[1][0] : ''
      }`.toUpperCase();
    }
    return '';
  }

  static maskLastFour(text: string): string {
    const wordArr = Array.from(text);
    wordArr.splice(-4, 4, 'XXXX');
    return wordArr.join('');
  }
}
