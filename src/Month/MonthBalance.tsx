import GeneralContext from '../store/GeneralContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useContext, useState } from 'react';
import * as c from '@chakra-ui/react';

interface MonthBalanceProps {
 currentMonthIdx: number;
}

const MonthBalance = (props: MonthBalanceProps) => {
 const generalContext = useContext(GeneralContext);
 const currentMonth = generalContext.year[props.currentMonthIdx];
 const [budgetValue, setBudgetValue] = useState(currentMonth.monthBudget);
 const [errorAlert, setErrorAlert] = useState<string | null>(null);
 const amountSpent = generalContext.year[props.currentMonthIdx].days.reduce(
  (acm, day) => {
   const tot = day.expenses.reduce((tot, exp) => (tot += exp.amount), 0);
   return acm + tot;
  },
  0
 );

 const handleBudgetChange = (_: unknown, value: number) => {
  const newBudget = Number(value);
  if (isNaN(newBudget)) {
   setErrorAlert('Invalid budget value');
  } else {
   setBudgetValue(newBudget);
   generalContext.updateBudget(props.currentMonthIdx, Number(value));
   setErrorAlert(null);
  }
 };

 return (
  <c.Flex mt="5" direction="column" m="5">
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
    {errorAlert && <c.Alert colorScheme="red">{errorAlert}</c.Alert>}
    <c.FormLabel>Your monthly Budget: </c.FormLabel>
    <c.NumberInput
     min={0}
     step={0.01}
     onChange={handleBudgetChange}
     value={budgetValue}
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
