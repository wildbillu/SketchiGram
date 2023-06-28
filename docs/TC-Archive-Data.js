// TC-Archive-Data.js
var g_TC_Archive_Menu_bActive = false;
// these are the available puzzles of all sizes and dates
var g_TC_Archive_aPuzzleNames = [];
var g_TC_Archive_aPuzzleTitles = [];
var g_TC_Archive_aPuzzleSizes = [];
var g_TC_Archive_aPuzzleReleaseDate = [];

// these are all the items that might be shown in the active menu
var g_TC_Archive_Menu_aActiveIds = [];
var g_TC_Archive_Menu_aActiveTitles = [];
var g_TC_Archive_Menu_aPuzzleIndex = [];

var g_TC_Archive_Menu_iStartAt = 0;
var g_TC_Archive_Menu_iMaxItems = 31;
var g_TC_Archive_Menu_iActiveCount = 0;
var g_TC_Archive_Menu_sActiveSortingBy = 'Stay Tuned';


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
    g_TC_Archive_aPuzzleNames.length = 0;
    g_TC_Archive_aPuzzleTitles.length = 0;
    g_TC_Archive_aPuzzleSizes.length = 0;
    g_TC_Archive_aPuzzleReleaseDate.length = 0;
    g_TC_Archive_Menu_iStartAt = 0;
}

function TC_Archive_Id(i){return 'ArchiveItem_' + i;}
function TC_Archive_IndexFromId(sId){let s=sId.substring(12);return parseInt(s);}

function TC_Archive_Id_Con(i){return 'ArchiveItem-' + i;}
function TC_Archive_IndexFromId_Con(sId){let s=sId.substring(12);return parseInt(s);}

function TC_Archive_MakeTodayDateString()
{
    const today = new Date(); 
    let sYear = today.getFullYear();
    let iMonth = today.getMonth() + 1;
    let sMonth = iMonth.toString();
    if ( iMonth < 10 ) sMonth = '0' + iMonth.toString();
    let iDate = today.getDate();
    let sDate = iDate.toString();
    if ( iDate < 10 ) sDate = '0' + iDate.toString();
    let sFull = sYear + '-' + sMonth + '-' + sDate;
    return sFull;
}

function TC_Archive_FindPuzzleForDate(sDateToFind)
{
    let iEntries = g_TC_Archive_aPuzzleSizes.length;
    if ( iEntries == 0 )
        return -1;
    for ( let i = 0; i < iEntries; i++ )
    {
        let sThisDate = g_TC_Archive_aPuzzleReleaseDate[i];
        if ( sThisDate == sDateToFind )
            return i;
    }
    return -1;
}

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
    TC_Archive_ClearAvailablePuzzles();
    for ( let iLine = 0; iLine < iLines; iLine++)
    {
        let sLine = aLines[iLine];
        sLine = sLine.substring(0, sLine.length - 1)
        let aEntriesThisLine = sLine.split('=');
        if ( aEntriesThisLine.length == 2 )
        {
            let sPuzzleArchiveName = aEntriesThisLine[0];
            let sPuzzleArchiveTitleSizeDate = aEntriesThisLine[1];
// now we split the             
            if ( sPuzzleArchiveName.startsWith('puzzle') )
            {                
            // now we split the
                let sPuzzleArchiveTitle = sPuzzleArchiveTitleSizeDate;
                let sSize = 4;
                let sDate = '2023-01-01'
                let aParts = sPuzzleArchiveTitleSizeDate.split('|');
                if ( aParts.length == 3 )
                {
                    sPuzzleArchiveTitle = aParts[0];
                    sSize = aParts[1];
                    sDate = aParts[2];
                }
                TC_Archive_AddPuzzleToArchive_All(sPuzzleArchiveName, sPuzzleArchiveTitle, sSize, sDate)
            }
        }
    }
}

function TC_LoadPuzzleArchive()
{ // in case file missing or local
    TC_Archive_ClearAvailablePuzzles();
    TC_Archive_AddPuzzleToArchive_All('puzzle001', 'Yogi Berra Says!', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle050', 'Grammar lesson from Commander Literal&trade;',8,'2023-07-24')
    TC_Archive_AddPuzzleToArchive_All('puzzle002', 'Beware The Ides!', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle003', "How's Your Aim?", 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle004', 'Dinner Anyone?', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle005', 'Play and collect rewards?', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle006', 'Dr. Jekyll and Mr. Hyde?', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle007', 'A Buzzer Beater?', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle008', 'Perhaps found in your succotash?', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle009', 'Outdoor Hot Spot?', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle010', 'Zany Musicians', 5, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle011', 'Peak', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle012', 'Rivalry', 5, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle013', 'Alistair Cookie\'s Chair', 5, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle014', 'Pub Game', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle015', 'Constraint', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle016', 'Required In School Zone', 5, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle019', 'Parade your beads this day', 5, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle020', 'Expert Gamer', 7, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle022', 'Famous Dire Straits Song', 7, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle021', 'Store in Quaint New England', 6, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle017', 'Seedy Neighborhood', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle018', 'Fried Southern Treat', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle023', 'John Prine Sings To Her', 4, '2023-06-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle025', 'Glory? Ore bust?', 5, '2023-08-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle026', 'Like the cat that swallowed the canary', 4, '2023-09-26')
    TC_Archive_AddPuzzleToArchive_All('puzzle024', 'Odes do this', 4, '2023-10-26')
}

function TC_Archive_AddPuzzleToArchive_All(sName, sTitle, sSize, sReleaseDate)
{
    g_TC_Archive_aPuzzleNames.push(sName);
    g_TC_Archive_aPuzzleTitles.push(sTitle);
    g_TC_Archive_aPuzzleSizes.push(sSize);
    g_TC_Archive_aPuzzleReleaseDate.push(sReleaseDate);
}
