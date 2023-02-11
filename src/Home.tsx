import GeneralContext from './store/GeneralContext';
import { AiTwotoneFire } from 'react-icons/ai';
import { MdSavings } from 'react-icons/md';
import MonthCard from './Month/MonthCard';
import TagsDrawer from './Tag/TagsDrawer';
import { FaTags } from 'react-icons/fa';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const Home = () => {
 const { isOpen, onOpen, onClose } = c.useDisclosure();
 const generalContext = useContext(GeneralContext);
 const totYear = generalContext.year.reduce(
  (totYear, month) => {
   const totMonth = month.days.reduce((totMonth, d) => {
    const totDay = d.expenses.reduce((totDay, e) => {
     return totDay + e.amount;
    }, 0);
    return totMonth + totDay;
   }, 0);
   totYear.budget += month.monthBudget;
   totYear.saved +=
    month.monthBudget - totMonth > 0 ? month.monthBudget - totMonth : 0;
   totYear.spent += totMonth;
   totYear.excessiveSpending +=
    month.monthBudget - totMonth < 0 ? month.monthBudget - totMonth : 0;
   return totYear;
  },
  { spent: 0, saved: 0, excessiveSpending: 0, budget: 0 }
 );

 const date = new Date();

 return (
  <>
   <TagsDrawer isOpen={isOpen} onClose={onClose} />
   <c.VStack m="5" alignItems="start">
    <c.Flex alignItems="center">
     <c.Heading mr="3">Year {date.getUTCFullYear()}</c.Heading>
     <c.IconButton
      colorScheme="telegram"
      onClick={onOpen}
      aria-label="Open tags menu"
      icon={<FaTags />}
     />
    </c.Flex>
    <c.Box my="3" textAlign="left">
     <c.Flex fontSize="2xl" alignItems="center">
      <MdSavings />{' '}
      <c.Text ml="2" letterSpacing="wider">
       € {totYear.budget.toFixed(2)}
      </c.Text>
     </c.Flex>
     <c.Flex fontSize="2xl" alignItems="center">
      <AiTwotoneFire />{' '}
      <c.Text ml="2" letterSpacing="wider">
       € {totYear.spent.toFixed(2)}
      </c.Text>
     </c.Flex>
    </c.Box>
    <c.SimpleGrid
     columns={[1, null, 3]}
     spacing="20px"
     width={['90vw', null, '50vw']}
    >
     {generalContext.year.map((m, i) => (
      <MonthCard days={m.days} monthIdx={i} key={crypto.randomUUID()} />
     ))}
    </c.SimpleGrid>
   </c.VStack>
  </>
 );
};

export default Home;
