import GeneralContext from '../store/GeneralContext';
import { VictoryLabel, VictoryPie } from 'victory';
import { getMonthName } from '../helpers';
import { faker } from '@faker-js/faker';
import { useContext } from 'react';

const YearExpenseByMonthPieChart = () => {
 const generalContext = useContext(GeneralContext);

 const yearExpensesByMonth = generalContext.year.map((month, idx) => {
  const totSpent = month.days.reduce(
   (acm, day) => acm + day.expenses.reduce((acm, exp) => acm + exp.amount, 0),
   0
  );
  return { label: getMonthName(idx), x: idx + 1, y: totSpent };
 });

 return (
  <VictoryPie
   colorScale={new Array(12).fill(null).map(() => faker.color.rgb())}
   data={yearExpensesByMonth}
   height={400}
   width={500}
   labelComponent={<VictoryLabel angle={45} style={{ fontSize: '10' }} />}
  />
 );
};

export default YearExpenseByMonthPieChart;
