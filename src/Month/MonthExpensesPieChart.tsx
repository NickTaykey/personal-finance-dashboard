import GeneralContext, { MonthObject } from '../store/GeneralContext';
import { VictoryLabel, VictoryPie } from 'victory';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

interface MonthExpensesByChartProps {
 monthObject: MonthObject;
}

const MonthExpensesByChart = (props: MonthExpensesByChartProps) => {
 const [isLargerThan500] = c.useMediaQuery('(min-width: 500px)');
 const generalContext = useContext(GeneralContext);

 const expensesByTagPieChartData = generalContext.tags.map((tag) => {
  const totTag = props.monthObject.days.reduce((acm, day) => {
   const totDay = day.expenses.reduce(
    (acm, exp) => (exp.tagId === tag.id ? acm + exp.amount : acm),
    0
   );
   return acm + totDay;
  }, 0);
  return { x: tag.tagName, y: totTag };
 });

 return (
  <c.Flex
   flexDirection="column"
   justifyContent="center"
   alignItems="center"
   w={isLargerThan500 ? '50%' : '100%'}
  >
   <c.Text fontSize="md" fontWeight="medium" textAlign="center">
    Distribution of Expenses by Tag
   </c.Text>
   <c.Flex flexGrow="2" justify="center" alignItems="center">
    <VictoryPie
     colorScale={generalContext.tags.map((t) => t.bgColor)}
     data={expensesByTagPieChartData}
     width={600}
     height={400}
     labelComponent={<VictoryLabel style={{ fontSize: 20 }} />}
    />
   </c.Flex>
  </c.Flex>
 );
};

export default MonthExpensesByChart;
