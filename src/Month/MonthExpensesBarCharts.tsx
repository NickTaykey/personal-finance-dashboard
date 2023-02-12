import MonthExpensesByTagBarChart from './MonthExpensesByTagBarChart';
import MonthExpensesBarChart from './MonthExpensesBarChart';
import { MonthObject } from '../store/GeneralContext';
import * as c from '@chakra-ui/react';

interface MonthExpensesByTagBarChartProps {
 monthObject: MonthObject;
}

const MonthExpensesBarCharts = (props: MonthExpensesByTagBarChartProps) => {
 return (
  <c.Flex
   mt="5"
   width={['100%', '90%']}
   height={['100vh', '45vh']}
   flexDirection={['column', 'row']}
   ml={['0', '5']}
  >
   <MonthExpensesByTagBarChart monthObject={props.monthObject} />
   <MonthExpensesBarChart monthObject={props.monthObject} />
  </c.Flex>
 );
};

export default MonthExpensesBarCharts;
