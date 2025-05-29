import { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  format
} from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CalendarView() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(saved);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const getTasksForDate = (date) => {
    const dateString = date.toLocaleDateString();
    return entries.filter((e) => e.date === dateString);
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        <FiChevronLeft className="text-2xl text-teal-600 dark:text-teal-300" />
      </button>
      <div className="text-xl font-bold dark:text-white">
        {format(currentMonth, "LLLL yyyy", { locale: ru })}
      </div>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        <FiChevronRight className="text-2xl text-teal-600 dark:text-teal-300" />
      </button>
    </div>
  );

  const renderDaysOfWeek = () => {
    const days = [];
    const start = startOfWeek(currentMonth, { locale: ru });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-sm font-medium text-center text-gray-500 dark:text-gray-300"
        >
          {format(addDays(start, i), "EEEEE", { locale: ru })}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ru });
    const endDate = endOfWeek(monthEnd, { locale: ru });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(cloneDay, new Date());
        const isSelected = isSameDay(cloneDay, selectedDate);
        const isCurrentMonth = isSameMonth(cloneDay, currentMonth);
        const cellTasks = getTasksForDate(cloneDay);

        days.push(
          <div
            key={cloneDay.toISOString()}
            onClick={() => setSelectedDate(cloneDay)}
            className={`text-center py-2 cursor-pointer rounded-lg transition
              ${isCurrentMonth ? "text-gray-900 dark:text-white" : "text-gray-400"}
              ${isToday ? "bg-blue-100 dark:bg-blue-700" : ""}
              ${isSelected ? "ring-2 ring-teal-500 dark:ring-teal-300" : ""}
              hover:bg-teal-100 dark:hover:bg-teal-800`}
          >
            <div>{format(cloneDay, "d")}</div>
            {cellTasks.length > 0 && (
              <div className="text-xs text-teal-600 dark:text-teal-300">
                • {cellTasks.length}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toISOString()} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1 mt-2">{rows}</div>;
  };

  return (
    <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900 min-h-screen">
      <nav className="py-10 flex justify-between items-center">
        <h1 className="text-xl font-bold dark:text-white">📅 Календарь задач</h1>
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/" className="text-teal-600 dark:text-teal-400">
              Главная
            </Link>
          </li>
          <li>
            {!darkMode ? (
              <BsFillMoonStarsFill
                onClick={() => setDarkMode(true)}
                className="cursor-pointer text-2xl"
              />
            ) : (
              <BsFillSunFill
                onClick={() => setDarkMode(false)}
                className="cursor-pointer text-2xl text-white"
              />
            )}
          </li>
        </ul>
      </nav>

      <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderCells()}
      </section>

      <section className="mt-8 bg-slate-200 dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
          Задачи на {format(selectedDate, "dd MMMM yyyy", { locale: ru })}
        </h2>
        <ul className="space-y-2">
          {getTasksForDate(selectedDate).length === 0 && (
            <li className="text-gray-600 dark:text-gray-300 text-center">
              Нет задач
            </li>
          )}
          {getTasksForDate(selectedDate).map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-white dark:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span className="dark:text-white">{task.events}</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">
                ⏰ {`${task.startTime} - ${task.endTime}`}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
