import * as c from '@chakra-ui/react';
import GeneralContext from './store/GeneralContext';
import React, { useContext, useRef, useState } from 'react';

const ExpenseForm = () => {
 const generalContext = useContext(GeneralContext);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [amountValue, setAmountValue] = useState<number>(0);
 const [descriptionValue, setDescriptionValue] = useState<string>('');
 const [tagNameValue, setTagNameValue] = useState<string>('');

 const addNewExpenseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  const tag = generalContext.tags.find((t) => tagNameValue === t.name);

  if (!tag) {
   setErrorMessage('Invalid Expense Tag');
  } else if (!amountValue || isNaN(amountValue)) {
   setErrorMessage('Invalid Expense Amount');
  } else {
   generalContext.addDayExpense(amountValue, tag, descriptionValue);
   setErrorMessage(null);
   setDescriptionValue('');
   setTagNameValue('');
   setAmountValue(0);
  }
 };

 return (
  <c.Accordion allowToggle mt="6">
   <c.AccordionItem>
    <h2>
     <c.AccordionButton>
      <c.Box as="span" flex="1" textAlign="left">
       New Daily Expense
      </c.Box>
      <c.AccordionIcon />
     </c.AccordionButton>
    </h2>
    <c.AccordionPanel pb={4}>
     {errorMessage && <c.Alert colorScheme="red">{errorMessage}</c.Alert>}
     <c.FormControl mb="3">
      <c.FormLabel>Expense Amount</c.FormLabel>
      <c.NumberInput
       defaultValue={15}
       precision={2}
       step={0.01}
       value={amountValue}
       onChange={(_, amount) => {
        if (amount && !isNaN(amount)) setAmountValue(amount);
       }}
      >
       <c.NumberInputField name="amount" />
       <c.NumberInputStepper>
        <c.NumberIncrementStepper />
        <c.NumberDecrementStepper />
       </c.NumberInputStepper>
      </c.NumberInput>
     </c.FormControl>
     <c.FormControl mb="3">
      <c.FormLabel>Expense Tag</c.FormLabel>
      <c.Select
       placeholder="Expense Tag"
       name="tag"
       onChange={(e) => setTagNameValue(e.currentTarget.value)}
       value={tagNameValue}
      >
       {generalContext.tags.map((t) => (
        <option value={t.name} key={crypto.randomUUID()}>
         {t.name}
        </option>
       ))}
      </c.Select>
     </c.FormControl>
     <c.FormControl mb="3">
      <c.FormLabel>Expense Description</c.FormLabel>
      <c.Input
       type="text"
       name="description"
       value={descriptionValue}
       onChange={(e) => setDescriptionValue(e.currentTarget.value)}
      />
      <c.FormHelperText>Optional</c.FormHelperText>
     </c.FormControl>
     <c.Button colorScheme="green" width="100%" onClick={addNewExpenseHandler}>
      Add
     </c.Button>
    </c.AccordionPanel>
   </c.AccordionItem>
  </c.Accordion>
 );
};

export default ExpenseForm;
