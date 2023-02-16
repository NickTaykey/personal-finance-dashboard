import {
 findNumOfExpensesLastDay,
 generateTagNamesMap,
 TagExpensesArray,
 getMonthName,
} from '../helpers';
import {
 VictoryContainer,
 VictoryTooltip,
 VictoryChart,
 VictoryBar,
} from 'victory';
import GeneralContext, { MonthObject } from '../store/GeneralContext';
import { useContext, useState } from 'react';
import * as c from '@chakra-ui/react';

interface MonthExpensesByTagBarChartProps {
 monthObject: MonthObject;
}

const MonthExpensesByTagBarChart = (props: MonthExpensesByTagBarChartProps) => {
 const generalContext = useContext(GeneralContext);

 const [selectedTagId, setSelectedTagId] = useState<string | null>(
  generalContext.tags.at(-1)!.id
 );

 const selectedTagObject = selectedTagId
  ? generateTagNamesMap(generalContext.tags).get(selectedTagId)
  : null;

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
  <c.Box flexGrow="2">
   <c.FormControl>
    <c.FormLabel textAlign="center" mb="3">
     Daily Expense Trends by Tag
    </c.FormLabel>
    <c.Select
     placeholder="Select Tag"
     onChange={(e) => setSelectedTagId(e.currentTarget.value)}
     defaultValue={selectedTagId || generalContext.tags[0].id}
    >
     {generalContext.tags.map((t) => (
      <option key={`bar-chart-tag-${t.id}`} value={t.id}>
       {t.tagName}
      </option>
     ))}
    </c.Select>
   </c.FormControl>
   <VictoryChart
    containerComponent={<VictoryContainer style={{ height: '80%' }} />}
   >
    <VictoryBar
     domain={{
      x: [
       1,
       props.monthObject.days.length +
        (tagExpenses.length > 0 ? findNumOfExpensesLastDay(tagExpenses) : 0),
      ],
      y: [
       0,
       tagExpenses.reduce((acm, exp) => (acm > exp.y ? acm : exp.y), 0) || 100,
      ],
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
  </c.Box>
 );
};

export default MonthExpensesByTagBarChart;
