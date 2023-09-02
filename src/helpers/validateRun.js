export const validateRun = (run) => {
    const cleanRun = run.replace(/[^0-9kK]/g, '')
  
    if (cleanRun.length < 2) {
      return false
    }
  
    const runDigits = cleanRun.slice(0, -1)
    const verifierDigit = cleanRun.slice(-1).toLowerCase()
  
    const runSum = runDigits
      .split('')
      .reverse()
      .reduce((acc, digit, index) => acc + Number(digit) * (index % 6 + 2), 0)
  
    const calculatedVerifierDigit = 11 - (runSum % 11)
  
    const validVerifierDigit = calculatedVerifierDigit === 10 ? 'k' : calculatedVerifierDigit.toString()
  
    return verifierDigit === validVerifierDigit
  }
  