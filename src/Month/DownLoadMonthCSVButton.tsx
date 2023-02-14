import { convertMonthToCSV, getMonthNumber } from '../helpers';
import GeneralContext from '../store/GeneralContext';
import { useParams } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const DownloadMonthCSVButton = () => {
 const generalContext = useContext(GeneralContext);
 const { month } = useParams();
 const monthIdx = getMonthNumber(month!) - 1;

 const clickButtonHandler = () => {
  const data = convertMonthToCSV(
   generalContext.year[monthIdx],
   monthIdx,
   generalContext.tags
  );
  const blob = new Blob([data], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${month}-${new Date().getFullYear()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
 };

 return (
  <c.Button colorScheme="whatsapp" onClick={clickButtonHandler}>
   <FaDownload />
   <c.Box ml="2">Download Month Data as CSV</c.Box>
  </c.Button>
 );
};

export default DownloadMonthCSVButton;
