// TC-GeneralFunctions-Time
//
//function TC_MakeDateObjectFromOurDateString(sDateString)
//function TC_MonthInWordsPlusYear(sYearMonth)
//function TC_GetYearFromDate(sDate)
//function TC_GetMonthFromDate(sDate)
//function TC_GetDayFromDate(sDate)
//function TC_MonthYearToNameOfMonth(sYearMonth)

var TC_Time_aGetDaysWithSuffixAndParens = ['--','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23th','24th','25th','26th','27th','28th','29th','30th','31st'];



function TC_Time_GetDaysWithSuffixAndParens(iDayOfMonth)// 1 ....
{
    if ( iDayOfMonth <= TC_Time_aGetDaysWithSuffixAndParens.length)
        return (TC_Time_aGetDaysWithSuffixAndParens[iDayOfMonth])
    return 'novalue'
}


function TC_MakeDateObjectFromOurDateString(sDateString)
{
    let iYear = TC_GetYearFromDate(sDateString);
    let iMonthIndex = parseInt(TC_GetMonthFromDate(sDateString));
    let iDayIndex = TC_GetDayFromDate(sDateString);
    let d = new Date(iYear, iMonthIndex - 1, iDayIndex)
    return d;
}

function TC_MonthInWordsPlusYear(sYearMonth)
{
    let sYear = sYearMonth.slice(0, 4);
    let sMonth = TC_MonthYearToNameOfMonth(sYearMonth)
    let sYearMonthName = sMonth + ' ' + sYear;
    return sYearMonthName;
}

function TC_MonthYearToNameOfMonth(sYearMonth)
{
    if ( sYearMonth.includes('-01') )
        return 'January';
    if ( sYearMonth.includes('-02') )
        return 'February';
    if ( sYearMonth.includes('-03') )
        return 'March';
    if ( sYearMonth.includes('-04') )
        return 'April';
    if ( sYearMonth.includes('-05') )
        return 'May';
    if ( sYearMonth.includes('-06') )
        return 'June';
    if ( sYearMonth.includes('-07') )
        return 'July';
    if ( sYearMonth.includes('-08') )
        return 'August';
    if ( sYearMonth.includes('-09') )
        return 'September';
    if ( sYearMonth.includes('-10') )
        return 'October';
    if ( sYearMonth.includes('-11') )
        return 'November';
    if ( sYearMonth.includes('-12') )
        return 'December';
}

function TC_GetYearFromDate(sDate)
{
    iYear = parseInt(sDate.slice(0, 4));
    return iYear;
}

function TC_GetMonthFromDate(sDate)
{
    iMonth = parseInt(sDate.slice(5, 7));
    return iMonth;
}

function TC_GetDayFromDate(sDate)
{
    iMonth = parseInt(sDate.slice(8, 10));
    return iMonth;
}
