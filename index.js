//A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
//Create a function that creates an object from the data given.Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord(arr) {
  let employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}
//function argument arrOfEmployees is an array of arrays
//returns an array of objects
//Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arrOfEmployees) {
  let employees = [];
  for (let i = 0; i < arrOfEmployees.length; i++) {
    employees.push(createEmployeeRecord(arrOfEmployees[i]));
  }
  return employees;
}
//function has two argument. An employee record Object and A date stamp ("YYYY-MM-DD HHMM")
//The time is represented on a 24-hour clock
//and timestamps will be provided as Strings in the form: "YYYY-MM-DD 800" or "YYYY-MM-DD 1800" e.g. "2018-01-01 2300"
//Returns the employee record
//Add an Object with keys to the timeInEvents Array on the record Object:
//type: Set to "TimeIn"
//hour: Derived from the argument
//date: Derived from the argument
function createTimeInEvent(employee, dateStamp) {
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(-4), 10),
    date: dateStamp.slice(0, 10),
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(-4), 10),
    date: dateStamp.slice(0, 10),
  });
  return employee;
}
//function argument employee is an object and date is of the form "YYYY-MM-DD"
//returns the hours worked on date as an integer.
function hoursWorkedOnDate(employee, specificDate) {
  let hours = 0;
  for (let i = 0; i < employee.timeInEvents.length; i++) {
    if (employee.timeInEvents[i].date === specificDate) {
      hours += employee.timeOutEvents[i].hour - employee.timeInEvents[i].hour;
    }
  }
  return hours / 100;
}
//function argument employee is an object and specificDate is of the form "YYYY-MM-DD"
//returns the pay earned on date as a number by multiplying the hoursWorkedOnDate by the payPerHour.
function wagesEarnedOnDate(employee, specificDate) {
  return hoursWorkedOnDate(employee, specificDate) * employee.payPerHour;
}

//function argument employee is an object
//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow...
function allWagesFor(employee) {
  let wages = 0;
  for (let i = 0; i < employee.timeInEvents.length; i++) {
    wages += wagesEarnedOnDate(employee, employee.timeInEvents[i].date);
  }
  return wages;
}

//returns Sum of pay owed to all employees for all dates, as a number
function calculatePayroll(arrOfEmployees) {
  let total = 0;
  for (let i = 0; i < arrOfEmployees.length; i++) {
    total += allWagesFor(arrOfEmployees[i]);
  }
  return total;
}
