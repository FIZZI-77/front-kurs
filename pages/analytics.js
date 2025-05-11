import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Link from "next/link";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [entries, setEntries] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);  // Состояние для выбранного года

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(storedEntries);
  }, []);

  // Массив с названиями месяцев
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ];

  // Получаем уникальные годы из данных
  const getUniqueYears = () => {
    const years = entries.map(entry => {
      const dateParts = entry.date.split('.');
      return parseInt(dateParts[2], 10); // Получаем год
    });
    return [...new Set(years)].sort(); // Возвращаем уникальные и отсортированные годы
  };

  // Функция для анализа данных по месяцам
  const analyzeData = () => {
    const monthData = Array(12).fill(0);

    // Фильтруем данные по выбранному году
    const filteredEntries = selectedYear
      ? entries.filter(entry => {
          const dateParts = entry.date.split('.');
          return parseInt(dateParts[2], 10) === selectedYear;
        })
      : entries;  // Если год не выбран, используем все данные

    filteredEntries.forEach(entry => {
      // Извлекаем месяц из строки даты в формате DD.MM.YYYY
      const dateParts = entry.date.split('.'); // Разделяем по точке
      const month = parseInt(dateParts[1], 10) - 1; // Получаем месяц (нужно вычесть 1, так как месяцы начинаются с 0)
      monthData[month]++;
    });
    return monthData;
  };

  // Данные для диаграммы
  const data = {
    labels: monthNames,  // Названия месяцев для оси X
    datasets: [
      {
        label: "Загруженность по месяцам",
        data: analyzeData(),
        backgroundColor: "rgba(0, 128, 128, 0.5)",
        borderColor: "rgba(0, 128, 128, 1)",
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
      <main>
        <section className="min-h-screen py-12">
          <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="text-3xl font-medium text-center mb-6 dark:text-white">
              Анализ загруженности по месяцам
            </h2>

            {/* Кнопка возврата */}
            <Link href="/">
              <Link className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
                Назад
              </Link>
            </Link>

            {/* Выпадающий список для выбора года */}
            <div className="mb-4">
              <label htmlFor="yearSelect" className="block text-lg font-medium dark:text-white">Выберите год:</label>
              <select
                id="yearSelect"
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                className="mt-2 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Все годы</option>
                {getUniqueYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8">
              <Bar data={data} />
            </div>

            {/* Таблица с данными */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                  <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative dark:bg-gray-800 dark:text-white">
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Id
                    </th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Date
                    </th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Time
                    </th>
                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                      Event
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row dark:bg-gray-800 dark:text-white">
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{entry.id}</td>
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{entry.date}</td>
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{entry.time}</td>
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{entry.events}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
