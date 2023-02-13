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

function hexToRgb(hex: string) {
 const r = parseInt(hex.substring(1, 3), 16);
 const g = parseInt(hex.substring(3, 5), 16);
 const b = parseInt(hex.substring(5, 7), 16);
 return [r, g, b];
}

export function isColorDark(hex: string) {
 const rgb = hexToRgb(hex);
 const brightness = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
 return brightness < 128;
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

export type TagExpensesArray = {
 x: number;
 y: number;
 label: string;
}[];

export function findNumOfExpensesLastDay(arr: TagExpensesArray) {
 let maxValue = arr[arr.length - 1].x;
 let count = 1;

 for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i].x === maxValue) {
   count++;
  } else {
   break;
  }
 }

 return count;
}
