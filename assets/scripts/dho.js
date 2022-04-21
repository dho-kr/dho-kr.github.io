function $(selecter) {
  return document.querySelector(selecter);
}

function parseDate(min) {
  const days = Math.floor(min / 60 / 24);
  const hours = Math.floor((min - (days * 60 * 24)) / 60);
  const mins = min - (days * 60 * 24) - (hours * 60);

  const daysStr = days;
  const hourStr = (hours > 9) ? hours : '0' + hours
  const minStr = (mins > 9) ? mins : '0' + mins

  return daysStr + '일 ' + hourStr + '시간 ' + Math.ceil(minStr) + '분'
}
