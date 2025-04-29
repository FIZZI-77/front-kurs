import { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { useRouter } from "next/router";

export default function Profile() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [bio, setBio] = useState("A software developer with a passion for coding.");
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Добавляем состояние для редактирования

  const router = useRouter(); // Используем router для навигации

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    // Здесь вы можете добавить логику для сохранения изменений, например, через API
    setIsEditing(false); // После сохранения отключаем режим редактирования
  };

  const handleEditProfile = () => {
    setIsEditing(true); // Включаем режим редактирования
  };

  const handleBack = () => {
    router.push("/"); // Перенаправляем на главную страницу или на предыдущую страницу
  };

  return (
    <div className="bg-white px-10 py-10 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-5 dark:text-white">Profile</h1>

      <button
        onClick={handleBack}
        className="bg-teal-600 text-white py-2 px-4 rounded-md mb-6"
      >
        Back
      </button>

      <div className="flex items-center mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          {image ? (
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <BsFillCameraFill className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-gray-600" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={!isEditing} // Блокируем изменение изображения, если не в режиме редактирования
          />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-medium dark:text-white">{`${firstName} ${lastName}`}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">{email}</p>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="firstName" className="block text-lg font-medium dark:text-white">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          placeholder="Enter your first name"
          disabled={!isEditing} // Блокируем редактирование имени, если не в режиме редактирования
        />
      </div>

      <div className="mb-6">
        <label htmlFor="lastName" className="block text-lg font-medium dark:text-white">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          placeholder="Enter your last name"
          disabled={!isEditing} // Блокируем редактирование фамилии, если не в режиме редактирования
        />
      </div>

      <div className="mb-6">
        <label htmlFor="bio" className="block text-lg font-medium dark:text-white">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          placeholder="Tell us about yourself"
          disabled={!isEditing} // Блокируем редактирование текста, если не в режиме редактирования
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-lg font-medium dark:text-white">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          placeholder="Enter your email"
          disabled={!isEditing} // Блокируем редактирование email, если не в режиме редактирования
        />
      </div>

      {isEditing ? (
        <button
          onClick={handleSaveChanges}
          className="bg-teal-600 text-white py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={handleEditProfile}
          className="bg-teal-600 text-white py-2 px-4 rounded-md"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}
