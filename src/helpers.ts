import {
 ExpenseObject,
 MonthObject,
 DayObject,
 TagObject,
} from './store/GeneralContext';
import { ESMap } from 'typescript';
import { faker } from '@faker-js/faker';

export const localStorageId = 'pf-dashboard-session';

export type TagExpensesArray = {
 x: number;
 y: number;
 label: string;
}[];

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

export function getMonthName(monthNum: number) {
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

export function getMonthNumber(month: string) {
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

export function findNumOfExpensesLastDay(arr: TagExpensesArray) {
 if (arr.length === 0) return 0;
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

export function generateTagNamesMap(tags: TagObject[]) {
 const tagsMap = new Map<string, TagObject>();
 for (const tag of tags) tagsMap.set(tag.id, tag);
 return tagsMap;
}

export function convertYearToCSV(
 year: MonthObject[],
 tags: TagObject[]
): string {
 const tagNamesByIdMap = generateTagNamesMap(tags);

 const monthRows = year.map((month, monthIdx) => {
  return convertMonthToCSV(month, monthIdx, tags, tagNamesByIdMap);
 });

 return monthRows.join('\n');
}

export function convertMonthToCSV(
 month: MonthObject,
 monthIdx: number,
 tags: TagObject[],
 tagNamesByIdMap?: ESMap<string, TagObject>
) {
 const header = ['week day', 'day', 'amount', 'tag name'];

 if (!tagNamesByIdMap) {
  tagNamesByIdMap = generateTagNamesMap(tags);
 }

 const monthHeader = [
  'Month:',
  getMonthName(monthIdx),
  'Budget (€):',
  month.monthBudget,
 ];

 let tot = 0;

 const monthRows = month.days.flatMap(({ day, monthDayNumber, expenses }) => {
  const dayRows = expenses.map(({ amount, tagId }) => {
   tot += amount;
   return [
    day,
    monthDayNumber,
    amount,
    tagNamesByIdMap!.get(tagId === null ? 'no_tag' : tagId)?.tagName,
   ];
  });
  return dayRows;
 });

 const rows = [monthHeader, header, ...monthRows, ['Tot (€)', tot.toFixed(2)]];
 const csvRows = rows.map((dayRow) => dayRow.join(',') + '\n').join('') + '\n';

 return csvRows;
}

export function divideArray(array: DayObject[]) {
 const chunkSize = Math.ceil(array.length / 4);
 const chunks = [];
 for (let i = 0; i < array.length; i += chunkSize) {
  chunks.push(array.slice(i, i + chunkSize));
 }
 return chunks;
}

export function genRandomYearData(tags: TagObject[]) {
 const now = new Date();
 const currentYear = now.getFullYear();
 const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 const months = [];

 for (let i = 0; i < 12; i++) {
  let daysInCurrentMonth = [];
  const monthStart = new Date(currentYear, i, 1);
  const daysInCurrMonth = daysInMonth[i];

  for (let j = 1; j <= daysInCurrMonth; j++) {
   const dayOfWeekIndex = (monthStart.getDay() + j - 1) % 7;
   const expenses: ExpenseObject[] = [];
   for (let n = 0; n < Math.trunc(Math.random() * 30); ++n) {
    expenses.push({
     amount: Number((Math.random() * 10).toFixed(2)),
     id: crypto.randomUUID(),
     tagId: tags[Math.floor(Math.random() * tags.length)].id,
    });
   }

   daysInCurrentMonth.push({
    id: crypto.randomUUID(),
    day: daysOfWeek[dayOfWeekIndex],
    monthDayNumber: j,
    monthIdx: i,
    expenses,
   });
  }

  months.push({
   monthBudget: Math.trunc(Math.random() * 3000),
   days: daysInCurrentMonth,
  });
 }

 return months;
}

export function genRandomTags() {
 const n = Math.trunc(Math.random() * 10 + 3);
 const tags: TagObject[] = [];
 for (let i = 0; i < n; i++) {
  const bgColor = faker.color.rgb();
  tags.push({
   textColor: isColorDark(bgColor) ? 'white' : 'black',
   tagName: `${faker.music.genre().slice(0, 5)}`,
   id: crypto.randomUUID(),
   bgColor,
  });
 }
 return tags;
}

export const updateLocalStorage = (year: MonthObject[], tags: TagObject[]) => {
 localStorage.setItem(localStorageId, JSON.stringify({ year, tags }));
};
