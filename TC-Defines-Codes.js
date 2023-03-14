// TC-Defines.js
var g_TC_cCodeMeaning_HasFocus  = 'F';
var g_TC_cCodeMeaning_ActiveRow = 'A';
var g_TC_cCodeMeaning_Inactive  = 'I';
var g_TC_cCodeMeaning_HasFocusBeingMoved  = 'M';

var g_TC_cCodeMeaning_DualClue_None = 'N';
var g_TC_cCodeMeaning_DualClue_Single = 'S';
var g_TC_cCodeMeaning_DualClue_Double = 'D';

var g_TC_cCodeMeaning_Normal                = 'N'; // 
var g_TC_cCodeMeaning_Incorrect             = 'I';
var g_TC_cCodeMeaning_IncorrectWithOverride = 'O';
var g_TC_cCodeMeaning_Corrected             = 'S';
var g_TC_cCodeMeaning_Correct               = 'C';
var g_TC_cCodeMeaning_Golden                = 'G';

var g_cColorCodeForCorrectLetter = 'G';
var g_cColorCodeForUnknownLetter = 'N';

var g_TC_cCharacterDenotingBlackSquare      = '.';
var g_TC_cCharacterDenotingNoNumberSquare   = '.';
var g_TC_cCharMeaningNotSet                 = '-';
var g_TC_cGeneralDelimiter                  = '|';
var g_cCookieDelimiter                      = '^';

function TC_CorrectOrGolden(cLetter)
{
    if (cLetter == g_TC_cCodeMeaning_Correct || cLetter == g_TC_cCodeMeaning_Golden )
        return true;
    return false;
}

function TC_CorrectCorrectedOrGolden(cLetter)
{
    if ( cLetter == g_TC_cCodeMeaning_Corrected || cLetter == g_TC_cCodeMeaning_Correct || cLetter == g_TC_cCodeMeaning_Golden )
        return true;
    return false;
}