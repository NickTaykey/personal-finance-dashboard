import { FaTags } from 'react-icons/fa';
import * as c from '@chakra-ui/react';
import TagsDrawer from './Tag/TagsDrawer';

const Home = () => {
 const { isOpen, onOpen, onClose } = c.useDisclosure();

 return (
  <>
   <h1>Home Page</h1>
   <c.IconButton
    colorScheme="telegram"
    onClick={onOpen}
    aria-label="Open tags menu"
    icon={<FaTags />}
   />
   <TagsDrawer isOpen={isOpen} onClose={onClose} />
  </>
 );
};

export default Home;
