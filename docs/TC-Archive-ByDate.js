// TC-Archive-ByDate.js

var TC_Archive_ByDate_aYearMonths = [];
var TC_Archive_ByDate_YearMonths_iStartAt   = 0;
var TC_Archive_ByDate_YearMonths_iMaxToShow = 2;
var TC_Archive_ByDate_YearMonths_sButtonText = [];
var TC_Archive_ByDate_YearMonths_sButtonId   = [];
var TC_Archive_ByDate_YearMonths_iActive   = -1;
function TC_Archive_ByDate_SetWidths(iWidth)
{
    let iWidthByDate = ( iWidth - 100 - 2 * 16 )/2;
    for ( let i = 0; i < TC_Archive_ByDate_YearMonths_sButtonText.length; i++ )
//    for ( let i = TC_Archive_ByDate_YearMonths_iStartAt; i < TC_Archive_ByDate_YearMonths_iStartAt + TC_Archive_ByDate_YearMonths_iMaxToShow; i++)
    {
        let elem = document.getElementById(TC_Archive_ByDate_YearMonths_sButtonId[i]);
        if ( elem )
            elem.style.width = MakePixelString(iWidthByDate);
    }
}

function TC_Archive_ByDate_SetClasses()
{
    for ( let i = TC_Archive_ByDate_YearMonths_iStartAt; i < TC_Archive_ByDate_YearMonths_iStartAt + TC_Archive_ByDate_YearMonths_iMaxToShow; i++)
    {
        let e = document.getElementById(TC_Archive_ByDate_BaseMenu_Id(i))
        if ( i == TC_Archive_ByDate_YearMonths_iActive )
            e.className = "Archive_Button_Selection_Date_Selected";
        else
            e.className = "Archive_Button_Selection_Date";
    }
}

function TC_Archive_ByDate_Clear()
{
    TC_Archive_ByDate_aYearMonths.length = 0;
    TC_Archive_ByDate_YearMonths_iStartAt   = 0;
    TC_Archive_ByDate_YearMonths_iActive   = -1;
    TC_Archive_ByDate_YearMonths_iMaxToShow = 2;
    TC_Archive_ByDate_YearMonths_sButtonText.length = 0 ;
    TC_Archive_ByDate_YearMonths_sButtonId.length;
}

function TC_Archive_ShowByDate(e)
{
    let iIndex = TC_Archive_ByDate_BaseMenu_DateIndexFromId(e.id)
    TC_Archive_ShowByDateIndex(iIndex)
}

function TC_Archive_ShowByDateIndex(iIndex)
{
    let sDesiredYearMonth = TC_Archive_ByDate_aYearMonths[iIndex];
    g_TC_Archive_Cookie_sYearMonth = sDesiredYearMonth;
    g_TC_Archive_Cookie_iSize = -1;
    StoreCookie_Settings()
    TC_Archive_ByDate_YearMonths_iActive   = iIndex;
    TC_Archive_ClearActivePuzzles();
// now we reset the Actives then get the menu rewritten
    let iAt = 0;
    while ( iAt < g_TC_Archive_aPuzzleTitles.length )
    {
        let sThisDate = g_TC_Archive_aPuzzleReleaseDate[iAt];
        let sThisYearMonth = sThisDate.substring(0, 7);
        if ( sThisYearMonth == sDesiredYearMonth )
        {   
            let sId = TC_Archive_Id_Con(iAt);            
            let sTitle = g_TC_Archive_aPuzzleTitles[iAt];
            g_TC_Archive_Menu_aActiveIds.push(sId);
            g_TC_Archive_Menu_aActiveTitles.push(sTitle);
            g_TC_Archive_Menu_aPuzzleIndex.push(iAt);
        }            
        iAt++;
    }
    g_TC_Archive_Menu_sActiveSortingBy = TC_MonthInWordsPlusYear(sDesiredYearMonth);
    TC_Archive_Consolidated_FillSelect_Div()
    TC_Archive_BySize_SetInactive();
    TC_Archive_ByDate_SetClasses();
}

function TC_Archive_ByDate_SetInactive()
{
    TC_Archive_ByDate_YearMonths_iActive   = -1;
    TC_Archive_ByDate_SetClasses()
}

