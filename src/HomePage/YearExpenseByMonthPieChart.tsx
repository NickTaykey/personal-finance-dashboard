import GeneralContext from '../store/GeneralContext';
import { VictoryLabel, VictoryPie } from 'victory';
import { getMonthName } from '../helpers';
import { useContext } from 'react';

const YearExpenseByMonthPieChart = () => {
 const generalContext = useContext(GeneralContext);
 const chartData = generalContext.year.map((month, idx) => {
  const totSpent: number = month.days.reduce(
   (acm, day) => acm + day.expenses.reduce((acm, exp) => acm + exp.amount, 0),
   0
  );
  return {
   label: getMonthName(idx),
   x: idx + 1,
   y: totSpent,
  };
 });
 return (
  <VictoryPie
   labelComponent={<VictoryLabel angle={45} style={{ fontSize: '10' }} />}
   colorScale={[
    '#6E0DAD',
    '#27AE60',
    '#FFC300',
    '#E74C3C',
    '#1ABC9C',
    '#8E44AD',
    '#F39C12',
    '#2C3E50',
    '#3498DB',
    '#D35400',
    '#9B59B6',
    '#16A085',
   ]}
   data={chartData}
   height={400}
   width={500}
  />
 );
};

export default YearExpenseByMonthPieChart;
