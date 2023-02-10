import TagsDrawer from './Tag/TagsDrawer';
import { FaTags } from 'react-icons/fa';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';
import GeneralContext from './store/GeneralContext';
import MonthCard from './Month/MonthCard';

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

 console.log(totYear);

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
     <c.Text fontSize="lg">Tot. budget: {totYear.budget.toFixed(2)}</c.Text>
     <c.Text fontSize="lg">Tot. spent: {totYear.spent.toFixed(2)}</c.Text>
     <c.Text fontSize="lg">
      Avg. spent per month: {(totYear.spent / 12).toFixed(2)}
     </c.Text>
     {totYear.saved - Math.abs(totYear.excessiveSpending) > 0 && (
      <>
       <c.Text fontSize="lg">
        Tot. saved:{' '}
        {(totYear.saved - Math.abs(totYear.excessiveSpending)).toFixed(2)}{' '}
        (minus exessive spending)
       </c.Text>
       <c.Text fontSize="lg">
        Avg. saved per month: {(totYear.saved / 12).toFixed(2)}
       </c.Text>
      </>
     )}
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
