import type { DayObject } from '../store/GeneralContext';
import { getMonthName } from '../helpers';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';
import GeneralContext from '../store/GeneralContext';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface MonthCardProps {
 days: DayObject[];
 monthIdx: number;
}

const MonthCard = (props: MonthCardProps) => {
 const generalContext = useContext(GeneralContext);
 const currentMonth = generalContext.year[props.monthIdx];
 const amountSpent = generalContext.year[props.monthIdx].days.reduce(
  (acm, day) => {
   const tot = day.expenses.reduce((tot, exp) => (tot += exp.amount), 0);
   return acm + tot;
  },
  0
 );
 return (
  <c.Flex
   direction="column"
   justifyContent="center"
   p="6"
   border="1px"
   borderRadius="xl"
   bgColor={
    currentMonth.monthBudget - amountSpent > 0 ? 'green.300' : 'red.300'
   }
   color={currentMonth.monthBudget - amountSpent > 0 ? 'green.900' : 'red.900'}
  >
   <c.Heading size="lg">{getMonthName(props.monthIdx)}</c.Heading>
   <c.Heading fontSize="lg" my="5">
    Budget: {amountSpent.toFixed()}
   </c.Heading>
   <c.Flex justifyContent="center" alignItems="center">
    {currentMonth.monthBudget - amountSpent > 0 ? <FaPlus /> : <FaMinus />}
    <c.Heading fontSize="lg">
     {Math.abs(currentMonth.monthBudget - amountSpent).toFixed(2)}
    </c.Heading>
   </c.Flex>
  </c.Flex>
 );
};

export default MonthCard;