function TC_Archive_ByDate_FillDivWithButtons()
{
    let sAll = '';
    sAll += '<DIV Id="ByDateButtons" class="Archive_ByDate_Div">';
    sAll += '<BUTTON class="Archive_ByDate_Preamble">By Date</BUTTON>';
    let sEarlierText = '&nbsp;'
    if ( TC_Archive_ByDate_YearMonths_iStartAt != 0 )
        sEarlierText = '<'
    sAll += '<BUTTON Id="TC_Archive_ShowByDate_Earlier" class="Archive_Button_Selection_Earlier" onclick="TC_Archive_ShowByDate_Earlier();">' + sEarlierText + '</BUTTON>';
    let iLast = TC_Archive_ByDate_YearMonths_iStartAt + TC_Archive_ByDate_YearMonths_iMaxToShow;
    if ( iLast > TC_Archive_ByDate_YearMonths_sButtonText.length )
        iLast == TC_Archive_ByDate_YearMonths_sButtonText.length;
    for ( i = TC_Archive_ByDate_YearMonths_iStartAt; i < iLast; i++ )
        sAll += TC_Archive_ByDate_YearMonths_sButtonText[i];
    let sLaterText = "&nbsp;"
    if ( iLast < TC_Archive_ByDate_YearMonths_sButtonText.length )
        sLaterText = '>'
    sAll += '<BUTTON Id="TC_Archive_ShowByDate_Later" class="Archive_Button_Selection_Later" onclick="TC_Archive_ShowByDate_Later();">' + sLaterText + '</BUTTON>';
    sAll += '</DIV>'
    let elem = document.getElementById("ByDateButtons");
    elem.innerHTML = sAll;
    TC_Archive_ByDate_SetClasses();
}

function TC_Archive_GetAvailableYearMonths()
{
    TC_Archive_ByDate_aYearMonths.length = 0;
    // first get all the unique year months    
    let iPuzzles = g_TC_Archive_aPuzzleReleaseDate.length;
    for ( let i = 0; i < iPuzzles; i++ )
    {
        let sDate = g_TC_Archive_aPuzzleReleaseDate[i];
        let sYearMonth = sDate.slice(0, 7);
        if ( !TC_Archive_ByDate_aYearMonths.includes(sYearMonth) )
        {
            TC_Archive_ByDate_aYearMonths.push(sYearMonth)
        }
    }
}

function TC_Archive_ShowByDate_Later()
{
    if ( 1 + TC_Archive_ByDate_YearMonths_iStartAt + TC_Archive_ByDate_YearMonths_iMaxToShow > TC_Archive_ByDate_YearMonths_sButtonText.length )
        return;
    TC_Archive_ByDate_YearMonths_iStartAt++;
    TC_Archive_ByDate_FillDivWithButtons()
    TC_Archive_ByDate_SetWidths(g_TC_Archive_Menu_iWidth)
}

function TC_Archive_ShowByDate_Earlier()
{
    if ( TC_Archive_ByDate_YearMonths_iStartAt == 0 )
        return;
    iRestore = TC_Archive_ByDate_YearMonths_iStartAt--;
    TC_Archive_ByDate_FillDivWithButtons()
    TC_Archive_ByDate_SetWidths(g_TC_Archive_Menu_iWidth)
}        

function TC_Archive_ByDate_BaseMenu_Id(i){let sId = 'A_ByDate_BaseMenu_' + i.toString();return sId;}
function TC_Archive_ByDate_BaseMenu_DateIndexFromId(sId){return parseInt(sId.slice(18));}


function TC_Archive_ByDate_MakeAvailableButtons()
{
    TC_Archive_ByDate_Clear();
    TC_Archive_GetAvailableYearMonths();
    for ( i = 0; i < TC_Archive_ByDate_aYearMonths.length; i++ )
    {
        let sId = TC_Archive_ByDate_BaseMenu_Id(i);
        let sYearMonth = TC_Archive_ByDate_aYearMonths[i];
        let sButton = '<BUTTON Id="' + sId + '" class="Archive_Button_Selection_Date" onclick="TC_Archive_ShowByDate(this);">' + TC_MonthInWordsPlusYear(sYearMonth) + '</BUTTON>';
        TC_Archive_ByDate_YearMonths_sButtonText.push(sButton);
        TC_Archive_ByDate_YearMonths_sButtonId.push(sId);
    }
}

function TC_Archive_ByDate_MakeButtonDiv()
{
    let sAll = '';
    sAll += '<DIV Id="ByDateButtons" class="Archive_ByDate_Div">';
    sAll += '</DIV>'
    return sAll;
}
