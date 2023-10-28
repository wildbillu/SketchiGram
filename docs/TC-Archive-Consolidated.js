// TC-Archive-Consolidated.js

function TC_Archive_SetFromCookieValues()
{
    if ( g_TC_Archive_Cookie_iSize != -1 )
    {
        let sId = TC_Archive_BySize_BaseMenu_Id(g_TC_Archive_Cookie_iSize);
        let elem = document.getElementById(sId)
        if ( elem )
        {
            TC_Archive_BySize_BaseMenu_Select(elem)
            return;
        }
        return;
    }
    let iYearMonth = TC_Archive_ByDate_aYearMonths.indexOf(g_TC_Archive_Cookie_sYearMonth);
    if ( iYearMonth != -1 )
    { // notset will not match anything in the actual list
        if ( iYearMonth > 1 )
            TC_Archive_ShowByDate_Later()
        if ( iYearMonth > 2 )
            TC_Archive_ShowByDate_Later()
        let sId = TC_Archive_ByDate_BaseMenu_Id(iYearMonth);
        let elem = document.getElementById(sId);
        if ( elem )
        {
            TC_Archive_ShowByDate(elem)
            return
        }
    }
    TC_Archive_BySize_BaseMenu_SelectFromSize(4, true);
}

function TC_Archive_FindPuzzleForTitle(sTitle)
{
    let iEntries = g_TC_Archive_PuzzleReleaseDate_arr.length;
    if ( iEntries == 0 )
        return -1;
    for ( let i = 0; i < iEntries; i++ )
    {
        let sThisTitle = g_TC_Archive_PuzzleTitles_arr[i];
        if ( sThisTitle == sTitle )
        {
            return i;
        }
    }
    return -1;
}

function Archive_PracticePuzzle()
{
    let iArchiveIndex = TC_Archive_FindPuzzleForTitle('Practice SketchiGram');
    g_TC_sPuzzle_Archive  = g_TC_Archive_PuzzleNames_arr[iArchiveIndex];
    g_SG_bAnswersCorrectInGridSet = false;
    g_bGridAndCA = false;
    g_TC_Status_bFirstCheck = true;
//
    Restart();
}

function Archive_PlayToday()
{
    let sToday = TC_Time_MakeTodayDateString();
    let iArchiveIndex = TC_Archive_FindPuzzleForDate(sToday);
    if ( iArchiveIndex == -1 )
        return;
        g_TC_sPuzzle_Archive  = g_TC_Archive_PuzzleNames_arr[iArchiveIndex];
        g_SG_bAnswersCorrectInGridSet = false;
        g_bGridAndCA = false;
        g_TC_Status_bFirstCheck = true;
    //
        Restart();
    }

function TC_Archive_Hide()
{
    ForIdSetVisibility("Archive_Consolidated_Div", false);
}

function TC_Archive_Show()
{
    ForIdSetVisibility("MII_Hint_Div", false);
    ForIdSetVisibility("MII_Grid_Div", false);
    TC_ThemeImage_Popup_HidePopup();
    TC_HideMoreActions();
    ForIdSetVisibility("CluesAsList_Div", false);
    ForIdSetVisibility("Archive_Consolidated_Div", true);
}

function TC_Archive_ToggleVisibility()
{
    if ( !g_TC_Archive_Menu_bActive )
    {
        g_TC_Archive_Menu_bActive = true;
        TC_Archive_Show();
        return;
    }
    g_TC_Archive_Menu_bActive = false;
    TC_Archive_Hide();
}

function TC_Archive_ActivationButtonSetPosition(iTop)
{
    let sId = "Archive_Button_Activate";
    let elem = document.getElementById(sId)
    elem.style.top   = MakePixelString(g_ArchiveActivationButton_iTop);
    elem.style.left  = MakePixelString(g_ArchiveActivationButton_iLeft);
    elem.style.width = MakePixelString(g_ArchiveActivationButton_iWidth);
}

function TC_Archive_MakeActivationButton()
{
    let sId = "Archive_Button_Activate";
    let sArchiveButton = '<BUTTON Id="' + sId + '" class="Archive_Button_Activate TC_StartHidden" onclick="TC_Archive_ToggleVisibility();">Show Archive</BUTTON>';
    return sArchiveButton;
}

function TC_Archive_Select(elem)
{
    let iPuzzle = TC_Archive_IndexFromId_Con(elem.id)
    g_TC_sPuzzle_Archive  = g_TC_Archive_PuzzleNames_arr[iPuzzle];
    g_SG_bAnswersCorrectInGridSet = false;
    g_TC_Status_bFirstCheck = true;

    Restart();
}

