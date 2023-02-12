import GeneralContext, { DayObject } from '../store/GeneralContext';
import { FaArrowLeft, FaExpandArrowsAlt, FaTags } from 'react-icons/fa';
import MonthExpensesByChart from './MonthExpensesPieChart';
import { useParams, useNavigate } from 'react-router-dom';
import { monthNameToNumber } from '../helpers';
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
 const navigate = useNavigate();

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

 let markup = (
  <c.Flex
   w="100vw"
   h="100vh"
   justify="center"
   alignItems="center"
   direction="column"
  >
   <c.Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
   />
  </c.Flex>
 );

 if (
  monthName &&
  generalContext.year.length &&
  monthNameToNumber(monthName) !== -1
 ) {
  const selectedMonthIdx = monthNameToNumber(monthName) - 1;
  if (selectedMonthIdx >= 0) {
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
     <c.Box m="5" w="90%">
      <c.Flex justify="start" alignItems="center">
       <c.IconButton
        onClick={() => navigate('/')}
        fontSize="2xl"
        bgColor="transparent"
        icon={<FaArrowLeft />}
        aria-label="Go back home"
       />
       <c.Heading textTransform="uppercase" mx="3">
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
      <c.Flex mt="3" direction={['column', 'row']}>
       <c.Flex justifyContent="space-between" flexGrow="4" mr="5">
        {tableRows.map((row, rowIdx) => {
         return (
          <c.Flex direction="column" key={rowIdx}>
           {row.map((day, colIdx) => (
            <c.Box key={`${rowIdx}-${colIdx}`}>
             {colIdx === 0 && (
              <c.Box fontWeight="bold">Week {rowIdx + 1}</c.Box>
             )}
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
               <FaExpandArrowsAlt
                onClick={monthTableClickHandlerFactory(day)}
               />
              </c.Box>
             </c.Flex>
            </c.Box>
           ))}
          </c.Flex>
         );
        })}
       </c.Flex>
       <MonthExpensesByChart monthObject={monthObject} />
      </c.Flex>
     </c.Box>
     {generalContext.selectedDay && isModalOpen && (
      <DayModal isOpen={isModalOpen} onClose={onModalClose} />
     )}
    </>
   );
  } else {
   markup = (
    <c.Flex
     w="100vw"
     h="100vh"
     justify="center"
     alignItems="center"
     direction="column"
    >
     <c.Heading fontSize="5xl">404</c.Heading>
     <c.Heading fontSize="2xl">Invalid month name</c.Heading>
    </c.Flex>
   );
  }
 }

 return markup;
};

export default Month;
