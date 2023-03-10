import React from 'react';

export interface TagObject {
 id: string;
 tagName: string;
 bgColor: string;
 textColor: string;
}

export interface ExpenseObject {
 amount: number;
 tagId: string;
 id: string;
}

export interface MonthObject {
 monthBudget: number;
 days: DayObject[];
}

export interface DayObject {
 expenses: ExpenseObject[];
 monthDayNumber: number;
 monthIdx: number;
 day: string;
 id: string;
}

interface TagPropertiesObject {
 tagName: string;
 bgColor: string;
}

interface GeneralContextObject {
 noTagObjectId: string | null;
 addDayExpense(amount: number, tagId: string): void;
 updateDayExpense(newExpense: ExpenseObject): void;
 deleteDayExpense(expenseId: string): void;
 setSelectedDay(day: DayObject | null): void;
 selectedDay: DayObject | null;
 newTag(tag: TagPropertiesObject): void;
 updateTag(tadId: string, newTag: TagPropertiesObject): void;
 deleteTag(tadId: string): void;
 updateBudget(monthIdx: number, newBudget: number): void;
 year: MonthObject[];
 tags: TagObject[];
}

const GeneralContext = React.createContext<GeneralContextObject>({
 noTagObjectId: null,
 addDayExpense(amount, tag) {},
 updateDayExpense(newExpense) {},
 deleteDayExpense(expenseId) {},
 setSelectedDay(day) {},
 selectedDay: null,
 newTag(tag) {},
 updateTag(tadId, newTwag) {},
 deleteTag(tadId) {},
 updateBudget(monthIdx, newBudget) {},
 year: [],
 tags: [],
});

export default GeneralContext;
