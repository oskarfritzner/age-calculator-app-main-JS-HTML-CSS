const inputs = document.querySelectorAll("input");
let dateErrorP = document.getElementById("date-error-message");

//Listener if each input gets invalid input. 

inputs.forEach(input => {
  const parentDiv = input.closest(".grid-item");
  const closestP = parentDiv.querySelector('.error-message');

  input.addEventListener("input", (event) => {
    const enteredData = Number(event.target.value);
    const minValue = Number(input.min);
    const maxValue = Number(input.max);

    if (enteredData == '' || (enteredData >= minValue && enteredData <= maxValue)) {
      parentDiv.classList.remove("input-error");
      closestP.style.display = "none";
      input.classList.remove("border-red");
    } else {
      parentDiv.classList.add("input-error");
      closestP.style.display = "block";
      input.classList.add("border-red");
    }

  });
});

const btn = document.getElementById("btn");

const dayOutput = document.getElementById("day-output");
const monthOutput = document.getElementById("month-output");
const yearOutput = document.getElementById("year-output");

btn.addEventListener("click", () => {
    const dayInput = +inputs[0].value;
    const monthInput = +inputs[1].value - 1;
    const yearInput = +inputs[2].value;
  
    const currentDate = new Date();
    const userDate = new Date(yearInput, monthInput, dayInput);
  
    if (isValidDate(userDate, dayInput, monthInput, yearInput) && userDate <= currentDate) {
      const age = getAge(userDate, currentDate);
  
      dayOutput.innerHTML = age.days;
      monthOutput.innerHTML = age.months;
      yearOutput.innerHTML = age.years;
      dateErrorP.style.display = "none";
    } else {
      dateErrorP.innerHTML = "Must be a valid date";
      dateErrorP.style.display = "block";
    }
  });
  
  
  

function getAge(birthDate, currentDate) {
    let yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    let monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    let daysDiff = currentDate.getDate() - birthDate.getDate();
  
    // Adjust for negative monthsDiff
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
      monthsDiff += 12;
    }
  
    // Calculate number of days in month of birth date
    let daysInMonth = new Date(birthDate.getFullYear(), birthDate.getMonth() + 1, 0).getDate();
  
    // Adjust for negative daysDiff
    if (daysDiff < 0) {
      if (monthsDiff === 0) {
        yearsDiff--;
        monthsDiff = 11;
      } else {
        monthsDiff--;
      }
      daysDiff += daysInMonth;
    }
  
    return {years: yearsDiff, months: monthsDiff, days: daysDiff};
  }

  function isValidDate(date, dayInput, monthInput, yearInput) {
    if (!(date instanceof Date) || isNaN(date)) {
      return false;
    }
  
    // Check if the entered day matches the day of the created date object
    if (date.getDate() !== dayInput) {
      return false;
    }
  
    // Check if the entered month matches the month of the created date object
    if (date.getMonth() !== monthInput) {
      return false;
    }
  
    // Check if the entered year matches the year of the created date object
    if (date.getFullYear() !== yearInput) {
      return false;
    }
  
    return true;
  }
  
  
  


