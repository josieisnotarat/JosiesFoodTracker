import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

const defaultTargets = {
  calories: 2200,
  protein: 160,
  carbs: 210,
  fats: 75,
};

const DiaryContext = createContext();

const createDay = (dateKey = dayjs().format('YYYY-MM-DD')) => ({
  date: dateKey,
  meals: [],
  totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
});

export const DiaryProvider = ({ children }) => {
  const [diaryByDate, setDiaryByDate] = useState({ [dayjs().format('YYYY-MM-DD')]: createDay() });
  const [activeDate, setActiveDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [carbLimit, setCarbLimit] = useState(180);

  const addMeal = (meal) => {
    setDiaryByDate((prev) => {
      const day = prev[activeDate] || createDay(activeDate);
      const meals = [...day.meals, meal];
      const totals = meals.reduce(
        (acc, item) => ({
          calories: acc.calories + (item.calories || 0),
          protein: acc.protein + (item.protein || 0),
          carbs: acc.carbs + (item.carbs || 0),
          fats: acc.fats + (item.fats || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 },
      );
      return { ...prev, [activeDate]: { ...day, meals, totals } };
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const todayKey = dayjs().format('YYYY-MM-DD');
      setActiveDate((prev) => {
        if (prev !== todayKey) {
          setDiaryByDate((state) => ({
            ...state,
            [todayKey]: state[todayKey] || createDay(todayKey),
          }));
          return todayKey;
        }
        return prev;
      });
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const value = useMemo(
    () => ({
      diaryByDate,
      activeDate,
      setActiveDate,
      targets: defaultTargets,
      carbLimit,
      setCarbLimit,
      addMeal,
    }),
    [activeDate, carbLimit, diaryByDate],
  );

  return <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>;
};

export const useDiary = () => useContext(DiaryContext);
