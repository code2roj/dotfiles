
/**FUNCTION: GENERATE ALPHA NUMERIC STRING
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|>>>>>>>>--- FUNCTION: GENERATE ALPHA NUMERIC STRING ---<<<<<<<<<<<<<|
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
*/
function generateRandomAlphanumericString(length) {
  if (typeof length !== 'number' || length <= 0) {
    Logger.log("Error: Length must be a positive number.");
    return "";
  }

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}