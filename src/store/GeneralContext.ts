import React from 'react';

export interface TagObject {
 id: string;
 name: string;
 bgColor: string;
 textColor: string;
}

export interface ExpenseObject {
 amount: number;
 tag: TagObject | null;
 description?: string;
 id: string;
}

export interface MonthObject {
 monthBudget: number;
 days: DayObject[];
}

export interface DayObject {
 expenses: ExpenseObject[];
 monthDayIdx: number;
 monthIdx: number;
 day: string;
 id: string;
}

interface GeneralContextObject {
 addDayExpense(amount: number, tag: TagObject, description?: string): void;
 updateDayExpense(newExpense: ExpenseObject): void;
 deleteDayExpense(expenseId: string): void;
 setSelectedDay(day: DayObject | null): void;
 selectedDay: DayObject | null;
 newTag(tag: { name: string; bgColor: string; textColor: string }): void;
 deleteTag(tadId: string): void;
 updateBudget(monthIdx: number, newBudget: number): void;
 year: MonthObject[];
 tags: TagObject[];
}

const GeneralContext = React.createContext<GeneralContextObject>({
 addDayExpense(amount, tag, description) {},
 updateDayExpense(newExpense) {},
 deleteDayExpense(expenseId) {},
 setSelectedDay(day: DayObject | null) {},
 selectedDay: null,
 newTag(tag) {},
 deleteTag(tadId: string) {},
 updateBudget(monthIdx, newBudget) {},
 year: [],
 tags: [],
});

export default GeneralContext;
