// TC-Archive.js

var g_TC_Archive_aPuzzleNames = [];
var g_TC_Archive_aPuzzleTitles = [];
var g_TC_Archive_Menu_iStartAt = 0;
var g_TC_Archive_Menu_iMaxItems = 30;
var g_TC_Archive_Menu_aActiveIds =[];
var g_TC_Archive_Menu_aActiveTitles =[];
var g_TC_Archive_Menu_bActive = false;
var g_TC_Archive_Menu_iActiveCount = 0;

function TC_LoadPuzzleArchive_FromFile()
{
    if ( !g_bConnectionIsWebBased )
        return;
    let sTextFileToLookFor = 'Archive.txt'; 
    let sFileContents = TC_GetFile(sTextFileToLookFor, 'archive');
    if ( sFileContents == '' )
        return;
    let aLines = sFileContents.split('\n');
    let iLines = aLines.length;
    if ( iLines == 0 )
        return;
        g_TC_Archive_aPuzzleNames.length = 0;
        g_TC_Archive_aPuzzleTitles.length = 0;
    
    for ( let iLine = 0; iLine < iLines; iLine++)
    {
        let sLine = aLines[iLine];
        sLine = sLine.substring(0, sLine.length - 1)
        let aEntriesThisLine = sLine.split('=');
        if ( aEntriesThisLine.length == 2 )
        {
            let sPuzzleName = aEntriesThisLine[0];
            let sPuzzleTitle = aEntriesThisLine[1];
            TC_Archive_AddPuzzleToArchive(sPuzzleName, sPuzzleTitle)
        }
    }
}

function TC_LoadPuzzleArchive()
{
    TC_Archive_AddPuzzleToArchive('puzzle001', 'Yogi Berra Says!')
    TC_Archive_AddPuzzleToArchive('puzzle002', 'Beware The Ides!')
    TC_Archive_AddPuzzleToArchive('puzzle003', "How's Your Aim?")
    TC_Archive_AddPuzzleToArchive('puzzle004', 'Dinner Anyone?')
    TC_Archive_AddPuzzleToArchive('puzzle005', 'Play and collect rewards?')
    TC_Archive_AddPuzzleToArchive('puzzle006', 'Dr. Jekyll and Mr. Hyde?')
    TC_Archive_AddPuzzleToArchive('puzzle007', 'A Buzzer Beater?')
    TC_Archive_AddPuzzleToArchive('puzzle008', 'Perhaps found in your succotash?')
    TC_Archive_AddPuzzleToArchive('puzzle009', 'Outdoor Hot Spot?')
    TC_Archive_AddPuzzleToArchive('puzzle010', 'Zany Musicians')
    TC_Archive_AddPuzzleToArchive('puzzle011', 'Peak')
    TC_Archive_AddPuzzleToArchive('puzzle012', 'Rivalry')
    TC_Archive_AddPuzzleToArchive('puzzle013', 'Alistair Cookie\'s Chair')
    TC_Archive_AddPuzzleToArchive('puzzle014', 'Pub Game')
    TC_Archive_AddPuzzleToArchive('puzzle015', 'Constraint')
    TC_Archive_AddPuzzleToArchive('puzzle016', 'Required In School Zone')
    TC_Archive_AddPuzzleToArchive('puzzle019', 'Parade your beads this day')
    TC_Archive_AddPuzzleToArchive('puzzle020', 'Expert Gamer')
    TC_Archive_AddPuzzleToArchive('puzzle022', 'Famous Dire Straits Song')
    TC_Archive_AddPuzzleToArchive('puzzle021', 'Store in Quaint New England')
    TC_Archive_AddPuzzleToArchive('puzzle017', 'Seedy Neighborhood')
    TC_Archive_AddPuzzleToArchive('puzzle018', 'Fried Southern Treat')
    TC_Archive_AddPuzzleToArchive('puzzle023', 'John Prine Sings To Her')
//    TC_Archive_AddPuzzleToArchive('puzzle024', 'Odes do this')
    TC_Archive_AddPuzzleToArchive('puzzle025', 'Glory? Ore bust?')
//    TC_Archive_AddPuzzleToArchive('puzzle026', 'Like the cat that swallowed the canary')
}

