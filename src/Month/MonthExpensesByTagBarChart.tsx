import {
 findNumOfExpensesLastDay,
 TagExpensesArray,
 getMonthName,
} from '../helpers';
import GeneralContext, { MonthObject } from '../store/GeneralContext';
import { VictoryChart, VictoryBar, VictoryTooltip } from 'victory';
import { useContext, useState } from 'react';
import * as c from '@chakra-ui/react';

interface MonthExpensesByTagBarChartProps {
 monthObject: MonthObject;
}

const MonthExpensesByTagBarChart = (props: MonthExpensesByTagBarChartProps) => {
 const generalContext = useContext(GeneralContext);

 const [selectedTagId, setSelectedTagId] = useState<string | null>(
  generalContext.tags[0].id
 );
 const selectedTagObject = generalContext.tags.find(
  (t) => t.id === selectedTagId
 );

 const tagExpenses = props.monthObject.days.reduce((acm, day) => {
  const totSpentOnTagByDay: number = day.expenses.reduce(
   (acm, exp) => (exp.tagId === selectedTagId ? acm + exp.amount : acm),
   0
  );
  if (totSpentOnTagByDay > 0) {
   return [
    ...acm,
    {
     y: totSpentOnTagByDay,
     x: day.monthDayNumber,
     label: `€${totSpentOnTagByDay.toFixed(2)} ${
      day.monthDayNumber
     } ${getMonthName(day.monthIdx)}`,
    },
   ];
  }
  return acm;
 }, [] as TagExpensesArray);

 return (
  <c.Box flexGrow="1">
   <c.FormControl>
    <c.FormLabel textAlign="center" mb="3">
     Daily Expense Trends by Tag
    </c.FormLabel>
    <c.Select
     placeholder="Select Tag"
     onChange={(e) => setSelectedTagId(e.currentTarget.value)}
     defaultValue={generalContext.tags[0].id}
    >
     {generalContext.tags.map((t) => (
      <option key={`bar-chart-tag-${t.id}`} value={t.id}>
       {t.tagName}
      </option>
     ))}
    </c.Select>
   </c.FormControl>
   {selectedTagId && selectedTagId.length && (
    <VictoryChart>
     <VictoryBar
      domain={{
       x: [
        1,
        props.monthObject.days.length + findNumOfExpensesLastDay(tagExpenses),
       ],
       y: [0, tagExpenses.reduce((acm, exp) => (acm > exp.y ? acm : exp.y), 0)],
      }}
      labelComponent={<VictoryTooltip />}
      style={{
       data: {
        fill: selectedTagObject
         ? selectedTagObject.bgColor
         : generalContext.tags[0].bgColor,
        width: 10,
       },
      }}
      alignment="start"
      data={tagExpenses}
     />
    </VictoryChart>
   )}
  </c.Box>
 );
};

export default MonthExpensesByTagBarChart;
