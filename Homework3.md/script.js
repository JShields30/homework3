let specialCharacters = ["@","%","+","\\","/","'","!","#","$","^","?",":",",",")","(","}","{","]","[","~","-","_","."];
let numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let upperCasedCharacters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let lowerCasedCharacters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function getPasswordOptions() {
  let length = parseInt(prompt("How many characters would you like your password to have? (You can choose any number between 8 and 128)"));

  if (isNaN(length) === true) {
    alert("Input must be a number");
    return;
  }

  let hasSpecialCharacters = confirm("Click OK to include special characters.");

  let hasNumericCharacters = confirm("Click OK to include numeric characters.");

  let hasLowerCasedCharacters = confirm("Click OK to include lowercase characters.");

  let hasUpperCasedCharacters = confirm("Click OK to include uppercase characters.");

  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowerCasedCharacters === false &&
    hasUpperCasedCharacters === false
  ) {
    alert("Must select at least one character type");
    return;
  }

  let passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCasedCharacters: hasLowerCasedCharacters,
    hasUpperCasedCharacters: hasUpperCasedCharacters
  };
  return passwordOptions;
}

function getRandom(arr) {
  let randIndex = Math.floor(Math.random() * arr.length);
  let randElement = arr[randIndex];
  return randElement;
}

function generatePassword() {
  let options = getPasswordOptions();

  let result = [];

  let possibleCharacters = [];

  let guaranteedCharacters = [];

  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  for (let i = 0; i < options.length; i++) {
    let possibleCharacter = getRandom(possibleCharacters);

    result.push(possibleCharacter);
  }

  for (let i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  return result.join("");
}

let copyBtn = document.querySelector("#copy");
let generateBtn = document.querySelector("#generate");

function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

  copyBtn.removeAttribute("disabled");
  copyBtn.focus();
}

function copyToClipboard() {
  let passwordText = document.querySelector("#password");

  passwordText.select();
  document.execCommand("copy");

  alert(
    "Your password " + passwordText.value + " was copied to your clipboard."
  );
}

copyBtn.addEventListener("click", copyToClipboard);
generateBtn.addEventListener("click", writePassword);
