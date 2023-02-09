export function getMonthName(monthNum: number) {
 const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
 ];
 return monthNames[monthNum];
}

export function isColorDark(color: string) {
 const [r, g, b] = color
  .substring(color.indexOf('(') + 1, color.length - 1)
  .split(', ')
  .map((n) => Number(n));
 const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
 if (luma < 140) return true;
 return false;
}

export function monthNameToNumber(month: string) {
 switch (month.toLowerCase()) {
  case 'jan':
   return 1;
  case 'feb':
   return 2;
  case 'mar':
   return 3;
  case 'apr':
   return 4;
  case 'may':
   return 5;
  case 'jun':
   return 6;
  case 'jul':
   return 7;
  case 'aug':
   return 8;
  case 'sep':
   return 9;
  case 'oct':
   return 10;
  case 'nov':
   return 11;
  case 'dec':
   return 12;
  default:
   return -1;
 }
}
