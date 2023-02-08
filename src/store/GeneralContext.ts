import React from 'react';

export interface TagObject {
 name: string;
 color: string;
}

interface ExpenseObject {
 amount: number;
 tag: TagObject;
 description?: string;
}

export interface DayObject {
 expenses: ExpenseObject[];
 day: string;
}

interface GeneralContextObject {
 year: DayObject[][];
 tags: TagObject[];
 updateDayExpense(
  nMonth: number,
  nDay: number,
  newExpenseObject: ExpenseObject
 ): void;
 newTag(tag: TagObject): void;
}

const GeneralContext = React.createContext<GeneralContextObject>({
 year: [],
 tags: [],
 updateDayExpense(nMonth, nDay, newExpenseObject) {},
 newTag(tag) {},
});

export default GeneralContext;
