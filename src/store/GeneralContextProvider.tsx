import GeneralContext, { DayObject, TagObject } from './GeneralContext';
import { useEffect, useState } from 'react';

function currentYearByMonth(tags: TagObject[]) {
 const now = new Date();
 const currentYear = now.getFullYear();
 const months = [];
 const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

 for (let i = 0; i < 12; i++) {
  let daysInCurrentMonth = [];
  const monthStart = new Date(currentYear, i, 1);
  const daysInCurrMonth = daysInMonth[i];

  for (let j = 1; j <= daysInCurrMonth; j++) {
   const dayOfWeekIndex = (monthStart.getDay() + j - 1) % 7;
   daysInCurrentMonth.push({
    id: crypto.randomUUID(),
    day: daysOfWeek[dayOfWeekIndex],
    monthDayIdx: j,
    monthIdx: i,
    expenses: [
     {
      id: crypto.randomUUID(),
      amount: 19.99,
      description: 'standard description',
      tag: tags[0],
     },
     {
      id: crypto.randomUUID(),
      amount: 15.0,
      description: 'standard description',
      tag: tags[1],
     },
     {
      id: crypto.randomUUID(),
      amount: 9.99,
      description: 'standard description',
      tag: tags[2],
     },
    ],
   });
  }

  months.push(daysInCurrentMonth);
 }

 return months;
}

const GeneralContextProvider: React.FC<{
 children: React.ReactNode[] | React.ReactNode;
}> = (props) => {
 const [year, setYear] = useState<DayObject[][]>([]);
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
  setYear(currentYearByMonth(tags) as DayObject[][]);
 }, []);

 const [selectedDay, setSelectedDay] = useState<DayObject | null>(null);

 return (
  <GeneralContext.Provider
   value={{
    selectedDay,
    setSelectedDay,
    year,
    tags,
    updateDayExpense(expense) {
     setYear((current) => {
      return current.map((month, monthId) => {
       return monthId === selectedDay!.monthIdx
        ? month.map((day) => {
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
          })
        : month;
      });
     });
    },

    addDayExpense(amount, tag, description) {
     setYear((current) => {
      return current.map((month, monthIdx) => {
       return monthIdx === selectedDay!.monthIdx
        ? month.map((day) => {
           if (day.id === selectedDay!.id) {
            const newSelectedDay = {
             ...day,
             expenses: [
              ...day.expenses,
              { id: crypto.randomUUID(), tag, description, amount },
             ],
            };
            setSelectedDay(newSelectedDay);
            return newSelectedDay;
           }
           return day;
          })
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
