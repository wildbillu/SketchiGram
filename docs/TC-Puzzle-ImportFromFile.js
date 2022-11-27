// TC-PuzzleFromFile.js
// 

function getFile(sFileName)
{
    var xmlhr = new XMLHttpRequest();
    xmlhr.open( "GET", sFileName, false);
    xmlhr.send( null );
    var sResult = xmlhr.responseText;
    if ( sResult.search('404 Not Found') != -1 || sResult.search('GridAnswers') == -1)
    {
        setline('F.Didnotfindpuzzlefile:' + g_PuzzleFile_sThisPuzzle_Text);
        return '';
    }
    return sResult;
}

function LoadPuzzleFromFile()
{
    if (window.location.protocol === "file:")
       return false;
    var sPageURL = window.location.search.substring(1);
    var aPairs = sPageURL.split('&');
    var iPairs = aPairs.length;
    // now we look for tag line 'puzzle=XXXX'
// where XXXX is the subdirectory where things will be found
// if there is nothing there then we have set things to default to latest
    var sOverride = '';
    if ( iPairs != 0 )
    {   
        for ( var iPair = 0; iPair < iPairs; iPair++ )
        {
            var iFound = aPairs[iPair].indexOf("puzzle=");
            if ( iFound != -1 )
               sOverride = aPairs[iPair].substring(iFound+7);
        }
    }
    var sResult = '';
    if ( sOverride != '' )
    {
        var sTxtFileToLookFor = 'puzzles/' + sOverride + '/' + sOverride + '.txt';
        sResult = getFile(sTxtFileToLookFor);
        g_PuzzleFile_sThisPuzzle_Text         = sTxtFileToLookFor;
        g_PuzzlePath_sThisPuzzle_Image        = 'puzzles/' + sOverride + '/' + sOverride + '.jpg';
        g_PuzzlePath_sThisPuzzle_Image_Extra  = 'puzzles/' + sOverride + '/' + sOverride + '-extra.jpg';
        g_PuzzlePath_sThisPuzzle_Image_Solved = 'puzzles/' + sOverride + '/' + sOverride + '-solved.jpg';
    }
    if ( sResult == '' )
    { // try the default name 
        sResult = getFile(g_PuzzleFile_sThisPuzzle_Text);
    }
    if ( sResult == '' )
    {
        return false;
    }
    var iUpdated = 0;
    var aLines = sResult.split('\n');
    var iLines = aLines.length;

    for ( var iLine = 0; iLine < iLines; iLine++)
    {
        var sLine = aLines[iLine];
        sLine = sLine.substring(0, sLine.length - 1)
// the first are ones we will use as locals                
        if ( sLine.startsWith('sGridAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('iGridWidth=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iGridWidth = parseInt(aEntries[1]); iUpdated++;}}
        else if ( sLine.startsWith('iGridHeight=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iGridHeight = parseInt(aEntries[1]); iUpdated++;}}
        else if ( sLine.startsWith('iClueAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){iClueAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sClues=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sClues = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswersPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswersPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sStatusPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sStatusPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridAnswers=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswers = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridAnswersPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridAnswersPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridStatusPlayer=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridStatusPlayer = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sGridNumbering=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sGridNumbering = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sAnswerLocations=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){sAnswerLocations = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('SA_EB_sWords=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){SA_EB_sWords = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('SA_EB_sWordStatus=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){SA_EB_sWordStatus = aEntries[1]; iUpdated++;}}
// these we set directly
        else if ( sLine.startsWith('sPuzzleDate=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleDate = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleName=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleName = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleTitle=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleTitle = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('ST_sClue_Itself=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_ST_sClue_Itself = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('ST_sClue_Intro=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_ST_sClue_Intro = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sDualClueBefore=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sDualClueBefore = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sDualClueMiddle=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sDualClueMiddle = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sDualClueEnd=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sDualClueEnd = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleCreditAuthor=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleCreditAuthor = aEntries[1]; iUpdated++;}}
        else if ( sLine.startsWith('sPuzzleCreditDate=') ){var aEntries=sLine.split('=');if ( aEntries.length == 2 ){g_sPuzzleCreditDate = aEntries[1]; iUpdated++;}}
    }
    if ( iUpdated < g_File_iMinimumLines )
     {
        setlineAdd('F.Update:' + iUpdated + '.Need:' + g_File_iMinimumLines)
        return false;
     }        
     // now we need to figure out whether to use any cookie settings
    var bUsedCookie = false;
    if ( g_Cookie_bValid && g_Cookie_sPuzzle == g_sPuzzleName )
    { 
        CA_SetupGlobals(sClues, sAnswers, g_Cookie_sAnswersPlayer, g_Cookie_sStatusPlayer, sAnswerLocations, g_Cookie_SA_EB_sWords, g_Cookie_SA_EB_sWordStatus);
        GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, g_Cookie_sGridAnswersPlayer, g_Cookie_sGridStatusPlayer, sGridNumbering);
        g_bPuzzleSolved = g_Cookie_bPuzzleSolved;
        g_bGridSolved = g_Cookie_bGridSolved;
        g_bAnswersSolved = g_Cookie_bAnswersSolved;
        bUsedCookie = true;

    }
    if ( !bUsedCookie )
    {
        CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer, sAnswerLocations, SA_EB_sWords, SA_EB_sWordStatus)
        GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering)
    }
    //    setline(sFilename + '.Updated:' + iUpdated + ';');
    return true;
}
