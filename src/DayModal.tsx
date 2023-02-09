import * as c from '@chakra-ui/react';
import ExpenseForm from './ExpenseForm';
import { DayObject } from './store/GeneralContext';

interface DayModalProps {
 selectedDay: DayObject;
 currentMonth: string;
 isOpen: boolean;
 onClose(): void;
}

const DayModal = (props: DayModalProps) => {
 return (
  <c.Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
   <c.ModalOverlay />
   <c.ModalContent>
    <c.ModalHeader>
     {props.selectedDay.day} {props.currentMonth}
    </c.ModalHeader>
    <c.ModalCloseButton />
    <c.ModalBody my="3">
     <c.Table mb="5">
      <c.Thead>
       <c.Tr>
        <c.Th>Amout</c.Th>
        <c.Th>Label</c.Th>
        <c.Th>Descrition?</c.Th>
       </c.Tr>
      </c.Thead>
      <c.Tbody>
       {props.selectedDay.expenses.map((e) => (
        <c.Tr
         backgroundColor={e.tag.bgColor}
         key={crypto.randomUUID()}
         color={e.tag.textColor}
        >
         <c.Td>{e.amount}</c.Td>
         <c.Td>{e.tag.name}</c.Td>
         <c.Td>{e.description}</c.Td>
        </c.Tr>
       ))}
      </c.Tbody>
     </c.Table>
     <ExpenseForm />
    </c.ModalBody>
   </c.ModalContent>
  </c.Modal>
 );
};

export default DayModal;
