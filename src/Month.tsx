import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import GeneralContext, { DayObject } from './store/GeneralContext';

function monthNameToNumber(month: string) {
 switch (month.toLowerCase()) {
  case 'jan':
   return 1;
  case 'feb':
   return 2;
  case 'mar':
   return 3;
  case 'apr':
   return 4;
  case 'may':
   return 5;
  case 'jun':
   return 6;
  case 'jul':
   return 7;
  case 'aug':
   return 8;
  case 'sep':
   return 9;
  case 'oct':
   return 10;
  case 'nov':
   return 11;
  case 'dec':
   return 12;
  default:
   return -1;
 }
}

function divideArray(array: DayObject[]) {
 const chunkSize = Math.ceil(array.length / 4);
 const chunks = [];
 for (let i = 0; i < array.length; i += chunkSize) {
  chunks.push(array.slice(i, i + chunkSize));
 }
 return chunks;
}

const Month = () => {
 const generalContext = useContext(GeneralContext);
 const { month: monthName } = useParams();

 let markup = <div>Month not valid</div>;

 if (
  generalContext.year.length &&
  monthName &&
  monthNameToNumber(monthName) !== -1
 ) {
  const monthObject = generalContext.year[monthNameToNumber(monthName) - 1];

  const tableRows = divideArray(monthObject);

  let monthDayIdx = 0;
  markup = (
   <>
    <h1>Month Page</h1>
    <table>
     <tbody>
      {tableRows.map((row, rowIdx) => (
       <tr key={rowIdx}>
        <td style={{ padding: '1rem' }}>Week {rowIdx + 1}</td>
        {row.map((day, colIdx) => (
         <td key={`${rowIdx}-${colIdx}`} style={{ padding: '1rem' }}>
          {++monthDayIdx} {day.day}
         </td>
        ))}
       </tr>
      ))}
     </tbody>
    </table>
   </>
  );
 }

 return markup;
};

export default Month;
