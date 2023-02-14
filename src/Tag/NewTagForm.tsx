import GeneralContext from '../store/GeneralContext';
import { useContext, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import * as c from '@chakra-ui/react';

const NewTagForm = () => {
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const tagColorInputRef = useRef<HTMLInputElement>(null);
 const tagNameInputRef = useRef<HTMLInputElement>(null);
 const generalContext = useContext(GeneralContext);

 const createNewTag = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!tagNameInputRef.current || !tagColorInputRef.current) return;
  if (!tagNameInputRef.current.value.length) {
   setErrorMessage('Invalid Tag name');
  } else {
   generalContext.newTag({
    bgColor: tagColorInputRef.current.value,
    tagName: tagNameInputRef.current.value,
   });
   tagColorInputRef.current.value = '';
   tagNameInputRef.current.value = '';
   setErrorMessage(null);
  }
 };

 return (
  <>
   {errorMessage && <c.Alert colorScheme="red">{errorMessage}</c.Alert>}
   <c.Flex alignItems="center">
    <c.FormControl w="20%" mr="3">
     <c.FormLabel visibility="hidden" display="none">
      Tag color
     </c.FormLabel>
     <c.Input
      ref={tagColorInputRef}
      type="color"
      id="tag-color"
      name="tag-color"
     />
    </c.FormControl>
    <c.FormControl my="3" w="80%">
     <c.FormLabel visibility="hidden" display="none">
      Tag name
     </c.FormLabel>
     <c.Input
      ref={tagNameInputRef}
      placeholder="Tag Name"
      type="text"
      id="tag-name"
      name="tag-name"
     />
    </c.FormControl>
   </c.Flex>
   <c.Button colorScheme="green" w="100%" onClick={createNewTag} mb="6">
    <FaPlus /> <c.Box ml="2">Add</c.Box>
   </c.Button>
  </>
 );
};

export default NewTagForm;
