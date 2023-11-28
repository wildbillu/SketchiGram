
// TC-Archive-Data.js
var g_TC_Archive_Cookie_iSize = -1;
var g_TC_Archive_Cookie_sYearMonth = 'notset';
var g_TC_Archive_TodaysPuzzle_bExists = false;
var g_TC_Archive_TodaysPuzzle_bDoing = false;
var g_TC_Archive_Menu_bActive = false;
var g_TC_Archive_Menu_iWidth = 0;

// these are all the items that might be shown in the active menu
var g_TC_Archive_Menu_aActiveIds = [];
var g_TC_Archive_Menu_aActiveTitles = [];
var g_TC_Archive_Menu_aPuzzleIndex = [];

var g_TC_Archive_Menu_iStartAt = 0;

var g_TC_Archive_Menu_iActiveCount = 0;
var g_TC_Archive_Menu_sActiveSortingBy = 'Stay Tuned';

// these are the available puzzles of all sizes and dates
var g_TC_Archive_PuzzleNames_arr = [];
var g_TC_Archive_PuzzleTitlePrefixes_arr = [];
var g_TC_Archive_PuzzleTitles_arr = [];
var g_TC_Archive_PuzzleSizes_arr = [];
var g_TC_Archive_PuzzleReleaseDate_arr = [];
var g_TC_Archive_PuzzleCreateDate_arr = [];
var g_TC_Archive_PuzzleCredit_arr = [];
var g_TC_Archive_PuzzleArtCredit_arr = [];

var g_TC_Archive_PuzzleTitlePrefixes_iLocation = 0;
var g_TC_Archive_PuzzleTitles_iLocation = 1;
var g_TC_Archive_PuzzleSizes_iLocation = 2;
var g_TC_Archive_PuzzleReleaseDate_iLocation = 3;
var g_TC_Archive_PuzzleCreateDate_iLocation = 4;
var g_TC_Archive_PuzzleCredit_iLocation = 5;
var g_TC_Archive_PuzzleArtCredit_iLocation = 6;

var g_TC_Archive_Puzzle_iRequired = 7;

function TC_Archive_AddPuzzleToArchive_All(sName, sTitlePrefix, sTitle, sSize, sReleaseDate, sPuzzleCreateDate, sPuzzleCredit, sPuzzleArtCredit)
{
    if ( g_Archive_bDontShowFuturePuzzles )
    {
        let today = new Date();  
        let d = TC_MakeDateObjectFromOurDateString(sReleaseDate);
        if ( d > today )
                return;
    }
// need to find index to insert at
// for now set this index to the size
    let iInitialLength = g_TC_Archive_PuzzleNames_arr.length;
//    
    let iInsert = 0;
    let dDateNew = TC_MakeDateObjectFromOurDateString(sReleaseDate);
    let bFound = false;
    while ( iInsert < iInitialLength && !bFound )
    {
        let sReleaseDateAt = g_TC_Archive_PuzzleReleaseDate_arr[iInsert]
        let dDateAtIndex = TC_MakeDateObjectFromOurDateString(sReleaseDateAt);
        if ( dDateAtIndex > dDateNew )
        {
            bFound = true;
        }
        else
            iInsert++;
    }
    if ( iInsert == 0 ) 
    {
        g_TC_Archive_PuzzleNames_arr.        unshift(sName);
        g_TC_Archive_PuzzleTitles_arr.       unshift(sTitle);
        g_TC_Archive_PuzzleSizes_arr.        unshift(sSize);
        g_TC_Archive_PuzzleReleaseDate_arr.  unshift(sReleaseDate);
        g_TC_Archive_PuzzleTitlePrefixes_arr.unshift(sTitlePrefix)
        g_TC_Archive_PuzzleCreateDate_arr.   unshift(sPuzzleCreateDate);
        g_TC_Archive_PuzzleCredit_arr.       unshift(sPuzzleCredit);
        g_TC_Archive_PuzzleArtCredit_arr.    unshift(sPuzzleArtCredit);
    }
    else if ( iInsert < iInitialLength )
    {
        g_TC_Archive_PuzzleNames_arr.        splice(iInsert, 0, sName);
        g_TC_Archive_PuzzleTitles_arr.       splice(iInsert, 0, sTitle);
        g_TC_Archive_PuzzleSizes_arr.        splice(iInsert, 0, sSize);
        g_TC_Archive_PuzzleReleaseDate_arr.  splice(iInsert, 0, sReleaseDate);
        g_TC_Archive_PuzzleTitlePrefixes_arr.splice(iInsert, 0, sTitlePrefix)
        g_TC_Archive_PuzzleCreateDate_arr.   splice(iInsert, 0, sPuzzleCreateDate);
        g_TC_Archive_PuzzleCredit_arr.       splice(iInsert, 0, sPuzzleCredit);
        g_TC_Archive_PuzzleArtCredit_arr.    splice(iInsert, 0, sPuzzleArtCredit);
    }
    else
    {
        g_TC_Archive_PuzzleNames_arr.        push(sName);
        g_TC_Archive_PuzzleTitles_arr.       push(sTitle);
        g_TC_Archive_PuzzleSizes_arr.        push(sSize);
        g_TC_Archive_PuzzleReleaseDate_arr.  push(sReleaseDate);
        g_TC_Archive_PuzzleTitlePrefixes_arr.push(sTitlePrefix)
        g_TC_Archive_PuzzleCreateDate_arr.   push(sPuzzleCreateDate);
        g_TC_Archive_PuzzleCredit_arr.       push(sPuzzleCredit);
        g_TC_Archive_PuzzleArtCredit_arr.    push(sPuzzleArtCredit);
    }
}

