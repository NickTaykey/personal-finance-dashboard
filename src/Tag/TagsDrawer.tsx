import GeneralContext from '../store/GeneralContext';
import React, { useContext, useRef } from 'react';
import { isColorDark } from '../helpers';
import * as c from '@chakra-ui/react';
import TagItem from './TagItem';

interface TagsDrawerProps {
 isOpen: boolean;
 onClose(): void;
}

const TagsDrawer = (props: TagsDrawerProps) => {
 const generalContext = useContext(GeneralContext);
 const tagNameInputRef = useRef<HTMLInputElement>(null);
 const tagColorInputRef = useRef<HTMLInputElement>(null);

 const createNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!tagNameInputRef.current || !tagColorInputRef.current) return;
  generalContext.newTag({
   name: tagNameInputRef.current.value,
   bgColor: tagColorInputRef.current.value,
   textColor: isColorDark(tagColorInputRef.current.value) ? 'white' : 'black',
  });
 };

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
    <c.DrawerHeader>
     <c.Heading>Your Tags</c.Heading>
     <c.Text fontSize="xl" fontWeight="normal" my="4">
      To better organize expenses
     </c.Text>
    </c.DrawerHeader>
    <c.DrawerBody>
     <section>
      <header>
       <c.FormControl>
        <c.FormLabel htmlFor="tag-color">Tag color</c.FormLabel>
        <c.Input
         ref={tagColorInputRef}
         type="color"
         id="tag-color"
         name="tag-color"
        />
       </c.FormControl>
       <c.FormControl my="3">
        <c.FormLabel htmlFor="tag-name">Tag name</c.FormLabel>
        <c.Input
         ref={tagNameInputRef}
         type="text"
         id="tag-name"
         name="tag-name"
        />
       </c.FormControl>
       <c.Button colorScheme="green" w="100%" onClick={createNewTag} mb="6">
        SAVE
       </c.Button>
      </header>
      <c.VStack align="start" mt="6">
       {generalContext.tags.map((t) => (
        <TagItem key={t.id} {...t} />
       ))}
      </c.VStack>
     </section>
    </c.DrawerBody>
   </c.DrawerContent>
  </c.Drawer>
 );
};

export default TagsDrawer;
