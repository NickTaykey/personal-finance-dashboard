import { VictoryChart, VictoryBar, VictoryTooltip } from 'victory';
import { TagExpensesArray, getMonthName } from '../helpers';
import { MonthObject } from '../store/GeneralContext';
import * as c from '@chakra-ui/react';

interface MonthExpensesByBarChartProps {
 monthObject: MonthObject;
}
const MonthExpensesBarChart = (props: MonthExpensesByBarChartProps) => {
 const monthExpenses = props.monthObject.days.reduce((acm, day) => {
  const totSpentCurrentDay: number = day.expenses.reduce(
   (acm, exp) => acm + exp.amount,
   0
  );
  return [
   ...acm,
   {
    y: totSpentCurrentDay,
    x: day.monthDayNumber,
    label: `€${totSpentCurrentDay.toFixed(2)} ${
     day.monthDayNumber
    } ${getMonthName(day.monthIdx)}`,
   },
  ];
 }, [] as TagExpensesArray);

 console.log(monthExpenses);

 return (
  <c.Flex
   justifyContent="space-between"
   flexDirection="column"
   flexGrow="1"
   mt={[10, 0]}
  >
   <c.Heading fontSize="md" fontWeight="medium" textAlign="center">
    General Daily Expense Trend
   </c.Heading>
   <VictoryChart>
    <VictoryBar
     domain={{
      x: [1, monthExpenses.length + 1],
      y: [
       0,
       monthExpenses.reduce((acm, exp) => (acm > exp.y ? acm : exp.y), 0),
      ],
     }}
     labelComponent={<VictoryTooltip />}
     style={{ data: { width: 10 } }}
     alignment="start"
     data={monthExpenses}
    />
   </VictoryChart>
  </c.Flex>
 );
};

export default MonthExpensesBarChart;
