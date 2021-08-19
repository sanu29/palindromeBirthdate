var dateinput = document.getElementById("date");
var submitButton = document.getElementById("submit");
var output = document.getElementById("output");


function reverseStr(str)
{
    
    var charList = str.split("");
    var reverse = charList.reverse();
    reverse = reverse.join("");
    return reverse;
}

function isPalindrome(str){
    // alert(str)
    var reverse = reverseStr(str);
    return str == reverse;
}

function dateToString(date)
{
    var dateInString = {day:"", month:"", year:""}
    if(date.day <10)
    {
        dateInString.day = '0'+date.day;
    }
    else{
        dateInString.day = date.day.toString()
    }
    if(date.month <10)
    {
        dateInString.month = '0'+date.month;
    }
    else{
        dateInString.month = date.month.toString()
    }
    
    dateInString.year = date.year.toString();
    
    return dateInString;
}


function getAllDateFormats(date){
    var dateStr = dateToString(date);
    var day = dateStr.day;
    var month = dateStr.month;
    var year = dateStr.year;
    var DDMMYYYY = day+month+year;
    var MMDDYYYY =month+day+year;
    var YYYYMMDD =year+month+day;
    var DDMMYY = day+month+year.slice(-2);
    var MMDDYY = month+day+year.slice(-2);
    var YYMMDD =year.slice(-2)+month+day

    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD ]
}

function checkPalindrome(date)
{
    var listOfFormats = getAllDateFormats(date);
    var palindromeList = [];
    for(var i=0;i<listOfFormats.length;i++)
    {
        
            var result = isPalindrome(listOfFormats[i]);
            palindromeList.push(result);
        
    }
    return palindromeList;
}

function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
function getNextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = dateToString(nextDate);
      var resultList = checkPalindrome(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]==true) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  

var date = {day: 11, month: 12, year: 2021};

submitButton.addEventListener("click",()=>{
   
var inputDate = document.getElementById("date1").value;
if(inputDate == ""){
    
    output.innerHTML = "Please select date ❤";
    output.style.color = "red";
}
else{
        
inputDate = inputDate.split("-");
var date = {
    day : Number(inputDate[2]),
    month : Number(inputDate[1]),
    year : Number(inputDate[0])
}

var res1 = checkPalindrome(date);
var [ctr , nextdate] = (getNextPalindromeDate(date));

for(var i=0;i<res1.length;i++){
    if(res1[i] == true)
    {
        output.innerHTML = "Yayy!!!! This Date is a Palindrome 😊 ❤"
        output.style.color = "#001d3d";
    }
    else{
        output.innerHTML= `It is not a Plalindrome 😔 . Next Palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year} You missed it by ${ctr} days 🙁.` ;
        output.style.color = "#001d3d";
    }
}

}



})