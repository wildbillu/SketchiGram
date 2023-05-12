// TC-CodeHelpers.js

function TC_IsCorrect(cStatus)
{
    if (cStatus == g_cCode_Correct )
        return true;
    return false;
}

function TC_IsGoldenOrBlackSquare(cStatus)
{
    if ( TC_IsGolden(cStatus) )
        return true;
    if ( TC_IsBlackSquare(cStatus) )
        return true;
}

function TC_IsGolden(cStatus)
{
    if ( cStatus == g_cCode_Golden )
        return true;
    return false;
}

function TC_IsCorrectOrGolden(cStatus)
{
    if (cStatus == g_cCode_Correct || cStatus == g_cCode_Golden )
        return true;
    return false;
}

function TC_IsCorrectOrCorrected(cStatus)
{
    if (cStatus == g_cCode_Correct || cStatus == g_cCode_Corrected )
        return true;
    return false;
}

function TC_IsBlackSquare(cStatus)
{
    if (cStatus == g_cCode_BlackSquare )
        return true;
    return false;
}

function TC_IsCorrectCorrectedOrGolden(cStatus)
{
    if ( cStatus == g_cCode_Corrected || cStatus == g_cCode_Correct || cStatus == g_cCode_Golden )
        return true;
    return false;
}

function TC_IsCorrected(cStatus)
{
    if ( cStatus == g_cCode_Corrected )
        return true;
    return false;
}

function CharValidEntry(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_cCode_MeaningNotSet )
        return true;
    return false;
}

function IfCharNotSet(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_cCode_MeaningNotSet )
        return true;
    return false;
}
