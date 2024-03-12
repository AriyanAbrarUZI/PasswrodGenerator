document.addEventListener('DOMContentLoaded', () => {
    const includeUppercaseElement = document.getElementById('includeUppercase');
    const includeLowercaseElement = document.getElementById('includeLowercase');
    const includeNumbersElement = document.getElementById('includeNumbers');
    const includeSymbolsElement = document.getElementById('includeSymbols');
    const lengthSliderElement = document.getElementById('lengthSlider');
    const lengthValueElement = document.getElementById('lengthValue');
    const passwordOutputElement = document.getElementById('passwordOutput');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
  
    // Update length value display
    lengthSliderElement.oninput = function () {
      lengthValueElement.textContent = this.value;
    }
  
    // Ensure one of the "Include Uppercase" or "Include Lowercase" is always checked
    includeUppercaseElement.addEventListener('change', () => {
      if (!includeUppercaseElement.checked && !includeLowercaseElement.checked) {
        includeLowercaseElement.checked = true;
      }
    });
  
    includeLowercaseElement.addEventListener('change', () => {
      if (!includeLowercaseElement.checked && !includeUppercaseElement.checked) {
        includeUppercaseElement.checked = true;
      }
    });
  
    // Copy password to clipboard
    copyButton.addEventListener('click', () => {
      if (passwordOutputElement.value === '') {
        return; // Don't copy if the password is empty
      }
      passwordOutputElement.select();
      document.execCommand('copy');
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'copy';
      }, 2000);
    });
  
    // Generate password function
    function generatePassword(length, uppercase, lowercase, numbers, symbols) {
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';
      const symbolChars = '!@#$%^&*()_+-=[]{}|;:\'",.<>/?`~';
      let allChars = '';
      let password = '';
  
      if (uppercase) allChars += uppercaseChars;
      if (lowercase) allChars += lowercaseChars;
      if (numbers) allChars += numberChars;
      if (symbols) allChars += symbolChars;
  
      for (let i = 0; i < length; i++) {
        const charIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[charIndex];
      }
  
      return password;
    }
  
    // Generate and display a new password
    generateButton.addEventListener('click', () => {
      const length = lengthSliderElement.value;
      const includeUppercase = includeUppercaseElement.checked;
      const includeLowercase = includeLowercaseElement.checked;
      const includeNumbers = includeNumbersElement.checked;
      const includeSymbols = includeSymbolsElement.checked;
      const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
      passwordOutputElement.value = password;
    });
  });
  