function TC_Archive_AddButtonOrExtraSpace()
{
    let sInner = '';
    sInner = TC_Archive_MakeActivationButton();
//    else
//        sInner = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    return sInner;
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

function TC_Archive_Previous()
{
    g_TC_Archive_Menu_iStartAt -= g_TC_Archive_Menu_iMaxItems;
//    g_TC_Archive_Menu_iStartAt -= g_TC_Archive_Menu_aActiveIds.length;
    if ( g_TC_Archive_Menu_iStartAt < 0 )
        g_TC_Archive_Menu_iStartAt = 0;
    TC_Archive_UpdateMenu();
    TC_Archive_AdjustMenu();
} 

function TC_Archive_Next()
{
    g_TC_Archive_Menu_iStartAt += g_TC_Archive_Menu_aActiveIds.length;
    if ( g_TC_Archive_Menu_iStartAt > g_TC_Archive_aPuzzleTitles.length - 1 )
        return;
        TC_Archive_UpdateMenu();
    TC_Archive_AdjustMenu();
}

function TC_Archive_AdjustMenu()
{
    let iWidest = TC_Archive_WidestEntry();
    iWidest += 10;
    let sWidest = MakePixelString(iWidest);
    let iHeight = 0;
    let elemTitle = document.getElementById("Archive_Title");
    elemTitle.style.width = sWidest;
    iHeight += elemTitle.getBoundingClientRect().height;    
    let elemPrevious = document.getElementById("Archive_Previous");
    if ( elemPrevious )
    {
        elemPrevious.style.width = sWidest;
        iHeight += elemPrevious.getBoundingClientRect().height;
    }
    let iIds = g_TC_Archive_Menu_aActiveIds.length;
    for ( let iId = 0; iId < iIds; iId++ )
    {
        let elem = document.getElementById(g_TC_Archive_Menu_aActiveIds[iId]); //  all have same font
        elem.style.width = sWidest;
        iHeight += elem.getBoundingClientRect().height;    
    }
    let elemNext = document.getElementById("Archive_Next");
    if ( elemNext )
    {
        elemNext.style.width = sWidest;
        iHeight += elemNext.getBoundingClientRect().height;
    }
    let elemDiv = document.getElementById("Archive_Div");
    elemDiv.style.width = sWidest;
    elemDiv.style.height = MakePixelString(iHeight + 2);
// now center it just above the activate button
    let iTop = g_TC_iBiggestBottom - iHeight - 65;
    elemDiv.style.top = MakePixelString(iTop);
    let iLeft = TC_LeftForCentering(iWidest)
    elemDiv.style.left = MakePixelString(iLeft);
}

function TC_Archive_WidestEntry()
{
    let iIds = g_TC_Archive_Menu_aActiveIds.length;
    if ( iIds == 0 )
        return 100;
    let iWidth = 100;
    for ( let iId = 0; iId < iIds; iId++ )
    {
        let elem = document.getElementById(g_TC_Archive_Menu_aActiveIds[iId]); //  all have same font
        let iThisWidth = GetWidthOfTextInPixels(elem, g_TC_Archive_Menu_aActiveTitles[iId]);
        if ( iThisWidth > iWidth )
            iWidth = iThisWidth;
    }
    return iWidth;
}

function TC_Archive_Activate()
{
    if ( !g_TC_Archive_Menu_bActive )
        g_TC_Archive_Menu_iActiveCount = 0;
    g_TC_Archive_Menu_bActive = !g_TC_Archive_Menu_bActive;
    ForIdSetVisibility("Archive_Div", g_TC_Archive_Menu_bActive);
    return 0;
}

function TC_Archive_MakeActivationButton()
{
    let sId = "Archive_Button_Activate";
    let sArchiveButton = '<BUTTON class="Archive_Button_Activate TC_StartHidden" Id="' + sId + '" onclick="TC_Archive_Activate();">Show Archive</BUTTON>';
    return sArchiveButton;
}

function TC_Archive_UpdateMenu()
{   
    let sAll = TC_Archive_MakeMenuInner();
    let elemDiv = document.getElementById("Archive_Div");
    elemDiv.innerHTML = sAll;
}

function TC_Archive_MakeMenu()
{   
    let sAll = TC_Archive_MakeMenuInner();
    var sInner = '<DIV Id="Archive_Div" class="Archive_Div TC_StartHidden" align=center>' + sAll + '</DIV>';
    return sInner;
}

function TC_Archive_MakeMenuInner()
{   
    let sAll = '<DIV Id="Archive_Title" class="Archive_Title">Available Puzzles</DIV>';
    if ( g_TC_Archive_Menu_iStartAt != 0 )
    {
        let sId = 'Archive_Previous';
        let sTitle = '[Previous]';
        sAll += '<BUTTON class="Archive_Button_Selection" Id="' + sId + '" onclick="TC_Archive_Previous();">' + sTitle + '</BUTTON>';
    }
    let sArchiveButtons = TC_Archive_MakeButtons();
    sAll += sArchiveButtons;
//
    let iLastButtonNumber = g_TC_Archive_Menu_aActiveIds.length + g_TC_Archive_Menu_iStartAt;
    if ( iLastButtonNumber < g_TC_Archive_aPuzzleTitles.length )
    {
        let sId = 'Archive_Next';
        let sTitle = '[Next]';
        sAll += '<BUTTON class="Archive_Button_Selection" Id="' + sId + '" onclick="TC_Archive_Next();">' + sTitle + '</BUTTON>';
    }
    return sAll;
}

function TC_Archive_Id(i){return 'ArchiveItem_' + i;}
function TC_Archive_IndexFromId(sId)
{
    let s=sId.substring(12);
    return parseInt(s);
}

function TC_Archive_AddPuzzleToArchive(sName, sTitle)
{
    g_TC_Archive_aPuzzleNames.push(sName);
    g_TC_Archive_aPuzzleTitles.push(sTitle);
}

function TC_Archive_MakeButtons()
{
    g_TC_Archive_Menu_aActiveIds.length = 0;
    g_TC_Archive_Menu_aActiveTitles.length = 0;
    var sArchiveButtons = '';
    let iCount = 0;
    let iAt = g_TC_Archive_Menu_iStartAt;
    while ( iCount <  g_TC_Archive_Menu_iMaxItems && iAt < g_TC_Archive_aPuzzleTitles.length )
    {
        let sId = TC_Archive_Id(iAt);
        let sTitle = g_TC_Archive_aPuzzleTitles[iAt];
        sArchiveButtons += '<BUTTON class="Archive_Button_Selection" Id="' + sId + '" onclick="TC_Archive_Select(this);">' + sTitle + '</BUTTON>';
        g_TC_Archive_Menu_aActiveIds.push(sId);
        g_TC_Archive_Menu_aActiveTitles.push(sTitle);
        iCount++;
        iAt++;
    }
    return sArchiveButtons;
}
