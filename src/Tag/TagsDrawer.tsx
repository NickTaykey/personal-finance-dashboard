import GeneralContext from '../store/GeneralContext';
import * as c from '@chakra-ui/react';
import NewTagForm from './NewTagForm';
import { useContext } from 'react';
import TagItem from './TagItem';

interface TagsDrawerProps {
 isOpen: boolean;
 onClose(): void;
}

const TagsDrawer = (props: TagsDrawerProps) => {
 const generalContext = useContext(GeneralContext);
 return (
  <c.Drawer
   isOpen={props.isOpen}
   placement="right"
   onClose={props.onClose}
   size="sm"
  >
   <c.DrawerOverlay />
   <c.DrawerContent>
    <c.DrawerCloseButton />
    <c.DrawerHeader pb="0">
     <c.Heading>Your Tags</c.Heading>
     <c.Text fontSize="xl" fontWeight="normal" my="4">
      To better organize expenses
     </c.Text>
    </c.DrawerHeader>
    <c.DrawerBody pt="0">
     <NewTagForm />
     <c.Text fontSize="xl" fontWeight="normal" mb="4">
      Your tags
     </c.Text>
     <c.VStack align="start" mt="6">
      {generalContext.tags.map((t) => (
       <TagItem key={t.id} {...t} />
      ))}
     </c.VStack>
    </c.DrawerBody>
   </c.DrawerContent>
  </c.Drawer>
 );
};

export default TagsDrawer;
