// passwordValidator.js
export const handlePasswordChange = (newPassword, setPassword, setPasswordRequirements) => {
    setPassword(newPassword);
  
    // Validación de requisitos aquí
    const lengthValid = newPassword.length >= 8;
    const uppercaseValid = /[A-Z]/.test(newPassword);
    const lowercaseValid = /[a-z]/.test(newPassword);
    const digitValid = /\d/.test(newPassword);
  
    setPasswordRequirements({
      length: lengthValid,
      uppercase: uppercaseValid,
      lowercase: lowercaseValid,
      digit: digitValid,
    });
  
    // Aquí calculamos y devolvemos la validez de la contraseña
    const passwordValid = lengthValid && uppercaseValid && lowercaseValid && digitValid;
    return passwordValid;
  };
  
/*export const validatePasswordInitial = (password) => {
    const lengthValid = password.length >= 8;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const digitValid = /\d/.test(password);
    const symbolValid = /[@#$%^&*:;()+_=\.,\-]/.test(password);
  
    const passwordValid = lengthValid && uppercaseValid && lowercaseValid && digitValid && symbolValid;
  
    const messages = {
      valid: "Contraseña válida",
      invalid: "Debe cumplir con los requisitos de contraseña:",
    };
  
    const requirements = [
      { valid: lengthValid, message: "✓ Al menos 8 caracteres" },
      { valid: uppercaseValid, message: "✓ Al menos 1 letra mayúscula" },
      { valid: lowercaseValid, message: "✓ Al menos 1 letra minúscula" },
      { valid: digitValid, message: "✓ Al menos un número" },
      { valid: symbolValid, message: "✓ Al menos un símbolo. Símbolos permitidos: @ # $ % ^ & * : ; ( ) + _ = . , -" },
    ];
  
    return { passwordValid, messages, requirements };
  };
  

export const getPasswordValidationStatus = (passwordRequirements) => {
    const passwordValid = Object.values(passwordRequirements).every(valid => valid);

    const messages = {
        valid: "Contraseña válida",
        invalid: "Debe cumplir con los requisitos de contraseña:",
    };

    const requirements = [
        { valid: passwordRequirements.length, message: "✓ Al menos 8 caracteres" },
        { valid: passwordRequirements.uppercase, message: "✓ Al menos 1 letra mayúscula" },
        { valid: passwordRequirements.lowercase, message: "✓ Al menos 1 letra minúscula" },
        { valid: passwordRequirements.digit, message: "✓ Al menos un número" },
        { valid: passwordRequirements.symbol, message: "✓ Al menos un símbolo. Símbolos permitidos: @ # $ % ^ & * : ; ( ) + _ = . , -" },
    ];

    return { passwordValid, messages, requirements };
};
*/