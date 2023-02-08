import GeneralContext, {
 TagObject,
 YearObject,
 MonthObject,
} from './GeneralContext';
import { useEffect, useState } from 'react';

const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const GeneralContextProvider: React.FC<{
 children: React.ReactNode[] | React.ReactNode;
}> = (props) => {
 const [year, setYear] = useState<YearObject>({ months: [] });
 const [tags, setTags] = useState<TagObject[]>([]);

 useEffect(() => {
  const months = daysInMonth.map((nDays) => {
   return { days: new Array(nDays).fill({ expenses: [] }) };
  }) as MonthObject[];

  setYear({ months });
 }, []);

 return (
  <GeneralContext.Provider
   value={{
    year,
    tags,
    updateDayExpense(nMonth, nDay, newExpenseObject) {
     setYear((current) => {
      return {
       months: current.months.map((month, monthIdx) => {
        return monthIdx + 1 === nMonth
         ? {
            days: month.days.map((day, dayIdx) => {
             return dayIdx + 1 === nDay
              ? { expenses: [...day.expenses, newExpenseObject] }
              : day;
            }),
           }
         : month;
       }),
      };
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
