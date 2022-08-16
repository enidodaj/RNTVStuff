export const truncateHtml = (string: any, length: number, customStyles: String = '') => {
  if (typeof string === null) {
    return null;
  }

  const noHtml = string.replace(/<[^>]*>/g, '');

  if (noHtml.length <= length) {
    return `<div style="${customStyles}">${string}</div>`;
  }

  if (noHtml.length === string.length) {
    return `<div style="${customStyles}">${string.substring(0, length).trim()}...</div>`;
  }

  const substrings = string.split(/(<[^>]*>)/g).filter(Boolean);

  let count = 0;
  let truncated = [];
  for (let i = 0; i < substrings.length; i++) {
    let substr = substrings[i];
    if (!substr.startsWith("<")) {
      if (count > length) {
        continue;
      } else if (substr.length > (length - count - 1)) {
        truncated.push(substr.substring(0, (length - count) - 1) + '...');
      } else {
          truncated.push(substr);
      }
      count += substr.length;
    } else {
      truncated.push(substr);
    }
  }

  return `<div style="${customStyles}">${truncated.join('')}</div>`;
}

export const dateFormatter: (date: string | Date, format?: 'yyyy' | 'long' | 'longWithHour') => string | undefined = (date, format) => {
  const dateToFormat = new Date(date);

  if (format.toLowerCase() === 'yyyy') {
    return new Intl.DateTimeFormat('en', {year: 'numeric'}).format(dateToFormat);
  } else if (format === 'long') {
    return new Date(date).toLocaleDateString('en-us', {weekday: 'short',  year: 'numeric', month: 'short', day: 'numeric'})
  } else if (format === 'longWithHour') {
    return `${new Date(date).toLocaleDateString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}`
  } else {
    return dateToFormat.toLocaleDateString();
  }
}

export const dayScheduleFormatter = (days: Array<String>) => {
  const formattedDays = days.join(', ');
  if (!days.length) {
    return '';
  } else if (formattedDays.startsWith('Monday', 0) && formattedDays.endsWith('Friday') && days.length === 5) {
    return 'Weekdays';
  } else if (formattedDays.startsWith('Monday', 0) && formattedDays.endsWith('Sunday') && days.length === 7) {
    return 'Daily';
  } else {
    return formattedDays;
  }
}