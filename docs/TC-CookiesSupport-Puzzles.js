// TC-CookiesSupport-Puzzles.js

// this indicates which version is currently active
var g_Cookie_Puzzle_iIndexCurrentVersion      = 1;
// these relate to all versions supported for reading
var g_Cookie_Puzzle_Versions_aRRofsNames      = [];
var g_Cookie_Puzzle_Versions_aRRofiCounts     = [];
var g_Cookie_Puzzle_Versions_aRRoffFunctions  = [];
// these are for the readback process
var g_Cookie_Puzzle_aRRofsCurrentValues       = [];
var g_Cookie_Puzzle_iIndexOfReadVersion      = -1;

function HandleCookie_Puzzle(sOurCookie_Puzzle)
{
    g_Cookie_bValid = false;
    if ( sOurCookie_Puzzle == '')
        return;
//
    let iEqual = sOurCookie_Puzzle.indexOf("=");
    if ( iEqual == -1 )
        return;
    let sCookieValue = sOurCookie_Puzzle.substring(iEqual + 1);
    g_Cookie_Puzzle_aRRofsCurrentValues.length = 0;
    g_Cookie_Puzzle_aRRofsCurrentValues = sCookieValue.split(g_cCookieDelimiter);
    let iValues = g_Cookie_Puzzle_aRRofsCurrentValues.length;
    if ( iValues < 1 )
        return;
    let sVersion = g_Cookie_Puzzle_aRRofsCurrentValues[0]; //1
    g_Cookie_Puzzle_iIndexOfReadVersion = -1;
    let iVersions = g_Cookie_Puzzle_Versions_aRRofsNames.length;
    for ( let i = 0; i < iVersions; i++ )
    {
        if ( g_Cookie_Puzzle_Versions_aRRofsNames[i] == sVersion )
            g_Cookie_Puzzle_iIndexOfReadVersion = i;
    }
    if ( g_Cookie_Puzzle_iIndexOfReadVersion == -1 )
        return;
    window[g_Cookie_Puzzle_Versions_aRRoffFunctions[g_Cookie_Puzzle_iIndexOfReadVersion]]();
}

function Puzzle_SetupVersions()
{ // we are not going to support old versions
    g_Cookie_Puzzle_Versions_aRRofsNames.push('V1.002'); 
    g_Cookie_Puzzle_Versions_aRRofiCounts.push(15); 
    g_Cookie_Puzzle_Versions_aRRoffFunctions.push('HandlePuzzleVersionV1d002');
//    
    g_Cookie_Puzzle_Versions_aRRofsNames.push('V1.003'); 
    g_Cookie_Puzzle_Versions_aRRofiCounts.push(11); 
    g_Cookie_Puzzle_Versions_aRRoffFunctions.push('HandlePuzzleVersionV1d003');
}

function HandlePuzzleVersionV1d002()
{
    let dummy = '';
    let iIndex = 1;
    dummy = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]; 
    g_Cookie_sAnswersPlayer = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_sStatusPlayer = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_sGridAnswersPlayer = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_sGridStatusPlayer = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_bPuzzleSolved = IsTrue(g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]);
    g_Cookie_bGridSolved = IsTrue(g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]);
    g_Cookie_bAnswersSolved = IsTrue(g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]);
    dummy = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    dummy =  g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_ElapsedTime_iSecondsPrevious = parseInt(g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]);
    g_SquaresPlaced_sStatus = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_CAB_sAnswerType = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_bValid = true;
}

function HandlePuzzleVersionV1d003()
{
    let iSize = g_Cookie_Puzzle_aRRofsCurrentValues.length;
    let iSizeNeeded = g_Cookie_Puzzle_Versions_aRRofiCounts[g_Cookie_Puzzle_iIndexOfReadVersion];
    if ( iSize != iSizeNeeded)
        return;
    let iIndex = 1;
    g_Cookie_sAnswersPlayer                 = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_sStatusPlayer                  = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_sGridAnswersPlayer             = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_sGridStatusPlayer              = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_bPuzzleSolved                  = IsTrue(g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]);
    g_Cookie_bGridSolved                    = IsTrue(g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]);
    g_Cookie_ElapsedTime_iSecondsPrevious   = parseInt(g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++]);
    g_SquaresPlaced_sStatus                 = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_CAB_sAnswerType                = g_Cookie_Puzzle_aRRofsCurrentValues[iIndex++];
    g_Cookie_bValid = true;
}

