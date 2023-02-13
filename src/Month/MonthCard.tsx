import type { DayObject } from '../store/GeneralContext';
import GeneralContext from '../store/GeneralContext';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getMonthName, TagExpensesArray } from '../helpers';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';

interface MonthCardProps {
 days: DayObject[];
 monthIdx: number;
}

const MonthCard = (props: MonthCardProps) => {
 const navigate = useNavigate();
 const generalContext = useContext(GeneralContext);
 const currentMonth = generalContext.year[props.monthIdx];
 let amountSpent = 0;

 const barsData = generalContext.year[props.monthIdx].days.reduce(
  (acm, day) => {
   const tot = day.expenses.reduce((tot, exp) => (tot += exp.amount), 0);
   amountSpent += tot;
   if (tot === 0) return acm;
   return [...acm, { x: day.monthDayNumber, y: tot }];
  },
  [] as { x: number; y: number }[]
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
   <VictoryBar data={barsData} width={500} height={200} />
  </c.Flex>
 );
};

export default MonthCard;
