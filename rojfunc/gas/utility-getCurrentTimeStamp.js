/**FUNCTION: GET CURRENT TIME MS
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|>>>>>>>>>>>>>>>--- FUNCTION: GET CURRENT TIME MS ---<<<<<<<<<<<<<<<<|
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
*/

function getCurrentTime_MS() {
  const currentTime = new Date().getTime();
  const currentTimeString = currentTime.toString();
  return currentTimeString;
}

function getCurrentIsoTimeStamp() {
  const currentTime = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3, hour12: false, timeZoneName: 'shortOffset' });
  const parts = formatter.formatToParts(currentTime);
  const currentIsoTimeStamp = `${parts[4].value}-${parts[0].value}-${parts[2].value}T${parts[6].value}:${parts[8].value}:${parts[10].value}.000${parts[12].value}`
  Logger.log(currentIsoTimeStamp);
  return currentIsoTimeStamp ;
}

