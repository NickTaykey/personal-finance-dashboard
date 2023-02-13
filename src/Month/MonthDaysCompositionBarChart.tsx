import { VictoryStack, VictoryBar, VictoryAxis, VictoryGroup } from 'victory';
import GeneralContext, { MonthObject } from '../store/GeneralContext';
import * as c from '@chakra-ui/react';
import { useContext } from 'react';

interface MonthDaysCompositionBarChartProps {
 monthObject: MonthObject;
}

type DailyTagAmountsObject = Record<string, { x: string; y: number }[]>;

const MonthDaysCompositionBarChart = (
 props: MonthDaysCompositionBarChartProps
) => {
 const { tags } = useContext(GeneralContext);

 const dailyTagAmountsById = tags.reduce((acm, tag) => {
  acm[tag.id] = [];
  return acm;
 }, {} as DailyTagAmountsObject);
 dailyTagAmountsById.no_tag = [];

 let maxAmountSpentDaily = 0;

 props.monthObject.days.forEach((day) => {
  Object.keys(dailyTagAmountsById).forEach((key) => {
   dailyTagAmountsById[key].push({ x: day.monthDayNumber.toString(), y: 0 });
  });
  let total = 0;
  day.expenses.forEach((exp) => {
   if (exp.tagId) {
    const lastIdx = dailyTagAmountsById[exp.tagId].length - 1;
    dailyTagAmountsById[exp.tagId][lastIdx].y += exp.amount;
   } else {
    const lastIdx = dailyTagAmountsById.no_tag.length - 1;
    dailyTagAmountsById.no_tag[lastIdx].y += exp.amount;
   }
   total += exp.amount;
  });
  maxAmountSpentDaily =
   total > maxAmountSpentDaily ? total : maxAmountSpentDaily;
 });

 return (
  <c.Box flexGrow="2">
   <c.Text fontWeight="medium" textAlign="center">
    Daily amount spent by tags
   </c.Text>
   <VictoryGroup>
    <VictoryAxis
     dependentAxis
     width={400}
     height={400}
     domain={[0, maxAmountSpentDaily]}
    />
    <VictoryStack
     colorScale={Object.values(dailyTagAmountsById).map((_, idx) =>
      tags[idx] ? tags[idx].bgColor : '#e0dcc3'
     )}
    >
     {Object.entries(dailyTagAmountsById).map(([tagId, dailyAmounts]) => (
      <VictoryBar data={dailyAmounts} key={`bar-${tagId}`} />
     ))}
    </VictoryStack>
    <VictoryAxis
     crossAxis
     width={400}
     height={400}
     domain={[0, props.monthObject.days.length + 1]}
    />
   </VictoryGroup>
  </c.Box>
 );
};

export default MonthDaysCompositionBarChart;
