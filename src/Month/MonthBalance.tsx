import GeneralContext from '../store/GeneralContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useContext, useState } from 'react';
import * as c from '@chakra-ui/react';

interface MonthBalanceProps {
 currentMonthIdx: number;
}

const MonthBalance = (props: MonthBalanceProps) => {
 const [budgetValue, setBudgetValue] = useState(0);
 const generalContext = useContext(GeneralContext);
 const amountSpent = generalContext.year[props.currentMonthIdx].days.reduce(
  (acm, day) => {
   const tot = day.expenses.reduce((tot, exp) => (tot += exp.amount), 0);
   return acm + tot;
  },
  0
 );
 return (
  <c.Flex mt="5" direction="column">
   <c.HStack alignItems="center" spacing="4">
    <c.Heading size="md" textAlign="left">
     Spent: {amountSpent.toFixed(2)}
    </c.Heading>
    {!!budgetValue && (
     <c.Tag
      size="lg"
      variant="subtle"
      colorScheme={budgetValue - amountSpent > 0 ? 'green' : 'red'}
     >
      <c.TagLeftIcon
       boxSize="12px"
       as={budgetValue - amountSpent > 0 ? FaPlus : FaMinus}
      />
      <c.TagLabel>{Math.abs(budgetValue - amountSpent).toFixed(2)}</c.TagLabel>
     </c.Tag>
    )}
   </c.HStack>
   <c.FormControl width={{ sm: '100%', md: '20%' }} my="2">
    <c.FormLabel>Your monthly Budget: </c.FormLabel>
    <c.NumberInput
     defaultValue={0}
     min={0}
     step={0.01}
     onChange={(_, value) => setBudgetValue(Number(value))}
    >
     <c.NumberInputField />
     <c.NumberInputStepper>
      <c.NumberIncrementStepper />
      <c.NumberDecrementStepper />
     </c.NumberInputStepper>
    </c.NumberInput>
   </c.FormControl>
  </c.Flex>
 );
};

export default MonthBalance;
