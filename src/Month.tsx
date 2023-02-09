import GeneralContext, { DayObject } from './store/GeneralContext';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';
import DayModal from './DayModal';
import TagsDrawer from './TagsDrawer';

function monthNameToNumber(month: string) {
 switch (month.toLowerCase()) {
  case 'jan':
   return 1;
  case 'feb':
   return 2;
  case 'mar':
   return 3;
  case 'apr':
   return 4;
  case 'may':
   return 5;
  case 'jun':
   return 6;
  case 'jul':
   return 7;
  case 'aug':
   return 8;
  case 'sep':
   return 9;
  case 'oct':
   return 10;
  case 'nov':
   return 11;
  case 'dec':
   return 12;
  default:
   return -1;
 }
}

function divideArray(array: DayObject[]) {
 const chunkSize = Math.ceil(array.length / 4);
 const chunks = [];
 for (let i = 0; i < array.length; i += chunkSize) {
  chunks.push(array.slice(i, i + chunkSize));
 }
 return chunks;
}

const Month = () => {
 const { isOpen, onOpen, onClose } = c.useDisclosure();
 const generalContext = useContext(GeneralContext);
 const { month: monthName } = useParams();

 let markup = <div>Month not valid</div>;

 if (
  generalContext.year.length &&
  monthName &&
  monthNameToNumber(monthName) !== -1
 ) {
  const selectedMonthIdx = monthNameToNumber(monthName) - 1;
  const monthObject = generalContext.year[selectedMonthIdx];
  const date = new Date();
  const currentMonthIdx = date.getMonth();
  const currentDay = date.getDate();

  const tableRows = divideArray(monthObject);

  const monthTableClickHandlerFactory = (clickedDay: DayObject) => {
   return (e: React.MouseEvent<SVGElement>) => {
    generalContext.setSelectedDay(clickedDay);
    onOpen();
   };
  };

  let monthDayIdx = 1;
  markup = (
   <c.Box m="5">
    <c.Flex justify="start">
     <c.Heading textTransform="uppercase" mr="3">
      {monthName}
     </c.Heading>
     <TagsDrawer />
    </c.Flex>
    <c.Table width="50vw" mt="5">
     <c.Tbody>
      {tableRows.map((row, rowIdx) => (
       <c.Tr key={rowIdx}>
        <c.Td style={{ padding: '1rem' }}>
         <strong>Week {rowIdx + 1}</strong>
        </c.Td>
        {row.map((day, colIdx) => (
         <c.Td
          key={`${rowIdx}-${colIdx}`}
          style={{
           padding: '1rem',
           backgroundColor:
            currentMonthIdx === selectedMonthIdx && currentDay === monthDayIdx
             ? 'coral'
             : 'transparent',
          }}
         >
          <c.Flex justify="space-between">
           <c.Text>
            {monthDayIdx++} {day.day}
           </c.Text>
           <c.Box _hover={{ cursor: 'pointer' }}>
            <FaExpandArrowsAlt onClick={monthTableClickHandlerFactory(day)} />
           </c.Box>
          </c.Flex>
         </c.Td>
        ))}
       </c.Tr>
      ))}
     </c.Tbody>
    </c.Table>
    {generalContext.selectedDay && isOpen && (
     <DayModal isOpen={isOpen} onClose={onClose} />
    )}
   </c.Box>
  );
 }

 return markup;
};

export default Month;
