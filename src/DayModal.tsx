import GeneralContext, { DayObject } from './store/GeneralContext';
import ExpenseForm from './ExpenseForm';
import * as c from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { getMonthName } from './helpers';
import DayModalExpenseTable from './DayModalExpenseTable';

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
     {generalContext.selectedDay!.day}{' '}
     {generalContext.selectedDay!.monthDayIdx + 1} of{' '}
     {getMonthName(generalContext.selectedDay!.monthIdx)}
    </c.ModalHeader>
    <c.ModalCloseButton />
    <c.ModalBody my="3">
     <c.Box maxHeight="60vh" overflowY="auto">
      <DayModalExpenseTable />
     </c.Box>
     <ExpenseForm />
    </c.ModalBody>
   </c.ModalContent>
  </c.Modal>
 );
};

export default DayModal;
