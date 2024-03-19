// function createEmployeeRecord(employeeData) {
//     const record = {
//       firstName: employeeData[0],
//       familyName: employeeData[1],
//       title: employeeData[2],
//       payPerHour: employeeData[3],
//       timeInEvents: [],
//       timeOutEvents: []
//     };
  
//     return record;
//   }
//   function createEmployeeRecords(arr) {
//     const employeeRecords = [];
  
//     arr.forEach((nestedArr) => {
//       const employeeRecord = createEmployeeRecord(...nestedArr);
//       employeeRecords.push(employeeRecord);
//     });
  
//     return employeeRecords;
//   }

//   function createTimeInEvent(employeeRecord, date) {
//     const hour = date.slice(-4);
//     const date = date.slice(0, 10);
  
//     const timeInEvent = {
//       type: "TimeIn",
//       hour,
//       date,
//     };
  
//     employeeRecord.timeInEvents.push(timeInEvent);
  
//     return employeeRecord;
//   }

//   function createTimeOutEvent(employeeRecord, dateStamp) {
//     const hour = dateStamp.slice(-4);
//     const date = dateStamp.slice(0, 10);
  
//     const timeOutEvent = {
//       type: "TimeOut",
//       hour,
//       date,
//     };
  
//     employeeRecord.timeOutEvents.push(timeOutEvent);
  
//     return employeeRecord;
//   }
//   function hoursWorkedOnDate(employeeRecord, date) {
//     const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
//     const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
//     const timeInHour = parseInt(timeInEvent.hour);
//     const timeOutHour = parseInt(timeOutEvent.hour);
  
//     return (timeOutHour - timeInHour) / 100;
//   }
  
//   function wagesEarnedOnDate(employeeRecord, date) {
//     const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
//     const payRate = employeeRecord.payPerHour;
  
//     return hoursWorked * payRate;
//   }
  
//   function allWagesFor(employeeRecord) {
//     const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
//     return datesWorked.reduce((totalWages, date) => {
//       const wages = wagesEarnedOnDate(employeeRecord, date);
//       return totalWages + wages;
//     }, 0);
//   }
  
//   function calculatePayroll(employeeRecords) {
//     return employeeRecords.reduce((totalPayroll, employeeRecord) => {
//       const wages = allWagesFor(employeeRecord);
//       return totalPayroll + wages;
//     }, 0);
//   }
/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

//  const allWagesFor = function () {
//   const eligibleDates = this.timeInEvents.map((e) => e.date);


//   const payable = eligibleDates.reduce(function (memo, d) {
//       return memo + wagesEarnedOnDate.call(this, d)
//   }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//   return payable
// }



const createEmployeeRecord = (employeeData) => {
  return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],

  }
}
const createEmployeeRecords = (employeesData) => {
 return employeesData.map((employeeData) => {
      return createEmployeeRecord(employeeData);
  })
};

function createTimeInEvent(employee, date) {
  const dateParts = date.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: Number.parseInt(dateParts[1]),
    date: dateParts[0],
  });
  return employee;
}

function createTimeOutEvent(employee, date) {
  const dateParts = date.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: Number.parseInt(dateParts[1]),
    date: dateParts[0],
  });
  return employee;
}

function findEmployeeByFirstName(employeeRecords, name) {
  return employeeRecords.find((record) => {
      return record.firstName === name;
  });
}


function hoursWorkedOnDate(employee, date) {
  const timeInHour = employee.timeInEvents.find((timeInEvent) => {
    return timeInEvent.date === date.split(' ')[0];
  }).hour;
  const timeOutHour = employee.timeOutEvents.find((timeOutEvent) => {
    return timeOutEvent.date === date.split(' ')[0];
  }).hour;

  return (timeOutHour - timeInHour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  const eligibleDates = employee.timeInEvents.map((e) => e.date);
  const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);
  return payable;
}

function calculatePayroll(employees) {
  let total = 0;
  for (const employee of employees) {
    total += allWagesFor(employee);
  }
  return total;
}







