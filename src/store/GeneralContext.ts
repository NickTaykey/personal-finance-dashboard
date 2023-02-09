import React from 'react';

export interface TagObject {
 id: string;
 name: string;
 bgColor: string;
 textColor: string;
}

export interface ExpenseObject {
 amount: number;
 tag: TagObject;
 description?: string;
 id: string;
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
 setSelectedDay(day: DayObject | null): void;
 selectedDay: DayObject | null;
 newTag(tag: { name: string; bgColor: string; textColor: string }): void;
 year: DayObject[][];
 tags: TagObject[];
}

const GeneralContext = React.createContext<GeneralContextObject>({
 addDayExpense(amount, tag, description) {},
 updateDayExpense(newExpense) {},
 setSelectedDay(day: DayObject | null) {},
 selectedDay: null,
 newTag(tag) {},
 year: [],
 tags: [],
});

export default GeneralContext;
