import GeneralContext, { ExpenseObject } from './store/GeneralContext';
import ExpenseTableRow from './ExpenseRowTable';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const DayModalExpenseTable = () => {
 const generalContext = useContext(GeneralContext);
 return (
  <c.Table>
   <c.Thead>
    <c.Tr>
     <c.Th>Amout</c.Th>
     <c.Th>Label</c.Th>
     <c.Th>Descrition?</c.Th>
    </c.Tr>
   </c.Thead>
   <c.Tbody>
    {generalContext.selectedDay!.expenses.map((e: ExpenseObject) => (
     <ExpenseTableRow {...e} key={e.id} />
    ))}
   </c.Tbody>
  </c.Table>
 );
};

export default DayModalExpenseTable;
