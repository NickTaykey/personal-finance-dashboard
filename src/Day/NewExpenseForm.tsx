import GeneralContext from '../store/GeneralContext';
import React, { useContext, useState } from 'react';
import { generateTagNamesMap } from '../helpers';
import { FaPlus } from 'react-icons/fa';
import * as c from '@chakra-ui/react';

const NewExpenseForm = () => {
 const generalContext = useContext(GeneralContext);
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [amountValue, setAmountValue] = useState<number>(0);
 const [tagId, setTagId] = useState<string>(generalContext.noTagObjectId!);

 const addNewExpenseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  const tag = tagId
   ? generateTagNamesMap(generalContext.tags).get(tagId)
   : null;
  if (!tag) {
   setErrorMessage('Invalid Expense Tag');
  } else if (!amountValue || isNaN(amountValue)) {
   setErrorMessage('Invalid Expense Amount');
  } else {
   generalContext.addDayExpense(amountValue, tag.id);
   setErrorMessage(null);
   setAmountValue(0);
   setTagId('');
  }
 };

 return (
  <c.Accordion allowToggle mb="6">
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
       onChange={(e) => setTagId(e.currentTarget.value)}
       value={tagId}
       name="tag"
      >
       {generalContext.tags.map((t) => (
        <option value={t.id} key={crypto.randomUUID()}>
         {t.tagName}
        </option>
       ))}
      </c.Select>
     </c.FormControl>
     <c.Button colorScheme="green" width="100%" onClick={addNewExpenseHandler}>
      <FaPlus /> <c.Box ml="2">Add</c.Box>
     </c.Button>
    </c.AccordionPanel>
   </c.AccordionItem>
  </c.Accordion>
 );
};

export default NewExpenseForm;
