import GeneralContext from '../store/GeneralContext';
import { convertYearToCSV } from '../helpers';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

const DownloadYearCSVButton = () => {
 const generalContext = useContext(GeneralContext);

 const clickButtonHandler = () => {
  const data = convertYearToCSV(generalContext.year, generalContext.tags);
  console.log(data);
  const blob = new Blob([data], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
 };

 return (
  <c.Button colorScheme="whatsapp" onClick={clickButtonHandler}>
   Download Year Data as CSV
  </c.Button>
 );
};

export default DownloadYearCSVButton;
