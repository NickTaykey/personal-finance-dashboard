import TagsDrawer from './Tag/TagsDrawer';
import { FaTags } from 'react-icons/fa';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';
import GeneralContext from './store/GeneralContext';
import MonthCard from './Month/MonthCard';

const Home = () => {
 const { isOpen, onOpen, onClose } = c.useDisclosure();
 const generalContext = useContext(GeneralContext);

 const date = new Date();

 return (
  <>
   <TagsDrawer isOpen={isOpen} onClose={onClose} />
   <c.VStack m="5" alignItems="start">
    <c.Flex alignItems="center" mb="3">
     <c.Heading mr="3">Year {date.getUTCFullYear()}</c.Heading>
     <c.IconButton
      colorScheme="telegram"
      onClick={onOpen}
      aria-label="Open tags menu"
      icon={<FaTags />}
     />
    </c.Flex>
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
