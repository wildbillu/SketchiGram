// TC-Archive-BySize.js

var g_TC_Archive_BySize_BaseMenu_iActiveSize = 4;
var g_TC_Archive_BySize_BaseMenu_iSizeMin = 4;
var g_TC_Archive_BySize_BaseMenu_iSizeMax = 8;
var g_TC_Archive_BySize_BaseMenu_aId   = [];

function TC_Archive_BySize_Clear()
{
    g_TC_Archive_BySize_BaseMenu_iActiveSize = 4;
    g_TC_Archive_BySize_BaseMenu_iSizeMin = 4;
    g_TC_Archive_BySize_BaseMenu_iSizeMax = 8;
    g_TC_Archive_BySize_BaseMenu_aId.length = 0;
}

function TC_Archive_BySize_SetWidths(iWidth)
{
    let iSizeButtons = g_TC_Archive_BySize_BaseMenu_aId.length;
    let iWidthBySize = ( iWidth - 100 )/iSizeButtons;
    for ( let i = 0; i < iSizeButtons; i++ )
        document.getElementById(g_TC_Archive_BySize_BaseMenu_aId[i]).style.width = MakePixelString(iWidthBySize);
}

function TC_Archive_BySize_SetInactive()
{
    g_TC_Archive_BySize_BaseMenu_iActiveSize = -1;
    TC_Archive_BySize_SetClasses();
}

function TC_Archive_BySize_SetClasses()
{
    for ( let i = g_TC_Archive_BySize_BaseMenu_iSizeMin; i < g_TC_Archive_BySize_BaseMenu_iSizeMax; i++)
    {
        let e = document.getElementById(TC_Archive_BySize_BaseMenu_Id(i))
        if ( i == g_TC_Archive_BySize_BaseMenu_iActiveSize )
            e.className = "Archive_Button_Selection_BySize_BaseMenu_Selected";
        else
            e.className = "Archive_Button_Selection_BySize_BaseMenu";
    }
}

// these functions fill the arrays so the base case archive can make menu
function TC_Archive_BySize_BaseMenu_Select(e)
{
    TC_Archive_ByDate_SetInactive();
    let iSize = TC_Archive_BySize_BaseMenu_SizeFromId(e.id)
    TC_Archive_BySize_BaseMenu_SelectFromSize(iSize);
    e.className = "Archive_Button_Selection_BySize_BaseMenu_Selected";
}

function TC_Archive_BySize_BaseMenu_SelectFromSize(iSize)
{
    if ( iSize == g_TC_Archive_BySize_BaseMenu_iActiveSize )
        return; // don't do anything
    g_TC_Archive_BySize_BaseMenu_iActiveSize = iSize;
    TC_Archive_BySize_SetClasses()
    TC_Archive_BySize_FillArraysWithPuzzles(iSize)
    g_TC_Archive_Menu_sActiveSortingBy = '  ' + iSize + ' X ' + iSize + '  ';
    TC_Archive_Consolidated_FillSelect_Div();
}

function TC_Archive_BySize_FillArraysWithPuzzles(iSize)
{
    g_TC_Archive_Menu_aActiveIds.length = 0;
    g_TC_Archive_Menu_aActiveTitles.length = 0;
    let iAt = 0;
    while ( iAt < g_TC_Archive_aPuzzleTitles.length )
    {
        let iThisSize = g_TC_Archive_aPuzzleSizes[iAt];
        if ( iThisSize == iSize )
        {
            let sId = TC_Archive_Id_Con(iAt);
            let sTitle = g_TC_Archive_aPuzzleTitles[iAt];
            g_TC_Archive_Menu_aActiveIds.push(sId);
            g_TC_Archive_Menu_aActiveTitles.push(sTitle);
            g_TC_Archive_Menu_aPuzzleIndex.push(iAt);
        }            
        iAt++;
    }
}

// these deal with the select size to display
function TC_Archive_BySize_MakeButtons()
{
    let sButtons = '';
    sButtons += '<DIV Id="BySizeButtons" class="Archive_BySize_Div">';
    sButtons += '<BUTTON class="Archive_BySize_Preamble">By Size</BUTTON>';
    for ( let iSize = 4; iSize < 9; iSize++ )
    {
        sId = TC_Archive_BySize_BaseMenu_Id(iSize);
        g_TC_Archive_BySize_BaseMenu_aId.push(sId);
        let sSize = iSize.toString();
        sTitle = sSize + ' X ' + sSize;
        sButtons += '<BUTTON Id="' + sId + '" class="Archive_Button_Selection_BySize_BaseMenu" onclick="TC_Archive_BySize_BaseMenu_Select(this);">' + sTitle + '</BUTTON>';
    }
    sButtons += '</DIV>'
    return sButtons;
}

function TC_Archive_BySize_BaseMenu_Id(iSize){let sId = 'A_BySize_BaseMenu_' + iSize.toString();return sId;}
function TC_Archive_BySize_BaseMenu_SizeFromId(sId){return sId.charAt(18);}

