// TC-Archive-Consolidated.js

function Archive_PlayToday()
{
    let sToday = TC_Archive_MakeTodayDateString();
    let iArchiveIndex = TC_Archive_FindPuzzleForDate(sToday);
    if ( iArchiveIndex == -1 )
        return;
    g_TC_sPuzzle_Archive  = g_TC_Archive_aPuzzleNames[iArchiveIndex];
    g_TC_iBiggestBottom = 0;
    g_SG_Clues_bCreated = false;
    SG_UpdateAnswersCorrectInGridAndDisplay();
    if ( g_DM_bActive ) g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Expert;
    g_SG_bAnswersCorrectInGridSet = false;
    g_bGridAndCA = false;
    g_TC_Status_bFirstCheck = true;
    TC_SA_ClearEntries();
//
    SG2_LoadAll(0);
}

function TC_Archive_Hide()
{
    ForIdSetVisibility("Archive_Consolidated_Div", false);
}

function TC_Archive_Show()
{
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

function TC_Archive_ActivationButtonSetPosition(iHeight)
{
    let sId = "Archive_Button_Activate";
    let elem = document.getElementById(sId)
    elem.style.top = MakePixelString(iHeight);
    let iWidth = 200;
    elem.style.left = TC_LeftForCentering(iWidth);
}

function TC_Archive_MakeActivationButton()
{
    let sId = "Archive_Button_Activate";
    let sArchiveButton = '<BUTTON Id="' + sId + '" class="Archive_Button_Activate TC_StartHidden" onclick="TC_Archive_ToggleVisibility();">Show Archive</BUTTON>';
    return sArchiveButton;
}

function TC_Archive_Select(elem)
{
    let iPuzzle = TC_Archive_IndexFromId(elem.id)
    g_TC_sPuzzle_Archive  = g_TC_Archive_aPuzzleNames[iPuzzle];
    g_TC_iBiggestBottom = 0;
    g_SG_Clues_bCreated = false;
    SG_UpdateAnswersCorrectInGridAndDisplay();
    if ( g_DM_bActive ) g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Expert;
    g_SG_bAnswersCorrectInGridSet = false;
    g_bGridAndCA = false;
    g_TC_Status_bFirstCheck = true;
    TC_SA_ClearEntries();
//
    SG2_LoadAll(0);
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

function TC_Archive_Consolidated_FillSelect_Div()
{
    let elem = document.getElementById("Archive_Consolidated_Select_Div");
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
        let sTitle = ''
        if ( TC_Archive_ByDate_YearMonths_iActive != -1 )
        {
            let iIndex = g_TC_Archive_Menu_aPuzzleIndex[iEntry];
            let sYearMonthDay = g_TC_Archive_aPuzzleReleaseDate[iIndex];
            let sDay = ' (' +TC_GetDayFromDate(sYearMonthDay) +') '
            sTitle += sDay;
        }
        sTitle += g_TC_Archive_Menu_aActiveTitles[iEntry];
        elem.innerHTML += '<BUTTON Id="' + sId + '" class="Archive_Button_Selection" onclick="TC_Archive_Select(this);">' + sTitle + '</BUTTON>';
        iEntry++;
        iAdded++;
// the element exists so we can determine the width
        let iThisWidth = TC_GetWidthOfInnerTextInPixels(sId);
        if ( iThisWidth > iBiggestWidth )
            iBiggestWidth = iThisWidth + 20;
    }
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
    iHeight += iAdded * TC_GetHeightOfElementById(g_TC_Archive_Menu_aActiveIds[g_TC_Archive_Menu_iStartAt]);
    elem.style.height = MakePixelString(iHeight);
// now add the top element heights 
    iHeight += TC_GetHeightOfElementById("Archive_Consolidated_Title")
    iHeight += TC_GetHeightOfElementById("Archive_Button_Header")
    if ( !g_TC_Archive_bDoingTodaysPuzzle )
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
    elem.style.top = MakePixelString(g_Archive_iTop);
}


function TC_Archive_Consolidated_Make_Div()
{
    let sArchive = ""
    sArchive += '<DIV Id="Archive_Consolidated_Div" class="Archive_Consolidated_Div TC_StartHidden" align=center>'
    if ( !g_TC_Archive_bDoingTodaysPuzzle )
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
