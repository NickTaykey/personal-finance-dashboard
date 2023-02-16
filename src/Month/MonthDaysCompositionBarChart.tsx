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

 const dailyTagAmountsById: DailyTagAmountsObject = {};

 for (const tag of tags) {
  dailyTagAmountsById[tag.id] = [];
 }

 let maxAmountSpentDaily = 0;

 for (const [dayIdx, day] of Object.entries(props.monthObject.days)) {
  let total = 0;
  for (const key in dailyTagAmountsById) {
   dailyTagAmountsById[key].push({ x: day.monthDayNumber.toString(), y: 0 });
  }
  for (const expense of day.expenses) {
   if (dailyTagAmountsById[expense.tagId]) {
    dailyTagAmountsById[expense.tagId][Number(dayIdx)].y += expense.amount;
    total += expense.amount;
   }
  }
  maxAmountSpentDaily =
   total > maxAmountSpentDaily ? total : maxAmountSpentDaily;
 }

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
      tags[idx] ? tags[idx].bgColor : '#737373'
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
