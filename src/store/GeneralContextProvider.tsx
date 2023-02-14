import GeneralContext, {
 ExpenseObject,
 MonthObject,
 TagObject,
 DayObject,
} from './GeneralContext';
import { useEffect, useState } from 'react';
import { isColorDark } from '../helpers';
import { faker } from '@faker-js/faker';

function genRandomYearData(tags: TagObject[]) {
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

function genRandomTags() {
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

const updateLocalStorage = (year: MonthObject[], tags: TagObject[]) => {
 localStorage.setItem('pf-dashboard-session', JSON.stringify({ year, tags }));
};

const GeneralContextProvider: React.FC<{
 children: React.ReactNode[] | React.ReactNode;
}> = (props) => {
 const [year, setYear] = useState<MonthObject[]>([]);
 const [tags, setTags] = useState<TagObject[]>([]);

 useEffect(() => {
  const localStorageSession = localStorage.getItem('pf-dashboard-session');

  if (localStorageSession) {
   const parsedSession = JSON.parse(localStorageSession) as {
    year: MonthObject[];
    tags: TagObject[];
   };
   setYear(parsedSession.year);
   setTags(parsedSession.tags);
  } else {
   const generatedTags = genRandomTags();
   const generatedYear = genRandomYearData(generatedTags) as MonthObject[];
   generatedTags.push({
    id: crypto.randomUUID(),
    textColor: 'white',
    tagName: 'No Tag',
    bgColor: '#737373',
   });
   setTags(genRandomTags);
   setYear(generatedYear);
   localStorage.setItem(
    'pf-dashboard-session',
    JSON.stringify({ tags: generatedTags, year: generatedYear })
   );
  }
 }, []);

 const [selectedDay, setSelectedDay] = useState<DayObject | null>(null);

 return (
  <GeneralContext.Provider
   value={{
    setSelectedDay,
    selectedDay,
    year,
    tags,
    updateBudget(monthIdx, newBudget) {
     setYear((current) => {
      const ny = current.map((month, idx) => {
       return idx === monthIdx ? { ...month, monthBudget: newBudget } : month;
      });
      updateLocalStorage(ny, tags);
      return ny;
     });
    },
    updateTag(tagId, newTag) {
     setTags((tags) => {
      const newTags = tags.map((t) =>
       t.id === tagId
        ? {
           ...t,
           ...newTag,
           textColor: isColorDark(newTag.bgColor) ? 'white' : 'black',
          }
        : t
      );
      updateLocalStorage(year, newTags);
      return newTags;
     });
    },
    deleteTag(tagId) {
     let newTags: TagObject[];
     setTags((current) => {
      newTags = current.filter((t) => t.id !== tagId);
      return newTags;
     });
     setYear((current) => {
      const ny = current.map((month) => {
       return {
        ...month,
        days: month.days.map((d) => {
         return {
          ...d,
          expenses: d.expenses.map((e) => {
           return e.tagId === tagId ? { ...e, tag: null } : e;
          }),
         };
        }),
       };
      });
      updateLocalStorage(ny, newTags);
      return ny;
     });
    },
    deleteDayExpense(expenseId) {
     setYear((current) => {
      const ny = current.map((month, monthId) => {
       const days =
        monthId === selectedDay!.monthIdx
         ? month.days.map((day) => {
            if (day.id === selectedDay!.id) {
             const newSelectedDay = {
              ...day,
              expenses: day.expenses.filter((e) => e.id !== expenseId),
             };
             setSelectedDay(newSelectedDay);
             return newSelectedDay;
            }
            return day;
           })
         : month.days;
       return { ...month, days };
      });
      updateLocalStorage(ny, tags);
      return ny;
     });
    },
    updateDayExpense(expense) {
     setYear((current) => {
      const ny = current.map((month, monthId) => {
       return monthId === selectedDay!.monthIdx
        ? {
           ...month,
           days: month.days.map((day) => {
            if (day.id === selectedDay!.id) {
             const newSelectedDay = {
              ...day,
              expenses: day.expenses.map((e) => {
               return e.id === expense.id ? { ...expense } : e;
              }),
             };
             setSelectedDay(newSelectedDay);
             return newSelectedDay;
            }
            return day;
           }),
          }
        : month;
      });
      updateLocalStorage(ny, tags);
      return ny;
     });
    },
    addDayExpense(amount, tagId) {
     setYear((current) => {
      const ny = current.map((month, monthIdx) => {
       return monthIdx === selectedDay!.monthIdx
        ? {
           ...month,
           days: month.days.map((day) => {
            if (day.id === selectedDay!.id) {
             const newSelectedDay = {
              ...day,
              expenses: [
               ...day.expenses,
               {
                id: crypto.randomUUID(),
                tagId,
                amount,
               },
              ],
             };
             setSelectedDay(newSelectedDay);
             return newSelectedDay;
            }
            return day;
           }),
          }
        : month;
      });
      updateLocalStorage(ny, tags);
      return ny;
     });
    },
    newTag(tag) {
     setTags((current) => {
      const tags = [
       ...current,
       {
        ...tag,
        id: crypto.randomUUID(),
        textColor: isColorDark(tag.bgColor) ? 'white' : 'black',
       },
      ];
      updateLocalStorage(year, tags);
      return tags;
     });
    },
   }}
  >
   {props.children}
  </GeneralContext.Provider>
 );
};

export default GeneralContextProvider;
