import { divideArray, getMonthNumber, localStorageId } from '../helpers';
import { FaArrowLeft, FaExpandArrowsAlt, FaTags } from 'react-icons/fa';
import GeneralContext, { DayObject } from '../store/GeneralContext';
import DownloadMonthCSVButton from './DownLoadMonthCSVButton';
import MonthExpensesBarCharts from './MonthExpensesBarCharts';
import MonthExpensesByChart from './MonthExpensesPieChart';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import TagsDrawer from '../Tag/TagsDrawer';
import MonthBalance from './MonthBalance';
import DayModal from '../Day/DayModal';
import * as c from '@chakra-ui/react';
import React from 'react';

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

 useEffect(() => {
  if (!localStorage.getItem(localStorageId)) navigate('/');
 });

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
  getMonthNumber(monthName) !== -1
 ) {
  const selectedMonthIdx = getMonthNumber(monthName) - 1;
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

   let monthDayNumber = 1;
   markup = (
    <>
     <TagsDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
     <c.Box m="5" w="90%">
      <c.Flex flexDirection={['column', 'row']}>
       <c.Flex justify="start" alignItems="center">
        <c.IconButton
         onClick={() => navigate('/')}
         fontSize="2xl"
         bgColor="transparent"
         icon={<FaArrowLeft />}
         aria-label="Go back home"
         mr="3"
        />
        <c.Heading textTransform="uppercase">{monthName}</c.Heading>
        <c.IconButton
         mx="3"
         colorScheme="telegram"
         onClick={onDrawerOpen}
         aria-label="Open tags menu"
         icon={<FaTags />}
        />
       </c.Flex>
       <c.Flex mt={[3, 0]}>
        <DownloadMonthCSVButton />
       </c.Flex>
      </c.Flex>
      <MonthBalance currentMonthIdx={currentMonthIdx} />
      <c.Flex mt="3" direction={['column', 'row']}>
       <c.Flex
        justifyContent="space-between"
        flexGrow="4"
        mr="5"
        overflowX="auto"
        maxW="100%"
       >
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
                currentDay === monthDayNumber
                 ? 'coral'
                 : 'transparent',
              }}
             >
              <c.Box mr="3">
               <c.Text>{monthDayNumber++}</c.Text>
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
       <MonthExpensesByChart />
      </c.Flex>
      <MonthExpensesBarCharts monthObject={monthObject} />
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
