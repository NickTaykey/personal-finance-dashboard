import GeneralContext, {
 DayObject,
 ExpenseObject,
 MonthObject,
 TagObject,
} from './GeneralContext';
import { useEffect, useState } from 'react';

function currentYearByMonth(tags: TagObject[]) {
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
     description: 'N/A',
     tag: tags[Math.floor(Math.random() * tags.length)],
    });
   }
   daysInCurrentMonth.push({
    id: crypto.randomUUID(),
    day: daysOfWeek[dayOfWeekIndex],
    monthDayIdx: j,
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

const GeneralContextProvider: React.FC<{
 children: React.ReactNode[] | React.ReactNode;
}> = (props) => {
 const [year, setYear] = useState<MonthObject[]>([]);
 const [tags, setTags] = useState<TagObject[]>([
  {
   name: 'Food',
   bgColor: 'coral',
   textColor: 'black',
   id: crypto.randomUUID(),
  },
  {
   name: 'Uber',
   bgColor: 'cyan',
   textColor: 'black',
   id: crypto.randomUUID(),
  },
  {
   name: 'Education',
   bgColor: 'green',
   textColor: 'white',
   id: crypto.randomUUID(),
  },
 ]);

 useEffect(() => {
  setYear(currentYearByMonth(tags) as MonthObject[]);
 }, [tags]);

 const [selectedDay, setSelectedDay] = useState<DayObject | null>(null);

 return (
  <GeneralContext.Provider
   value={{
    selectedDay,
    setSelectedDay,
    year,
    tags,
    updateBudget(monthIdx, newBudget) {
     setYear((current) =>
      current.map((month, idx) => {
       return idx === monthIdx ? { ...month, monthBudget: newBudget } : month;
      })
     );
    },
    deleteTag(tagId) {
     setTags((current) => current.filter((t) => t.id !== tagId));
     setYear((current) => {
      return current.map((month) => {
       return {
        ...month,
        days: month.days.map((d) => {
         return {
          ...d,
          expenses: d.expenses.map((e) => {
           return e.tag?.id === tagId ? { ...e, tag: null } : e;
          }),
         };
        }),
       };
      });
     });
    },
    deleteDayExpense(expenseId) {
     setYear((current) => {
      return current.map((month, monthId) => {
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
     });
    },
    updateDayExpense(expense) {
     setYear((current) => {
      return current.map((month, monthId) => {
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
     });
    },
    addDayExpense(amount, tag, description) {
     setYear((current) => {
      return current.map((month, monthIdx) => {
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
                tag,
                description: description || 'N/A',
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
     });
    },
    newTag(tag) {
     setTags((current) => [...current, { ...tag, id: crypto.randomUUID() }]);
    },
   }}
  >
   {props.children}
  </GeneralContext.Provider>
 );
};

export default GeneralContextProvider;
