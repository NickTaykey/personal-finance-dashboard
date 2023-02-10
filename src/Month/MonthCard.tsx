import { FaPlus, FaMinus, FaExternalLinkAlt } from 'react-icons/fa';
import type { DayObject } from '../store/GeneralContext';
import GeneralContext from '../store/GeneralContext';
import { useNavigate } from 'react-router-dom';
import { getMonthName } from '../helpers';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

interface MonthCardProps {
 days: DayObject[];
 monthIdx: number;
}

const MonthCard = (props: MonthCardProps) => {
 const navigate = useNavigate();
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
   bgColor={
    currentMonth.monthBudget - amountSpent > 0 ? 'green.300' : 'red.300'
   }
   color={currentMonth.monthBudget - amountSpent > 0 ? 'green.900' : 'red.900'}
   borderRadius="xl"
   direction="column"
   border="1px"
   p="6"
  >
   <c.Flex alignItems="center" justifyContent="space-between">
    <c.Heading size="lg">{getMonthName(props.monthIdx)}</c.Heading>
    <c.Box _hover={{ cursor: 'pointer' }}>
     <FaExternalLinkAlt
      onClick={() => {
       navigate(`/months/${getMonthName(props.monthIdx).toLocaleLowerCase()}`);
      }}
     />
    </c.Box>
   </c.Flex>
   <c.Heading fontSize="lg" my="5" textAlign="left">
    Budget: {amountSpent.toFixed()}
   </c.Heading>
   <c.Flex alignItems="center">
    {currentMonth.monthBudget - amountSpent > 0 ? (
     <strong>+</strong>
    ) : (
     <strong>-</strong>
    )}
    <c.Heading fontSize="lg">
     {Math.abs(currentMonth.monthBudget - amountSpent).toFixed(2)}
    </c.Heading>
   </c.Flex>
  </c.Flex>
 );
};

export default MonthCard;