function TC_Archive_MakeEntry(iIndex)
{
    let sEntry = '';
    if ( g_ArchiveEntries_bShowPrefix )
    {
        let sPrefix = g_TC_Archive_PuzzleTitlePrefixes_arr[iIndex];
        if ( sPrefix != '' )
        {
            sEntry += sPrefix + '<br>'
        }
    }
    sEntry += g_TC_Archive_PuzzleTitles_arr[iIndex];
    return sEntry;
}

function TC_Archive_SetIntroScreenCredits()
{
    let elem = document.getElementById("OpeningText");
    let sCredits = TC_Archive_SetIntroScreenCreditsHTML(g_TitleInOpeningFrame_bShowPrefix)
    elem.innerHTML = sCredits;
//    ForIdSetVisibility("OpeningText", true)
}

function TC_Archive_SetIntroScreenCreditsHTML(bShowPrefix)
{
    let sCredits = '';
    sCredits += 'This Puzzle:' + '<br>'
    if ( bShowPrefix )
    {
        let sPrefix = TC_Archive_ForPuzzleName_GetPuzzleTitlePrefix(g_sPuzzleName);
        if ( sPrefix != '' )
        sCredits += sPrefix + '<br>';
    }
    let sTitle  = TC_Archive_ForPuzzleName_GetPuzzleTitle(g_sPuzzleName);
    sCredits += sTitle + '<br>';
    sCredits += g_sPuzzleCreditAuthor + '<br>';
    sCredits += 'Created:&nbsp;' + TC_Archive_ForPuzzleName_GetPuzzleCreateDateInWords(g_sPuzzleName);
    return sCredits
}

function TC_Archive_ForPuzzleName_GetPuzzleCreateDateInWords(sPuzzleName)
{
    let sDateinWords = 'notfound'
    let iIndex = TC_Archive_ForPuzzleName_GetIndex(sPuzzleName);
    if ( iIndex == -1 )
        return sDateinWords;
    sDateinWords = TC_Time_MakeWordStringFromOurFormat(g_TC_Archive_PuzzleCreateDate_arr[iIndex]);
    return sDateinWords;
}

function TC_Archive_ForPuzzleName_GetPuzzleTitlePrefix(sPuzzleName)
{
    let sPrefix = 'notfound'
    let iIndex = TC_Archive_ForPuzzleName_GetIndex(sPuzzleName);
    if ( iIndex == -1 )
        return sPrefix;
    return g_TC_Archive_PuzzleTitlePrefixes_arr[iIndex];
}

function TC_Archive_ForPuzzleName_GetPuzzleTitle(sPuzzleName)
{
    let sPrefix = 'notfound'
    let iIndex = TC_Archive_ForPuzzleName_GetIndex(sPuzzleName);
    if ( iIndex == -1 )
        return sPrefix;
    return g_TC_Archive_PuzzleTitles_arr[iIndex];
}

function TC_Archive_ForPuzzleName_GetIndex(sPuzzleName)
{
    return g_TC_Archive_PuzzleNames_arr.indexOf(sPuzzleName);
}

