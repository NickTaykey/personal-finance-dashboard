import GeneralContext, { DayObject, TagObject } from './GeneralContext';
import { useEffect, useState } from 'react';

function currentYearByMonth() {
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
    day: daysOfWeek[dayOfWeekIndex],
    expenses: [],
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
 const [tags, setTags] = useState<TagObject[]>([]);

 useEffect(() => {
  setYear(currentYearByMonth());
 }, []);

 return (
  <GeneralContext.Provider
   value={{
    year,
    tags,
    updateDayExpense(nMonth, nDay, newExpenseObject) {
     setYear((current) => {
      return current.map((month, monthIdx) => {
       return monthIdx + 1 === nMonth
        ? month.map((day, dayIdx) => {
           return dayIdx + 1 === nDay
            ? { ...day, expenses: [...day.expenses, newExpenseObject] }
            : day;
          })
        : month;
      });
     });
    },
    newTag(tag) {
     setTags((current) => [...current, tag]);
    },
   }}
  >
   {props.children}
  </GeneralContext.Provider>
 );
};

export default GeneralContextProvider;
