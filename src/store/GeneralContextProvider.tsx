import GeneralContext, {
 MonthObject,
 TagObject,
 DayObject,
} from './GeneralContext';
import {
 updateLocalStorage,
 genRandomYearData,
 localStorageId,
 genRandomTags,
 isColorDark,
} from '../helpers';
import { useEffect, useState } from 'react';

const GeneralContextProvider: React.FC<{
 children: React.ReactNode[] | React.ReactNode;
}> = (props) => {
 const [year, setYear] = useState<MonthObject[]>([]);
 const [tags, setTags] = useState<TagObject[]>([]);

 useEffect(() => {
  const localStorageSession = localStorage.getItem(localStorageId);

  if (localStorageSession) {
   const parsedSession = JSON.parse(localStorageSession) as {
    year: MonthObject[];
    tags: TagObject[];
   };
   setYear(parsedSession.year);
   setTags(parsedSession.tags);
   setNoTagObjectId(parsedSession.tags[0].id);
  } else {
   let generatedTags = genRandomTags();
   const generatedYear = genRandomYearData(generatedTags) as MonthObject[];
   generatedTags = [
    {
     id: crypto.randomUUID(),
     textColor: 'white',
     tagName: 'No Tag',
     bgColor: '#737373',
    },
    ...generatedTags,
   ];
   setNoTagObjectId(generatedTags[0].id);
   setTags(generatedTags);
   setYear(generatedYear);
   updateLocalStorage(generatedYear, generatedTags);
  }
 }, []);

 const [selectedDay, setSelectedDay] = useState<DayObject | null>(null);
 const [noTagObjectId, setNoTagObjectId] = useState<string | null>(null);

 return (
  <GeneralContext.Provider
   value={{
    noTagObjectId,
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
           return e.tagId === tagId
            ? { ...e, tagId: noTagObjectId as string }
            : e;
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
