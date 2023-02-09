import * as c from '@chakra-ui/react';
import React, { useContext, useRef } from 'react';
import { FaTags } from 'react-icons/fa';
import { isColorDark } from './helpers';
import GeneralContext from './store/GeneralContext';

const TagsDrawer = () => {
 const { isOpen, onOpen, onClose } = c.useDisclosure();
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
 const btnRef = React.useRef(null);

 return (
  <>
   <c.Flex width="100%">
    <c.IconButton
     ref={btnRef}
     colorScheme="telegram"
     onClick={onOpen}
     aria-label="Open tags menu"
     icon={<FaTags />}
    />
   </c.Flex>
   <c.Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    finalFocusRef={btnRef}
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
         <c.Flex key={crypto.randomUUID()} alignItems="start">
          <div
           style={{
            marginRight: '1rem',
            width: '25px',
            height: '25px',
            borderRadius: '100%',
            backgroundColor: t.bgColor,
            color: t.textColor,
           }}
          />
          <div>{t.name}</div>
         </c.Flex>
        ))}
       </c.VStack>
      </section>
     </c.DrawerBody>
    </c.DrawerContent>
   </c.Drawer>
  </>
 );
};

export default TagsDrawer;
