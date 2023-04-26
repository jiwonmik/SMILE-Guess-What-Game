export function getRandomWord() {
  const randomWordList = ['country', 'mercury', 'algorithm', 'language'];
  const randomWord = Math.floor(Math.random() * randomWordList.length);
  return randomWordList[randomWord];
}