function TC_LoadPuzzleArchive_FromFile()
{
    if ( !g_bConnectionIsWebBased )
    {
       TC_LoadPuzzleArchiveDefault();
        return false;
    }
    let sTextFileToLookFor = 'Archive.txt'; 
    let sFileContents = TC_GetFile(sTextFileToLookFor, 'archive');
    if ( sFileContents == '' )
        return false;
    let aLines = sFileContents.split('\n');
    let iLines = aLines.length;
    if ( iLines == 0 )
        return false;
    TC_Archive_ClearAvailablePuzzles();
    for ( let iLine = 0; iLine < iLines; iLine++)
    {//puzzle059=Commander Literal&trade;'s hats have this|5|2023-08-11|style
        let sLine = aLines[iLine];
        sLine = sLine.substring(0, sLine.length - 1)
        let aEntriesThisLine = sLine.split('=');
        if ( aEntriesThisLine.length == 2 )
        {
            let sPuzzleArchiveName          = aEntriesThisLine[0];
// now we split the             
            if ( sPuzzleArchiveName.startsWith('puzzle') )
            {                
                let sDataThisPuzzle = aEntriesThisLine[1];
                let aParts = sDataThisPuzzle.split('|');
                if ( aParts.length >= g_TC_Archive_Puzzle_iRequired ) // either with or without the word at the end
                {
                    let sPuzzlePrefix       = FixSpecialCharacters(aParts[g_TC_Archive_PuzzleTitlePrefixes_iLocation]);
                    let sPuzzleArchiveTitle = FixSpecialCharacters(aParts[g_TC_Archive_PuzzleTitles_iLocation]);
                    let sSize               = aParts[g_TC_Archive_PuzzleSizes_iLocation];
                    let sReleaseDate        = aParts[g_TC_Archive_PuzzleReleaseDate_iLocation];
                    let sPuzzleCreateDate   = aParts[g_TC_Archive_PuzzleCreateDate_iLocation];
                    let sPuzzleCredit       = aParts[g_TC_Archive_PuzzleCredit_iLocation];
                    let sPuzzleArtCredit    = aParts[g_TC_Archive_PuzzleArtCredit_iLocation];
                    TC_Archive_AddPuzzleToArchive_All(sPuzzleArchiveName, sPuzzlePrefix, sPuzzleArchiveTitle, sSize, sReleaseDate, sPuzzleCreateDate, sPuzzleCredit, sPuzzleArtCredit);
                }
            }
        }
    }
    return true;
}

function TC_Archive_ClearActivePuzzles()
{
    g_TC_Archive_Menu_iStartAt = 0;
    g_TC_Archive_Menu_aActiveIds.length = 0;
    g_TC_Archive_Menu_aActiveTitles.length = 0;
    g_TC_Archive_Menu_aPuzzleIndex.length = 0;
    g_TC_Archive_Menu_iActiveCount = 0;
}

function TC_Archive_ClearAvailablePuzzles()
{
    g_TC_Archive_Menu_iStartAt = 0;
//
    g_TC_Archive_PuzzleNames_arr.length = 0;
    g_TC_Archive_PuzzleTitles_arr.length = 0;
    g_TC_Archive_PuzzleSizes_arr.length = 0;
    g_TC_Archive_PuzzleReleaseDate_arr.length = 0;
    g_TC_Archive_PuzzleTitlePrefixes_arr.length = 0;
    g_TC_Archive_PuzzleCreateDate_arr.length = 0;
    g_TC_Archive_PuzzleCredit_arr.length = 0;
    g_TC_Archive_PuzzleArtCredit_arr.length = 0;
}

function TC_Archive_Id_Con(i){return 'ArchiveItem-' + i;}
function TC_Archive_IndexFromId_Con(sId){let s=sId.substring(12);return parseInt(s);}

