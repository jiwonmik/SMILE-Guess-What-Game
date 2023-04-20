export function getRandomWord() {
  const randomWordList = ['country', 'classroom', 'school', 'language'];
  const randomWord = Math.floor(Math.random() * randomWordList.length);
  return randomWordList[randomWord];
}
