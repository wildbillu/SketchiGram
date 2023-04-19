// TC-PuzzleFromFile.js
// 
// puzzle choices
// what ever happens the the final action needs to be
// a call to TC_SetDefaultFile(sFinalDefaultFile)
// absolute fallback && noFile Allowed choice - ...AsJS.  - it sets the image files directly

let g_TC_sPuzzle_CommandLine                = '';
let g_TC_sPuzzle_Archive                    = '';
let g_TC_sPuzzle_Cookie                     = '';
let g_TC_bFileAccess                        = false;

function TC_LoadFromThisPuzzle(sPuzzle)
{
    if ( sPuzzle == '' )
        return false;
    let sTextFileToLookFor = g_PuzzlePath_sBaseDirectory + sPuzzle + '/' + sPuzzle + '.txt'; 
    let sFileContents = TC_GetFile(sTextFileToLookFor, 'puzzle');
    if ( sFileContents == '' )
        return false;
    if ( !TC_ProcessFileContents(sFileContents) )
        return false;
    TC_SetFinalPuzzleFileNames(sPuzzle); // need to get the (image) file names correct
    TC_UseFileContents();
    return true;
}
function GetQueryLinePuzzleName()
{
    let sPageURL = window.location.search.substring(1);
    let aSplits = sPageURL.split('&');
    let iSplits = aSplits.length;
    let sOverride = '';
    if ( iSplits != 0 )
    {   
        for ( var iSplit = 0; iSplit < iSplits; iSplit++ )
        {
            var iFound = aSplits[iSplit].indexOf("puzzle");
            if ( iFound != -1 )
                sOverride = aSplits[iSplit];
        }
    }
    return sOverride;
}

function TC_GetOverrideName()
{
    let sTextFileToLookFor = 'StartingPuzzle.txt'; 
    let sStartingPuzzle = '';
    let sFileContents = TC_GetFile(sTextFileToLookFor, 'puzzle');
    if ( sFileContents == '' )
        return sStartingPuzzle;
    let aLines = sFileContents.split('\n');
    let iLines = aLines.length;
    if ( iLines != 0 )
    { // remove the new line or carriage return   
        sStartingPuzzle = aLines[0];
        sStartingPuzzle = sStartingPuzzle.substring(0, sStartingPuzzle.length - 1)
    }
    return sStartingPuzzle;
}


function TC_InitializeFromFileOrLoadAsJS()
{
    if ( !g_bConnectionIsWebBased )
    { // dont care about text file name and the other names are set in the AsJS file 
        TC_Puzzle_Load_AsJS();
        return;
    }
    g_TC_bFileAccess = true;
    let sQueryLineOverride = GetQueryLinePuzzleName();
    if ( TC_LoadFromThisPuzzle(g_TC_sPuzzle_Archive) )
    {
        g_TC_sPuzzle_Archive = ''; // don't want to use this again cause it's no good
        return;
    }
    g_TC_sPuzzle_Archive = ''; // don't want to use this again cause it's no good
    if ( TC_LoadFromThisPuzzle(g_TC_sPuzzle_Cookie) )
            return;
// so now we look to see if the search string is valid - hopefully this is valid forever    
    if ( TC_LoadFromThisPuzzle(sQueryLineOverride) )
        return;
// here we look for a file with the puzzle name
    let sOverrideStartingFile = TC_GetOverrideName();
    if ( sOverrideStartingFile != '' )
        g_TC_sPuzzle_NoArchive_NoCommandLine = sOverrideStartingFile;
    if ( TC_LoadFromThisPuzzle(g_TC_sPuzzle_NoArchive_NoCommandLine) )
        return;
    TC_Puzzle_Load_AsJS(); // all file reads have failed 
}

var sClues = '';
var sAnswers = '';
var sAnswersPlayers = '';
var sStatusPlayer = '';
var sAnswerLocation = '';
var SA_EB_sWords = '';
var SA_EB_sWordStatus = '';
var iGridWidth = 4;
var iGridHeight = 4;
var sGridAnswers = '';
var sGridNumbering = '';
var g_bUsedCookie = false;
var sGridSpecialClueLocations = '';
var sAnswersSpecialClueLocations = '';
var sClueTypes                  = 'S|S|N|N|N|N|N|N'; 