function TC_Archive_FindPuzzleForDate(sDateToFind)
{
    let iEntries = g_TC_Archive_PuzzleReleaseDate_arr.length;
    if ( iEntries == 0 )
        return -1;
    for ( let i = 0; i < iEntries; i++ )
    {
        let sThisDate = g_TC_Archive_PuzzleReleaseDate_arr[i];
        if ( sThisDate == sDateToFind )
        {
            return i;
        }
    }
    return -1;
}
//puzzle029=Commander Literal%26: Fractured Cuisine 1<br>|Fractured Cuisine 1 by Commander Literal&trade;|7|2023-10-24|2023-10-24|SketchiBill|SketchiBill|Canapes
//Grammar lesson from Commander Literal&trade;
function TC_LoadPuzzleArchiveDefault()
{ // in case file missing or local
    TC_Archive_ClearAvailablePuzzles();
    TC_Archive_AddPuzzleToArchive_All('puzzle026', 'Grammar lesson from Commander Literal&trade;',         'Like the cat that swallowed the canary', 4, '2023-10-08', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 5',                 5, '2023-12-13', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 3',                 3, '2023-10-13', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 4',                 4, '2023-11-13', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 6',                 6, '2023-11-10', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 7',                 7, '2023-12-11', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 8',                 3, '2023-12-05', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 9',                 4, '2023-12-01', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 10',                 5, '2023-12-20', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 11',                 6, '2023-12-10', '2023-10-13', 'SketchiBill', 'SketchiBill')
    TC_Archive_AddPuzzleToArchive_All('puzzle070', '70Prefix', 'Practice SketchiGram 12',                 7, '2023-10-11', '2023-10-13', 'SketchiBill', 'SketchiBill')
/*    
    TC_Archive_AddPuzzleToArchive_All('puzzle024', 'Odes do this', 4, '2023-10-01')
    TC_Archive_AddPuzzleToArchive_All('puzzle001', 'Yogi Berra Says!', 4, '2023-06-23')
    TC_Archive_AddPuzzleToArchive_All('puzzle050', 'Grammar lesson from Commander Literal&trade;',8,'2023-06-24')
    TC_Archive_AddPuzzleToArchive_All('puzzle002', 'Beware The Ides!', 4, '2023-06-22')
    TC_Archive_AddPuzzleToArchive_All('puzzle003', "How's Your Aim?", 4, '2023-06-07')
    TC_Archive_AddPuzzleToArchive_All('puzzle004', 'Dinner Anyone?', 4, '2023-06-06')
    TC_Archive_AddPuzzleToArchive_All('puzzle005', 'Play and collect rewards?', 4, '2023-06-21')
    TC_Archive_AddPuzzleToArchive_All('puzzle006', 'Dr. Jekyll and Mr. Hyde?', 4, '2023-06-20')
    TC_Archive_AddPuzzleToArchive_All('puzzle007', 'A Buzzer Beater?', 4, '2023-06-01')
    TC_Archive_AddPuzzleToArchive_All('puzzle008', 'Perhaps found in your succotash?', 4, '2023-06-02')
    TC_Archive_AddPuzzleToArchive_All('puzzle009', 'Outdoor Hot Spot?', 4, '2023-06-03')
    TC_Archive_AddPuzzleToArchive_All('puzzle010', 'Zany Musicians', 5, '2023-10-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle011', 'Peak', 4, '2023-09-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle012', 'Rivalry', 5, '2023-09-16')
    TC_Archive_AddPuzzleToArchive_All('puzzle013', 'Alistair Cookie\'s Chair', 5, '2023-05-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle014', 'Pub Game', 4, '2023-04-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle015', 'Constraint', 4, '2023-02-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle016', 'Required In School Zone', 5, '2023-03-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle019', 'Parade your beads this day', 5, '2023-03-22')
    TC_Archive_AddPuzzleToArchive_All('puzzle020', 'Expert Gamer', 7, '2023-03-25')
    TC_Archive_AddPuzzleToArchive_All('puzzle022', 'Famous Dire Straits Song', 7, '2023-01-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle021', 'Store in Quaint New England', 6, '2023-04-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle017', 'Seedy Neighborhood', 4, '2023-05-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle018', 'Fried Southern Treat', 4, '2023-07-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle023', 'John Prine Sings To Her', 4, '2023-08-06')
    TC_Archive_AddPuzzleToArchive_All('puzzle025', 'Glory? Ore bust?', 5, '2023-08-25')
*/
}

function TC_ValueForThisPuzzle_FromPuzzleFile(sPuzzle, sVariable)
{
    let iSizeOfVariable = sVariable.length;
    let sV = '';
    if ( sPuzzle == '' )
        return sV;
    let sTextFileToLookFor = g_PuzzlePath_sBaseDirectory + sPuzzle + '/' + sPuzzle + '.txt'; 
    let sFileContents = TC_GetFile(sTextFileToLookFor, 'puzzle');
    if ( sFileContents == '' )
        return sV;
    let iTitleIndex = sFileContents.indexOf(sVariable);
    if ( iTitleIndex == -1 )
        return sV;
    let sRest = sFileContents.substring(iTitleIndex + iSizeOfVariable);
    let iNewline = sRest.indexOf('\n');
    if ( iNewline == -1 )
        return sTitle
    sV = sRest.substring(0, iNewline - 1)
    return sV;
}
