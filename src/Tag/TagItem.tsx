import GeneralContext, { TagObject } from '../store/GeneralContext';
import { FaTrash } from 'react-icons/fa';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const TagItem = (props: TagObject) => {
 const generalContext = useContext(GeneralContext);
 return (
  <c.Flex
   key={crypto.randomUUID()}
   alignItems="center"
   justify="space-between"
   width="100%"
  >
   <c.Box
    style={{
     width: '25px',
     height: '25px',
     borderRadius: '100%',
     backgroundColor: props.bgColor,
     color: props.textColor,
    }}
   />
   <c.Text fontWeight="bold">{props.name}</c.Text>
   <c.IconButton
    icon={<FaTrash />}
    aria-label="Delete Tag"
    onClick={() => generalContext.deleteTag(props.id)}
   />
  </c.Flex>
 );
};

export default TagItem;
