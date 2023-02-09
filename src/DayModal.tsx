import DayModalExpenseTable from './DayModalExpenseTable';
import GeneralContext from './store/GeneralContext';
import { getMonthName } from './helpers';
import ExpenseForm from './ExpenseForm';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

interface DayModalProps {
 isOpen: boolean;
 onClose(): void;
}

const DayModal = (props: DayModalProps) => {
 const generalContext = useContext(GeneralContext);
 return (
  <c.Modal isOpen={props.isOpen} onClose={props.onClose} size="4xl">
   <c.ModalOverlay />
   <c.ModalContent>
    <c.ModalHeader>
     Daily Expenses - {generalContext.selectedDay!.day}{' '}
     {generalContext.selectedDay!.monthDayIdx + 1} of{' '}
     {getMonthName(generalContext.selectedDay!.monthIdx)}
    </c.ModalHeader>
    <c.ModalCloseButton />
    <c.ModalBody my="3">
     <ExpenseForm />
     <c.Box maxHeight="60vh" overflowY="auto">
      <DayModalExpenseTable />
     </c.Box>
    </c.ModalBody>
   </c.ModalContent>
  </c.Modal>
 );
};

export default DayModal;