function MakeAndStoreCookie_CurrentPuzzle()
{
    let sValue = g_sPuzzleNumber;
    if ( sValue == '' || sValue == g_PuzzlePath_sTemplate_ReplaceMe )
        sValue = 'none';
    let sCookieName = 'SG2' + '-CurrentPuzzle';
    let sCookie = '';
    sCookie += sValue;
    let exdays = 365;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    let sFullCookie = sCookieName + "=" + sCookie + ";" + expires;
    document.cookie = sFullCookie;
}

function FromCookies_GetCurrentPuzzle()
{
    g_TC_sCurrentPuzzle_FromCookie = '';
    let sCookieCurrentPuzzle = 'SG2' + '-CurrentPuzzle';
    for ( let iCookie = 0; iCookie < g_iCookies ; iCookie++)
    {
        let sThisCookie = g_aCookies[iCookie];
        if ( sThisCookie.includes(sCookieCurrentPuzzle) )
        {
            let aOurValues = FromCookieParseContents(sThisCookie)
            if ( aOurValues.length == 1 )
            {
                g_TC_sCurrentPuzzle_FromCookie = aOurValues[0];
                if ( g_TC_sCurrentPuzzle_FromCookie == 'none')
                g_TC_sCurrentPuzzle_FromCookie = '';
            }
        }
    }
}

function StoreCookie_Puzzle()
{
// for CAB we need to wrap the player answers and status with the '|'
    let sCookieToAdd = MakeCookie_Puzzle()
    document.cookie = sCookieToAdd;
}

function MakeCookie_Puzzle()
{ 
// these need to be prepared
    let sVersion           = g_Cookie_Puzzle_Versions_aRRofsNames[g_Cookie_Puzzle_iIndexCurrentVersion]; 
    let iTotalTime         = g_ElapsedTime_iSecondsPrevious + g_ElapsedTime_iSecondsThisAttempt;
    let sAnswersPlayer     = g_CAB_aAnswersPlayer.join(g_cGeneralDelimiter);
    let sStatusPlayer      = g_CAB_aAnswersPlayerStatus.join(g_cGeneralDelimiter);
    let sGridAnswersPlayer = g_aGridAnswersPlayer.join('')
    let sGridStatusPlayer  = g_aGridStatusPlayer.join('')
    let sAnswerType        = g_CAB_aAnswerType.join(g_cGeneralDelimiter);
    let sCookieName = 'SG2' + '-' + g_sPuzzleNumber;
    let sCookie = '';
    sCookie += sVersion;                sCookie += g_cCookieDelimiter;
    sCookie += sAnswersPlayer;          sCookie += g_cCookieDelimiter;
    sCookie += sStatusPlayer;           sCookie += g_cCookieDelimiter;
    sCookie += sGridAnswersPlayer;      sCookie += g_cCookieDelimiter;
    sCookie += sGridStatusPlayer;       sCookie += g_cCookieDelimiter;
    sCookie += g_bPuzzleSolved;         sCookie += g_cCookieDelimiter;
    sCookie += g_bGridSolved;           sCookie += g_cCookieDelimiter;
    sCookie += iTotalTime.toString();   sCookie += g_cCookieDelimiter;
    sCookie += g_SquaresPlaced_sStatus; sCookie += g_cCookieDelimiter;
    sCookie += sAnswerType;             sCookie += g_cCookieDelimiter;
    sCookie += 99;
    let exdays = 365;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    let sFullCookie = sCookieName + "=" + sCookie + ";" + expires;// + ";path=/";
    return sFullCookie;
}

