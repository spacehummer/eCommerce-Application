function getTimestamp() {
  const date = new Date();

  const pad = (number) => String(number).padStart(2, '0');

  // prettier-ignore
  const dateParts = [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ];

  // prettier-ignore
  const timeParts = [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ];

  return `${dateParts.join('-')}_-_${timeParts.join('-')}`;
}

module.exports = { getTimestamp };