function TC_UseFileContents()
{   // now we need to figure out whether to use any cookie settings
    HandleCookiesOnStart();    
    g_bUsedCookie = false;
    if ( g_Cookie_bValid && g_Cookie_sPuzzle == g_sPuzzleName )
    { 
        CA_SetupGlobals(sClues, sAnswers, g_Cookie_sAnswersPlayer, g_Cookie_sStatusPlayer, sAnswerLocations, 
            g_Cookie_SA_EB_sWords, g_Cookie_SA_EB_sWordStatus, sAnswersSpecialClueLocations, sClueTypes);
        GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, g_Cookie_sGridAnswersPlayer, g_Cookie_sGridStatusPlayer, sGridNumbering, sGridSpecialClueLocations);
        g_bPuzzleSolved = g_Cookie_bPuzzleSolved;
        g_bGridSolved = g_Cookie_bGridSolved;
        g_bAnswersSolved = g_Cookie_bAnswersSolved;
        g_ElapsedTime_iSecondsPrevious = g_Cookie_ElapsedTime_iSecondsPrevious;
        g_bUsedCookie = true;
    }
    if ( !g_bUsedCookie )
    {
        CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer, sAnswerLocations, SA_EB_sWords, SA_EB_sWordStatus, sAnswersSpecialClueLocations, sClueTypes)
        GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering, sGridSpecialClueLocations)
        g_ElapsedTime_iSecondsPrevious = 0;
    }
    //    setline(sFilename + '.Updated:' + iUpdated + ';');
    return true;
}

function TC_ProcessFileContents(sFileContents)
{
    let iUpdated = 0;
    let aLines = sFileContents.split('\n');
    let iLines = aLines.length;
    for ( var iLine = 0; iLine < iLines; iLine++)
    {
        let sLine = aLines[iLine];
        sLine = sLine.substring(0, sLine.length - 1)
// the first are ones we will use as locals                
        if ( sLine.startsWith('sGridAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('iGridWidth=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iGridWidth = parseInt(aEntries[1]); iUpdated++;}}
        else if ( sLine.startsWith('iGridHeight=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iGridHeight = parseInt(aEntries[1]); iUpdated++;}}
        else if ( sLine.startsWith('iClueAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iClueAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sClues=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sClues = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswersPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswersPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswersPlayerStatus') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sStatusPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridAnswersPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswersPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridStatusPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridStatusPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridNumbering=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridNumbering = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswerLocations=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswerLocations = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('SA_EB_sWords=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){SA_EB_sWords = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('SA_EB_sWordStatus=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){SA_EB_sWordStatus = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridSpecialClueLocations=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridSpecialClueLocations = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswersSpecialClueLocations=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswersSpecialClueLocations = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sClueTypes=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sClueTypes = aEntries[1]; iUpdated++;}}
        // these we set directly
        else if ( sLine.startsWith('sPuzzleDate=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleDate = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleName=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleName = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleTitle=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleTitle = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('ST_sClue_Itself=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_ST_sClue_Itself = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSpecialClueBefore=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sSpecialClueBefore = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSpecialClueBeforeLine2=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sSpecialClueBeforeLine2 = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSpecialClueMiddle=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sSpecialClueMiddle = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sSpecialClueEnd=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sSpecialClueEnd = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleCreditAuthor=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleCreditAuthor = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleCreditDate=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleCreditDate = aEntries[1]; iUpdated++;}}
    }
    if ( iUpdated < g_File_iMinimumLines )
     {
//        setlineAdd('F.Update:' + iUpdated + '.Need:' + g_File_iMinimumLines)
        alert('F.Update:' + iUpdated + '.Need:' + g_File_iMinimumLines)
        return false;
     }   

     return true;
}

function TC_GetFile(sFileName, sConfirmingString)
{
    var xmlhr = new XMLHttpRequest();
    xmlhr.open( "GET", sFileName, false);
    xmlhr.send( null );
    var sResult = xmlhr.responseText;
    if ( sResult.search('404 Not Found') != -1 || sResult.search(sConfirmingString) == -1)
    {
        ('F.Didnotfindpuzzlefile:' + sFileName);
        return '';
    }
    return sResult;
}
