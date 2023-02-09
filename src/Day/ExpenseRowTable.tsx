import GeneralContext, { ExpenseObject } from '../store/GeneralContext';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useContext } from 'react';
import * as c from '@chakra-ui/react';

const ExpenseTableRow = (props: ExpenseObject) => {
 const [descriptionValue, setDescriptionValue] = useState<string>(
  props.description || ''
 );
 const [tagNameValue, setTagNameValue] = useState<string>(
  props.tag?.name || ''
 );
 const [amountValue, setAmountValue] = useState<number>(props.amount);
 const [showEditingFields, setShowEditingFields] = useState(false);
 const generalContext = useContext(GeneralContext);

 const updateExpenseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  generalContext.updateDayExpense({
   ...props,
   amount: amountValue,
   description: descriptionValue,
   tag: generalContext.tags.find((t) => t.name === tagNameValue)!,
  });
  setShowEditingFields(false);
 };

 const deleteExpenseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  generalContext.deleteDayExpense(props.id);
 };

 return (
  <c.Tr backgroundColor={props.tag?.bgColor} color={props.tag?.textColor}>
   <c.Td>
    {showEditingFields ? (
     <c.NumberInput
      defaultValue={15}
      precision={2}
      step={0.01}
      value={amountValue}
      onChange={(_, amount) => {
       if (amount && !isNaN(amount)) setAmountValue(amount);
      }}
      borderColor={props.tag?.textColor}
      _hover={{
       borderColor: props.tag?.textColor,
      }}
     >
      <c.NumberInputField
       name="amount"
       borderColor={props.tag?.textColor}
       _hover={{
        borderColor: props.tag?.textColor,
       }}
      />
      <c.NumberInputStepper
       borderColor={props.tag?.textColor}
       _hover={{
        borderColor: props.tag?.textColor,
       }}
      >
       <c.NumberIncrementStepper
        borderColor={props.tag?.textColor}
        _hover={{
         borderColor: props.tag?.textColor,
        }}
       />
       <c.NumberDecrementStepper
        borderColor={props.tag?.textColor}
        _hover={{
         borderColor: props.tag?.textColor,
        }}
       />
      </c.NumberInputStepper>
     </c.NumberInput>
    ) : (
     <c.Text>{props.amount}</c.Text>
    )}
   </c.Td>
   <c.Td>
    {showEditingFields ? (
     <c.Select
      placeholder="Expense Tag"
      name="tag"
      value={tagNameValue}
      borderColor={props.tag?.textColor}
      onChange={(e) => setTagNameValue(e.currentTarget.value)}
      _hover={{
       borderColor: props.tag?.textColor,
      }}
     >
      {generalContext.tags.map((t) => (
       <option
        value={t.name}
        key={crypto.randomUUID()}
        style={{ borderColor: props.tag?.textColor }}
       >
        {t.name}
       </option>
      ))}
     </c.Select>
    ) : (
     <c.Text>{props.tag?.name || 'No Tag'}</c.Text>
    )}
   </c.Td>
   <c.Td>
    {showEditingFields ? (
     <c.Input
      type="text"
      name="description"
      value={descriptionValue}
      onChange={(e) => setDescriptionValue(e.currentTarget.value)}
      borderColor={props.tag?.textColor || 'black'}
      _hover={{
       borderColor: props.tag?.textColor,
      }}
     />
    ) : (
     <c.Text>{props.description}</c.Text>
    )}
   </c.Td>
   <c.Td>
    <c.Flex justify="end">
     {showEditingFields && (
      <c.IconButton
       mr="2"
       color="black"
       aria-label="save updates"
       icon={<FaCheck />}
       onClick={updateExpenseHandler}
      />
     )}
     <c.IconButton
      color="black"
      aria-label={
       showEditingFields ? 'close edit expense form' : 'open edit expense form'
      }
      icon={showEditingFields ? <FaTimes /> : <FaEdit />}
      onClick={() => setShowEditingFields((c) => !c)}
     />
     <c.IconButton
      ml="2"
      color="black"
      aria-label="delete expense"
      icon={<FaTrash />}
      onClick={deleteExpenseHandler}
     />
    </c.Flex>
   </c.Td>
  </c.Tr>
 );
};

export default ExpenseTableRow;
