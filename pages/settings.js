import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false); // Состояние для темной темы
  const [notifications, setNotifications] = useState(true);
  const [font, setFont] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");

  const router = useRouter();

  const handleThemeChange = () => {
    setDarkMode(prevState => {
      const newMode = !prevState; // Переключаем состояние
      // Применяем или убираем класс "dark" на body в зависимости от нового состояния
      document.body.classList.toggle("dark", newMode);
      return newMode; // Возвращаем новое состояние
    });
  };

  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
    document.body.style.fontFamily = e.target.value;
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
    document.body.style.color = e.target.value;
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900">
        <section className="min-h-screen py-12">
          <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <button
              onClick={handleBack}
              className="text-teal-600 text-lg mb-6 font-semibold hover:underline"
            >
              Назад
            </button>

            <h2 className="text-3xl font-medium text-center mb-6 dark:text-white">Настройки</h2>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl dark:text-white">Переключить тему</h3>
              <button
                className="py-2 px-4 bg-teal-600 text-white rounded-md"
                onClick={handleThemeChange}
              >
                {darkMode ? "Светлая" : "Тёмная"} тема
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl dark:text-white">Уведомления</h3>
              <button
                className="py-2 px-4 bg-teal-600 text-white rounded-md"
                onClick={handleNotificationChange}
              >
                {notifications ? "Выключить" : "Включить"} уведомления
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl dark:text-white">Изменить шрифт</h3>
              <select
                className="py-2 px-4 bg-teal-600 text-white rounded-md"
                value={font}
                onChange={handleFontChange}
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl dark:text-white">Изменить цвет текста</h3>
              <input
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
                className="py-2 px-4 bg-teal-600 text-white rounded-md"
              />
            </div>

            <div className="text-lg text-center py-5 dark:text-white">
              Здесь могут быть другие настройки, такие как смена языка или предпочтений.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
