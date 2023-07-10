// TC-Settings-Support.js
// settings

var g_sSettings_Versions_aNames  = [];
var g_sSettings_Versions_aCounts = [];
var g_sSettings_Version_Current_iIndex    = 4;

function Settings_SetupVersions()
{
    g_sSettings_Versions_aNames.push('V01.00'); g_sSettings_Versions_aCounts.push(12); 
    g_sSettings_Versions_aNames.push('V01.01'); g_sSettings_Versions_aCounts.push(12); 
    g_sSettings_Versions_aNames.push('V01.02'); g_sSettings_Versions_aCounts.push(12); 
    g_sSettings_Versions_aNames.push('V01.03'); g_sSettings_Versions_aCounts.push(14); 
    g_sSettings_Versions_aNames.push('V01.04'); g_sSettings_Versions_aCounts.push(16); 
}

var g_bSettings_DeleteCookiesOnStartUp = false;
var g_bSettings_CAGR_Answers_CheckRow = false;
var g_bSettings_ShowInfoOnStart = false;//true; 
var g_bSettings_CAGR_Answers_ShowCorrectLetters = true;
var g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = true;
var g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = true;
var g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = true;
var g_bSettings_CA_Display_ShowProgress = true; // not used now
var g_bSettings_GR_Display_ShowProgress = true; // not used now
var g_bSettings_CAGR_Display_Complete = true;
var g_iSettings_DaysToExpire = 30;

function HandleCookie_Settings(sOurCookie_Settings)
{
    if ( sOurCookie_Settings == '')
        return;
    let iEqual = sOurCookie_Settings.indexOf("=");
    if ( iEqual == -1 )
    {   
        setline('CS:cookiemissing=')
        return false;
    }
    let sCookieValue = sOurCookie_Settings.substring(iEqual + 1);
    let aOurValues = sCookieValue.split(g_cCookieDelimiter);
    let iOurValues = aOurValues.length;
    if ( iOurValues == 0 )
        return;
    let sVersionRead = aOurValues[0];
    let iVersionIndex = -1;
    for ( let i = 0; i < g_sSettings_Versions_aNames.length; i++ )
    {
        if ( g_sSettings_Versions_aNames[i] == sVersionRead )
            iVersionIndex = i;
    }
    if ( iVersionIndex == -1 )
        return false;
    if ( iOurValues != g_sSettings_Versions_aCounts[iVersionIndex] )
    {
        setline('CS:WrongNumberOfValues. Have:' + iOurValues + '.Need:' + g_sSettings_Versions_aCounts[iVersionIndex])
        return false;
    }
    let iOurValue = 1;
    g_bSettings_DeleteCookiesOnStartUp = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Answers_CheckRow = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_ShowInfoOnStart = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Answers_ShowCorrectLetters = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_CA_Display_ShowProgress = IsTrue(aOurValues[iOurValue++]);
    g_bSettings_GR_Display_ShowProgress = IsTrue(aOurValues[iOurValue++]);
    if ( iVersionIndex >= 2)
    {
        g_bSettings_CAGR_Display_Complete = IsTrue(aOurValues[iOurValue++]);
        g_Difficulty_iLevel_Settings = parseInt(aOurValues[iOurValue++]);
    }
    if ( iVersionIndex >= 3 )
    {
        g_Difficulty_iLevel_OnNewPuzzle = parseInt(aOurValues[iOurValue++]);
        g_iSettings_DaysToExpire = parseInt(aOurValues[iOurValue++]);
    }
    if ( iVersionIndex >= 4 )
    {
        g_TC_Archive_Cookie_iSize = parseInt(aOurValues[iOurValue++]);
        g_TC_Archive_Cookie_sYearMonth = aOurValues[iOurValue++];
    }
}

function MakeCookie_Settings()
{
    let sCookieName = 'SG2' + '-Settings'; 
    let sCookie = '';
    sCookie += g_sSettings_Versions_aNames[g_sSettings_Version_Current_iIndex];
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_DeleteCookiesOnStartUp;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Answers_CheckRow;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_ShowInfoOnStart;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Answers_ShowCorrectLetters;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CA_Display_ShowProgress;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_GR_Display_ShowProgress;
    sCookie += g_cCookieDelimiter; sCookie += g_bSettings_CAGR_Display_Complete;
    sCookie += g_cCookieDelimiter; sCookie += g_Difficulty_iLevel_Settings;
    sCookie += g_cCookieDelimiter; sCookie += g_Difficulty_iLevel_OnNewPuzzle;
    sCookie += g_cCookieDelimiter; sCookie += g_iSettings_DaysToExpire;
    sCookie += g_cCookieDelimiter; sCookie += g_TC_Archive_Cookie_iSize;
    sCookie += g_cCookieDelimiter; sCookie += g_TC_Archive_Cookie_sYearMonth;
//    
    const d = new Date();
    d.setTime(d.getTime() + (g_iSettings_DaysToExpire*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    var sFullCookie = sCookieName + "=" + sCookie + ";" + expires;// + ";path=/";
    return sFullCookie;
}

