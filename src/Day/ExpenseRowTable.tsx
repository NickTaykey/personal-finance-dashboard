import GeneralContext, { ExpenseObject } from '../store/GeneralContext';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { generateTagNamesMap } from '../helpers';
import { useState, useContext } from 'react';
import * as c from '@chakra-ui/react';

const ExpenseTableRow = (props: ExpenseObject) => {
 const generalContext = useContext(GeneralContext);
 const currentTag = generateTagNamesMap(generalContext.tags).get(props.tagId);

 const [tagIdValue, setTagIdValue] = useState<string>(
  currentTag ? currentTag.id : ''
 );
 const [amountValue, setAmountValue] = useState<number>(props.amount);
 const [showEditingFields, setShowEditingFields] = useState(false);

 const updateExpenseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  generalContext.updateDayExpense({
   ...props,
   amount: amountValue,
   tagId: tagIdValue,
  });
  setShowEditingFields(false);
 };

 const deleteExpenseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  generalContext.deleteDayExpense(props.id);
 };

 return (
  <c.Tr
   backgroundColor={currentTag?.bgColor || 'transparent'}
   color={currentTag?.textColor || 'black'}
  >
   <c.Td p="0" px="2" py="2" w="30%">
    {showEditingFields ? (
     <c.NumberInput
      defaultValue={15}
      precision={2}
      step={0.01}
      value={amountValue}
      onChange={(_, amount) => {
       if (amount && !isNaN(amount)) setAmountValue(amount);
      }}
      borderColor={currentTag?.textColor}
      _hover={{
       borderColor: currentTag?.textColor,
      }}
     >
      <c.NumberInputField
       name="amount"
       borderColor={currentTag?.textColor}
       _hover={{
        borderColor: currentTag?.textColor,
       }}
      />
      <c.NumberInputStepper
       borderColor={currentTag?.textColor}
       _hover={{
        borderColor: currentTag?.textColor,
       }}
      >
       <c.NumberIncrementStepper
        borderColor={currentTag?.textColor}
        color={currentTag?.textColor}
        _hover={{
         borderColor: currentTag?.textColor,
        }}
       />
       <c.NumberDecrementStepper
        borderColor={currentTag?.textColor}
        color={currentTag?.textColor}
        _hover={{
         borderColor: currentTag?.textColor,
        }}
       />
      </c.NumberInputStepper>
     </c.NumberInput>
    ) : (
     <c.Text>{props.amount}</c.Text>
    )}
   </c.Td>
   <c.Td p="0" py="2" pl="2">
    <c.Flex justify="center">
     {showEditingFields ? (
      <c.Select
       onChange={(e) => setTagIdValue(e.currentTarget.value)}
       borderColor={currentTag?.textColor || 'black'}
       value={tagIdValue}
       name="tag"
       _hover={{
        borderColor: currentTag?.textColor || 'black',
       }}
      >
       {generalContext.tags.map((t) => (
        <option value={t.id} key={crypto.randomUUID()}>
         {t.tagName}
        </option>
       ))}
      </c.Select>
     ) : (
      <c.Text>{currentTag?.tagName || 'No Tag'}</c.Text>
     )}
    </c.Flex>
   </c.Td>
   <c.Td p="0" py="2" pr="2">
    <c.Flex justify="end">
     <c.IconButton
      color="black"
      aria-label={
       showEditingFields ? 'close edit expense form' : 'open edit expense form'
      }
      ml="1"
      icon={showEditingFields ? <FaTimes /> : <FaEdit />}
      onClick={() => setShowEditingFields((c) => !c)}
     />
     {showEditingFields ? (
      <c.IconButton
       ml="1"
       color="black"
       aria-label="save updates"
       icon={<FaCheck />}
       onClick={updateExpenseHandler}
      />
     ) : (
      <c.IconButton
       ml="2"
       color="black"
       aria-label="delete expense"
       icon={<FaTrash />}
       onClick={deleteExpenseHandler}
      />
     )}
    </c.Flex>
   </c.Td>
  </c.Tr>
 );
};

export default ExpenseTableRow;
