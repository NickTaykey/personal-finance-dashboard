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
