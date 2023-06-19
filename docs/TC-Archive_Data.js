// TC-Archive_Data.js

var g_TC_Archive_aPuzzleNames = [];
var g_TC_Archive_aPuzzleTitles = [];
var g_TC_Archive_aPuzzleSizes = [];
var g_TC_Archive_aPuzzleReleaseDate = [];

function TC_Archive_Id(i){return 'ArchiveItem_' + i;}
function TC_Archive_IndexFromId(sId){let s=sId.substring(12);return parseInt(s);}

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
        g_TC_Archive_aPuzzleNames.length = 0;
        g_TC_Archive_aPuzzleTitles.length = 0;
    
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
                if ( aParts.length = 3 )
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
    TC_Archive_AddPuzzleToArchive('puzzle024', 'Odes do this')
    TC_Archive_AddPuzzleToArchive('puzzle025', 'Glory? Ore bust?')
    TC_Archive_AddPuzzleToArchive('puzzle026', 'Like the cat that swallowed the canary')
}

function TC_Archive_AddPuzzleToArchive_All(sName, sTitle, sSize, sReleaseDate)
{
    g_TC_Archive_aPuzzleNames.push(sName);
    g_TC_Archive_aPuzzleTitles.push(sTitle);
    g_TC_Archive_aPuzzleSizes.push(sSize);
    g_TC_Archive_aPuzzleReleaseDate.push(sReleaseDate);
}

function TC_Archive_AddPuzzleToArchive(sName, sTitle)
{
    g_TC_Archive_aPuzzleNames.push(sName);
    g_TC_Archive_aPuzzleTitles.push(sTitle);
}

