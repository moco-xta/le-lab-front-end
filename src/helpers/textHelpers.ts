export function splitTextToWords(text: string): string[] {
  return text.split(' ')
}

export function splitTextToCharacters(text: string): string[] {
  return Array.from(text)
}

export function capitalizeFirstLetter(word: string): string {
  const firstLetter = word.charAt(0)
  const firstLetterUpperCase = firstLetter.toUpperCase()
  const remainingLetters = word.slice(1)
  return firstLetterUpperCase + remainingLetters
}
