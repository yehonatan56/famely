import React, { useState, useEffect } from 'react';
import { getFromStore } from '../../logic/store';
import { useNavigate } from 'react-router-dom';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function MyCalendar() {
  const [birthdays, setBirthdays] = useState([]);
  const [day, setDay] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const prepareData = () => {
      const storedData = getFromStore("user");
      if (!storedData) {
        navigate("/");
        return;
      };

      const images = storedData.famely.images;
      const uniqueImages = images.filter((obj, index, self) =>
        index === self.findIndex((t) => t.nickName === obj.nickName)
      );

      let birthdayList = uniqueImages.map(image => {
        const FullDate = image.birthdate.split("-");
        return {
          month: Number(FullDate[1]),
          day: Number(FullDate[2]),
          name: image.name
        };
      });

      birthdayList = convertBirthdays(birthdayList);
      setBirthdays(birthdayList);
    };

    const convertBirthdays = (oldBirthdays) => {
      const birthdayMap = {};
      oldBirthdays.forEach(birthday => {
        const key = `${birthday.month}-${birthday.day}`;
        if (!birthdayMap[key]) {
          birthdayMap[key] = [];
        }
        birthdayMap[key].push(birthday.name);
      });
      return Object.keys(birthdayMap).map(key => {
        const [month, day] = key.split('-');
        return { month: parseInt(month, 10), day: parseInt(day, 10), names: birthdayMap[key] };
      });
    };

    prepareData();
  }, []);

  const populateCalendar = () => {
    const year = new Date().getFullYear(); // Dynamically use current year
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    let days = [];

    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      const dayBirthdays = getBirthdays(new Date(day));
      days.push({
        date: day.toISOString().split('T')[0],
        birthdays: dayBirthdays
      });
    }

    return days;
  };

  const getBirthdays = (date) => {
    return birthdays.find(birthday =>
      birthday.day === date.getDate() && birthday.month === date.getMonth() + 1)?.names || [];
  };

  const days = populateCalendar();

  return (
    <div id="calendar">
      <DateCalendar />
    </div>
  );
}

export default MyCalendar;
