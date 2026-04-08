id="5f6o9k"
exports.generateCompanyId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];

  const numbers = Math.floor(1000 + Math.random() * 9000); // 4 digits

  return randomLetters + numbers; // e.g. AB1234
};