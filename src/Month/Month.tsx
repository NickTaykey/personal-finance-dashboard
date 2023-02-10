import GeneralContext, { DayObject } from '../store/GeneralContext';
import { FaExpandArrowsAlt, FaTags } from 'react-icons/fa';
import { monthNameToNumber } from '../helpers';
import { useParams } from 'react-router-dom';
import TagsDrawer from '../Tag/TagsDrawer';
import MonthBalance from './MonthBalance';
import DayModal from '../Day/DayModal';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';
import React from 'react';

function divideArray(array: DayObject[]) {
 const chunkSize = Math.ceil(array.length / 4);
 const chunks = [];
 for (let i = 0; i < array.length; i += chunkSize) {
  chunks.push(array.slice(i, i + chunkSize));
 }
 return chunks;
}

const Month = () => {
 const {
  isOpen: isModalOpen,
  onOpen: onModalOpen,
  onClose: onModalClose,
 } = c.useDisclosure();
 const {
  isOpen: isDrawerOpen,
  onOpen: onDrawerOpen,
  onClose: onDrawerClose,
 } = c.useDisclosure();
 const generalContext = useContext(GeneralContext);
 const { month: monthName } = useParams();

 let markup = <div>Month not valid</div>;

 if (
  monthName &&
  generalContext.year.length &&
  monthNameToNumber(monthName) !== -1
 ) {
  const selectedMonthIdx = monthNameToNumber(monthName) - 1;
  const monthObject = generalContext.year[selectedMonthIdx];
  const date = new Date();
  const currentMonthIdx = date.getMonth();
  const currentDay = date.getDate();

  const tableRows = divideArray(monthObject.days);

  const monthTableClickHandlerFactory = (clickedDay: DayObject) => {
   return (e: React.MouseEvent<SVGElement>) => {
    generalContext.setSelectedDay(clickedDay);
    onModalOpen();
   };
  };

  let monthDayIdx = 1;
  markup = (
   <>
    <TagsDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
    <c.Box m="5">
     <c.Flex justify="start">
      <c.Heading textTransform="uppercase" mr="3">
       {monthName}
      </c.Heading>
      <c.IconButton
       colorScheme="telegram"
       onClick={onDrawerOpen}
       aria-label="Open tags menu"
       icon={<FaTags />}
      />
     </c.Flex>
     <MonthBalance currentMonthIdx={currentMonthIdx} />
     <c.Box mt="5" width="50%">
      <c.Flex justifyContent="space-between">
       {tableRows.map((row, rowIdx) => {
        return (
         <c.Flex direction="column" key={rowIdx}>
          {row.map((day, colIdx) => (
           <c.Box key={`${rowIdx}-${colIdx}`}>
            {colIdx === 0 && <c.Box fontWeight="bold">Week {rowIdx + 1}</c.Box>}
            <c.Flex
             alignItems="center"
             style={{
              padding: '1rem',
              backgroundColor:
               currentMonthIdx === selectedMonthIdx &&
               currentDay === monthDayIdx
                ? 'coral'
                : 'transparent',
             }}
            >
             <c.Box mr="3">
              <c.Text>{monthDayIdx++}</c.Text>
              <c.Text>{day.day}</c.Text>
             </c.Box>
             <c.Box _hover={{ cursor: 'pointer' }}>
              <FaExpandArrowsAlt onClick={monthTableClickHandlerFactory(day)} />
             </c.Box>
            </c.Flex>
           </c.Box>
          ))}
         </c.Flex>
        );
       })}
      </c.Flex>
     </c.Box>
    </c.Box>
    {generalContext.selectedDay && isModalOpen && (
     <DayModal isOpen={isModalOpen} onClose={onModalClose} />
    )}
   </>
  );
 }

 return markup;
};

export default Month;
