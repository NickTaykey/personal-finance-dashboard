import React from 'react';

export interface TagObject {
 name: string;
 color: string;
}

interface ExpenseObject {
 amount: number;
 tag: string;
 description?: string;
}

interface DayObject {
 expenses: ExpenseObject[];
}

export interface MonthObject {
 days: DayObject[];
}

export interface YearObject {
 months: MonthObject[];
}

interface GeneralContextObject {
 year: YearObject;
 tags: TagObject[];
 updateDayExpense(
  nMonth: number,
  nDay: number,
  newExpenseObject: ExpenseObject
 ): void;
 newTag(tag: TagObject): void;
}

const GeneralContext = React.createContext<GeneralContextObject>({
 year: { months: [] },
 tags: [],
 updateDayExpense(nMonth, nDay, newExpenseObject) {},
 newTag(tag) {},
});

export default GeneralContext;