function TC_Archive_Previous_Con()
{
    g_TC_Archive_Menu_iStartAt -= Math.max(g_TC_Archive_Menu_iMaxItems, g_TC_Archive_Menu_iActiveCount);
    TC_Archive_Consolidated_FillSelect_Div()
}

function TC_Archive_Next_Con()
{
    g_TC_Archive_Menu_iStartAt += g_TC_Archive_Menu_iMaxItems;
    TC_Archive_Consolidated_FillSelect_Div()
}

function TC_Archive_SetTodaysPuzzleExist()
{
    let sToday = TC_Time_MakeTodayDateString();
    let iArchiveIndex = TC_Archive_FindPuzzleForDate(sToday);
    g_TC_Archive_TodaysPuzzle_bExists = false;
    if ( iArchiveIndex != -1 )
        g_TC_Archive_TodaysPuzzle_bExists = true;
}

function TC_Archive_Consolidated_FillSelect_Div()
{
    let elem = document.getElementById("Archive_Consolidated_Select_Div");
    TC_ForIdSetZIndex("Archive_Consolidated_Select_Div" , g_Archive_izIndex);
//
    elem.innerHTML = '';
    elem.innerHTML += '<DIV class="Archive_Button_Header" Id="Archive_Button_Header">' + g_TC_Archive_Menu_sActiveSortingBy + '</DIV>';
// we are going to determine the width of the widest title as we go and then fix them
// archive selections is a bit more complex for now we set the min width manually
    let iBiggestWidth = 5 * 60 + 100;
    iBiggestWidth = Math.max(iBiggestWidth, TC_GetWidthOfInnerTextInPixels("Archive_Consolidated_Title"));
    iBiggestWidth = Math.max(iBiggestWidth, TC_GetWidthOfInnerTextInPixels("Archive_Button_Header"));
    if ( g_TC_Archive_Menu_iStartAt != 0 )
    {
        let sId = 'Archive_Previous_Con';
        let sTitle = '[Previous]';
        elem.innerHTML += '<BUTTON class="Archive_Button_Selection" Id="' + sId + '" onclick="TC_Archive_Previous_Con();">' + sTitle + '</BUTTON>';
    }
// now we add buttons starting at iStartAt
    let iEntries = g_TC_Archive_Menu_aActiveIds.length;
    let iEntry = g_TC_Archive_Menu_iStartAt;
    let iAdded = 0;
    while ( iEntry < iEntries && iAdded < g_TC_Archive_Menu_iMaxItems)
    {
        let sId = g_TC_Archive_Menu_aActiveIds[iEntry];
        let sTitle = '';
        let sDay   = '';
        if ( TC_Archive_ByDate_YearMonths_iActive != -1 )
        {
            let iIndex = g_TC_Archive_Menu_aPuzzleIndex[iEntry];
            let sYearMonthDay = g_TC_Archive_PuzzleReleaseDate_arr[iIndex];
            let iDayOfMonth = TC_GetDayFromDate(sYearMonthDay);
            let sDayOfMonth = TC_Time_GetDaysWithSuffixAndParens(iDayOfMonth)
            sDay = ' (' + sDayOfMonth +') '
        }
        sTitle += g_TC_Archive_Menu_aActiveTitles[iEntry];
        sTitle += sDay;
        elem.innerHTML += '<BUTTON Id="' + sId + '" class="Archive_Button_Selection" onclick="TC_Archive_Select(this);">' + sTitle + '</BUTTON>';
        iEntry++;
        iAdded++;
// the element exists so we can determine the width
// but if there is a <br> in it we want to find the max of each half
        let sInner = document.getElementById(sId).innerHTML;
        let iBR = sInner.indexOf('<br>');
        if ( iBR == -1 )
        {
            iBiggestWidth = Math.max(iBiggestWidth, TC_GetWidthOfTextInPixels(sId, sInner));
        }
        else
        {
            iBiggestWidth = Math.max(iBiggestWidth, TC_GetWidthOfTextInPixels(sId, sInner.slice(0, iBR)));
            iBiggestWidth = Math.max(iBiggestWidth, TC_GetWidthOfTextInPixels(sId, sInner.slice(iBR+4)));
        }
    }
    iBiggestWidth += g_Archive_iFudgeWidth;
    let iLastButtonNumber = iAdded + g_TC_Archive_Menu_iStartAt;
    if ( iLastButtonNumber < iEntries )
    {
        let sId = 'Archive_Next_Con';
        let sTitle = '[Next]';
        elem.innerHTML += '<BUTTON class="Archive_Button_Selection" Id="' + sId + '" onclick="TC_Archive_Next_Con();">' + sTitle + '</BUTTON>';
    }
    // now set all the widths
    let sWidth = MakePixelString(iBiggestWidth);
    g_TC_Archive_Menu_iWidth = iBiggestWidth;
    let elemTitle = document.getElementById("Archive_Consolidated_Title")
    elemTitle.style.width = sWidth;
    let elemSelect = document.getElementById("Archive_Selections")
    elemSelect.style.width = sWidth;
    let elemHeader = document.getElementById("Archive_Button_Header")
    elemHeader.style.width = sWidth;
// need to do the Previous and Next buttons if they exist - 
    TC_SetWidthOfElementByIdIfExists('Archive_Previous_Con', iBiggestWidth)
    TC_SetWidthOfElementByIdIfExists('Archive_Next_Con', iBiggestWidth)
    for ( let iEntry = g_TC_Archive_Menu_iStartAt; iEntry < g_TC_Archive_Menu_iStartAt + iAdded; iEntry++ )
    {
        let sId = g_TC_Archive_Menu_aActiveIds[iEntry];
        let elemButton = document.getElementById(sId);
        elemButton.style.width = sWidth;
    }
    TC_Archive_ByDate_SetWidths(iBiggestWidth);
    TC_Archive_BySize_SetWidths(iBiggestWidth);
// now get the height of the selection div
    let iHeight = 0;
    if ( g_TC_Archive_Menu_aActiveIds.length > 0 )
        iHeight += iAdded * TC_GetHeightOfElementById(g_TC_Archive_Menu_aActiveIds[g_TC_Archive_Menu_iStartAt]);
    elem.style.height = MakePixelString(iHeight);
// now add the top element heights 
    iHeight += TC_GetHeightOfElementById("Archive_Consolidated_Title")
    iHeight += TC_GetHeightOfElementById("Archive_Button_Header")
    if ( g_TC_Archive_TodaysPuzzle_bExists && !g_TC_Archive_TodaysPuzzle_bDoing )
        iHeight += TC_GetHeightOfElementById("Archive_PlayToday")
    iHeight += TC_GetHeightOfElementById("ByDateButtons");
    iHeight += TC_GetHeightOfElementById("BySizeButtons");
    document.getElementById("Archive_Consolidated_Div").style.height = MakePixelString(iHeight);
// now adjust the overall position since width may have changed    
    TC_Archive_Consolidated_Position_Div();
}

