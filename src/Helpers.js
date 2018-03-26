function titleCase(stringStatement) {
  return stringStatement
    .split(' ')
    .map(word => {
      const lowerCaseWord = word.toLowerCase();
      const formattedWord = lowerCaseWord[0].toUpperCase() + lowerCaseWord.substr(1);
      return formattedWord;
    })
}

export { titleCase };