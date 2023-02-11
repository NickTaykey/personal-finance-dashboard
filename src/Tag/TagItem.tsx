import GeneralContext, { TagObject } from '../store/GeneralContext';
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa';
import { useContext, useRef, useState } from 'react';
import * as c from '@chakra-ui/react';

const TagItem = (props: TagObject) => {
 const [tagColor, setTagColor] = useState<string>(props.bgColor);
 const [tagName, setTagName] = useState<string>(props.tagName);
 const [showFields, setShowFields] = useState<boolean>(false);
 const tagColorInputRef = useRef<HTMLInputElement>(null);
 const tagNameInputRef = useRef<HTMLInputElement>(null);
 const generalContext = useContext(GeneralContext);

 return (
  <c.Flex
   key={crypto.randomUUID()}
   alignItems="center"
   justify="space-between"
   width="100%"
  >
   {showFields ? (
    <>
     <c.Input
      ref={tagColorInputRef}
      type="color"
      defaultValue={tagColor}
      /* onChange={(e) => {
       setTagColor(e.currentTarget.value);
       tagColorInputRef.current?.focus();
      }} */
     />
     <c.Input
      ref={tagNameInputRef}
      mx="3"
      type="text"
      defaultValue={tagName}
      /* onChange={(e) => {
       setTagName(e.currentTarget.value);
       tagNameInputRef.current?.focus();
      }} */
     />
    </>
   ) : (
    <>
     <c.Box
      style={{
       width: '25px',
       height: '25px',
       borderRadius: '100%',
       backgroundColor: props.bgColor,
       color: props.textColor,
      }}
     />
     <c.Text fontWeight="bold">{props.tagName}</c.Text>
    </>
   )}
   <c.Box>
    {showFields ? (
     <c.IconButton
      mr="3"
      icon={<FaCheck />}
      aria-label="Update Tag"
      onClick={() => {
       setShowFields((c) => !c);
       generalContext.updateTag(props.id, {
        bgColor: tagColorInputRef.current?.value || props.bgColor,
        tagName: tagNameInputRef.current?.value || props.tagName,
       });
      }}
     />
    ) : (
     <>
      <c.IconButton
       mr="3"
       icon={<FaPen />}
       aria-label="Edit Tag"
       onClick={() => setShowFields((c) => !c)}
      />
      <c.IconButton
       icon={<FaTrash />}
       aria-label="Delete Tag"
       onClick={() => generalContext.deleteTag(props.id)}
      />
     </>
    )}
   </c.Box>
  </c.Flex>
 );
};

export default TagItem;
