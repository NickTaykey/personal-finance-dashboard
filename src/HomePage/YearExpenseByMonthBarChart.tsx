import { VictoryChart, VictoryBar, VictoryTooltip } from 'victory';
import GeneralContext from '../store/GeneralContext';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const YearExpenseByMonthBarChart = () => {
 const generalContext = useContext(GeneralContext);
 const chartData = generalContext.year.map((month, idx) => {
  const totSpent = month.days.reduce(
   (acm, day) => acm + day.expenses.reduce((acm, exp) => acm + exp.amount, 0),
   0
  );
  return {
   payload: {
    color: totSpent - month.monthBudget > 0 ? '#FC8181' : '#68D391',
   },
   y: totSpent,
   x: idx + 1,
  };
 });

 return (
  <c.Flex justifyContent="center" alignItems="center" flexDirection="column">
   <c.Heading fontSize="md" fontWeight="medium" textAlign="center">
    General Daily Expense Trend
   </c.Heading>
   {chartData.length ? (
    <VictoryChart>
     <VictoryBar
      domain={{
       x: [1, 13],
       y: [0, chartData.reduce((acm, exp) => (acm > exp.y ? acm : exp.y), 0)],
      }}
      labelComponent={<VictoryTooltip />}
      style={{
       data: {
        width: 10,
        fill: (d) => d.datum.payload.color,
       },
      }}
      data={chartData}
      alignment="start"
     />
    </VictoryChart>
   ) : (
    <c.Spinner
     mt="10"
     thickness="4px"
     speed="0.65s"
     emptyColor="gray.200"
     color="blue.500"
     size="xl"
    />
   )}
  </c.Flex>
 );
};

export default YearExpenseByMonthBarChart;
