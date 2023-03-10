import GeneralContext from '../store/GeneralContext';
import { VictoryLabel, VictoryPie } from 'victory';
import { useParams } from 'react-router-dom';
import { getMonthNumber } from '../helpers';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const MonthExpensesByChart = () => {
 const { month } = useParams();
 const [isLargerThan500] = c.useMediaQuery('(min-width: 500px)');
 const generalContext = useContext(GeneralContext);

 const currentMonth = generalContext.year[getMonthNumber(month!) - 1];
 const pieChartData = generalContext.tags.reduce((acm, tag) => {
  const totTag = currentMonth.days.reduce((acm, day) => {
   const totDay = day.expenses.reduce(
    (acm, exp) => (exp.tagId === tag.id ? acm + exp.amount : acm),
    0
   );
   return acm + totDay;
  }, 0);
  if (totTag === 0) return acm;
  return [...acm, { x: tag.tagName, y: totTag }];
 }, [] as { x: string; y: number }[]);

 return (
  <c.Flex
   flexDirection="column"
   justifyContent="center"
   alignItems="center"
   w={isLargerThan500 ? '50%' : '100%'}
  >
   <c.Text fontSize="md" fontWeight="medium" textAlign="center" my="3">
    Distribution of Expenses by Tag
   </c.Text>
   <c.Box>
    <c.Flex flexGrow="2" justify="center" alignItems="center">
     <VictoryPie
      labelComponent={<VictoryLabel style={{ fontSize: 12.5 }} angle={45} />}
      colorScale={generalContext.tags.map((t) => t.bgColor)}
      data={pieChartData}
      width={600}
      height={400}
     />
    </c.Flex>
   </c.Box>
  </c.Flex>
 );
};

export default MonthExpensesByChart;
