import GeneralContext, { ExpenseObject } from '../store/GeneralContext';
import ExpenseTableRow from './ExpenseRowTable';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const DayModalExpenseTable = () => {
 const generalContext = useContext(GeneralContext);
 return (
  <c.Table>
   <c.Thead>
    <c.Tr>
     <c.Th p="0" py="2">
      Amout
     </c.Th>
     <c.Th p="0" py="2">
      Tag
     </c.Th>
     <c.Th p="0" py="2"></c.Th>
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
