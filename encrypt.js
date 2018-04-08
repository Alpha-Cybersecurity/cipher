function protect_key(password, salt){

  // 1000 iterations takes a couple seconds in the browser. Wouldn't want to go much higher if this is a browser implementation
  var iterations = 10000;

  // make your own hash if you don't know this one
  return CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations }).toString();
}

// TODO Avoid password fields
// TODO https://www.npmjs.com/package/crypto-js
// TODO Prompt for password
// TODO Encrypt / Decrypt
var original_value = document.activeElement.value;

var hash = CryptoJS.SHA256(original_value).toString();
var to_encrypt = hash + original_value;

var password = prompt("Set password");

var salt = CryptoJS.lib.WordArray.random(128/8).toString();

var key = protect_key(password, salt);

var ciphertext = CryptoJS.AES.encrypt(to_encrypt, key);

document.activeElement.value = salt + ciphertext;