function TC_Archive_Consolidated_Position_Div()
{
    let elem = document.getElementById("Archive_Consolidated_Div")
    let iWidth = TC_GetBoundingClientRectAbsoluteFromId("Archive_Consolidated_Div").width;
    elem.style.left = TC_LeftForCentering(iWidth);
    elem.style.top = MakePixelString(g_ArchiveList_iTop);
}

function TC_Archive_Consolidated_Make_Div()
{
    let sArchive = ""
    sArchive += '<DIV Id="Archive_Consolidated_Div" class="Archive_Consolidated_Div TC_StartHidden" align=center>'
// should check if any cookies and not show this if it exists
    let sPracticePuzzle = 'Practice puzzle';
    sArchive += '<DIV Id="Archive_PracticePuzzle" class="Archive_PracticePuzzle" onclick="Archive_PracticePuzzle();" align=center>' + sPracticePuzzle + '</DIV>';
    if ( g_TC_Archive_TodaysPuzzle_bExists && !g_TC_Archive_TodaysPuzzle_bDoing )
    {
        let sPlay = 'Play today\'s puzzle';
        sArchive += '<DIV Id="Archive_PlayToday" class="Archive_PlayToday" onclick="Archive_PlayToday();" align=center>' + sPlay + '</DIV>';
    }
    let sMainTitle = 'Archive'
    sArchive == sMainTitle;
    sArchive += '<DIV Id="Archive_Consolidated_Title" class="Archive_Consolidated_Title" align=center>' + sMainTitle + '</DIV>';
    sArchive += '<DIV Id="Archive_Selections">';
    sArchive += TC_Archive_BySize_MakeButtons(); 
    sArchive += TC_Archive_ByDate_MakeButtonDiv();
    sArchive += '</DIV>'
    sArchive += '<DIV Id="Archive_Consolidated_Select_Div" class="Archive_Consolidated_Select_Div" align=center>' + 'namesgoher' + '</DIV>'
    sArchive += '</DIV>';
    return sArchive;
}
