// TC-CAB-Helpers-Answers-Status.js

function CAB_ForRowLetter_GetSpecialClueType(iRow, iLetter)
{
    if ( g_CAB_aAnswerSpecialClueType.length == 0 )
        return g_cCode_AnswerType_Normal;
    let sSpecialClueCodes = g_CAB_aAnswerSpecialClueType[iRow];
    return sSpecialClueCodes.charAt(iLetter);
}

function CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
{
    var sAnswerPlayer = g_CAB_aAnswersPlayer[iRow];
    var cAnswerPlayer = sAnswerPlayer.charAt(iLetter)
    var bValid = CharValidEntry(cAnswerPlayer);
    return bValid
}

function CAB_ForRow_GetLength(iRow)
{
    return g_CAB_aAnswers[iRow].length;
}

function CAB_ForRowLetter_IsLastLetter(iRow, iLetter)
{
    var sAnswerPlayer = g_CAB_aAnswersPlayer[iRow];
    if ( iLetter == ( sAnswerPlayer.length - 1) )
        return true;
    return false;
}

function CAB_ForRowLetter_SetAnswerPlayer(cLetter, iRow, iLetter)
{
    let sAnswerPlayer = g_CAB_aAnswersPlayer[iRow];
    g_CAB_aAnswersPlayer[iRow] = replaceAt(sAnswerPlayer, iLetter, cLetter);
}

function CAB_ForRowLetter_SetStatusPlayer(cLetter, iRow, iLetter)
{
    var sStatusPlayer = g_CAB_aAnswersPlayerStatus[iRow];
    g_CAB_aAnswersPlayerStatus[iRow] = replaceAt(sStatusPlayer, iLetter, cLetter);
}
function CAB_ForRow_GetPlayerAnswer(iRow)
{
    return g_CAB_aAnswersPlayer[iRow];
}

function CAB_ForRowLetter_GetAnswer(iRow, iLetter)
{
    var sRow = g_CAB_aAnswers[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
{
    var sRow = g_CAB_aAnswersPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}
 
function CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
{
    return g_CAB_aAnswersPlayerStatus[iRow].charAt(iLetter);
}

