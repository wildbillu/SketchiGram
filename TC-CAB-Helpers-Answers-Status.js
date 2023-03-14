// TC-CAB-Helpers-Answers-Status.js

function CAB_ForRowLetter_GetDualClueCode(iRow, iLetter)
{
    if ( g_aAnswersDualClueLocations.length == 0 )
        return g_TC_cCodeMeaning_DualClue_None;
    let sDualClueCodes = g_aAnswersDualClueLocations[iRow];
    return sDualClueCodes.charAt(iLetter);
}
function CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    var cAnswerPlayer = sAnswerPlayer.charAt(iLetter)
    var bValid = CharValidEntry(cAnswerPlayer);
    return bValid
}

function CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    var cAnswerPlayer = sAnswerPlayer.charAt(iLetter)
    var bValid = CharValidEntry(cAnswerPlayer);
    return bValid
}

function CAB_ForRow_GetLength(iRow)
{
    return g_aAnswers[iRow].length;
}

function CAB_ForRowLetter_IsLastLetter(iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    if ( iLetter == ( sAnswerPlayer.length - 1) )
        return true;
    return false;
}

function CAB_ForRowLetter_SetAnswersPlayer(cLetter, iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    g_aAnswersPlayer[iRow] = replaceAt(sAnswerPlayer, iLetter, cLetter);
}

function CAB_ForRowLetter_SetStatusPlayer(cLetter, iRow, iLetter)
{
    var sStatusPlayer = g_aAnswersStatusPlayer[iRow];
    g_aAnswersStatusPlayer[iRow] = replaceAt(sStatusPlayer, iLetter, cLetter);
}
function CAB_ForRow_GetPlayerAnswer(iRow)
{
    return g_aAnswersPlayer[iRow];
}

function CAB_ForRowLetter_GetAnswer(iRow, iLetter)
{
    var sRow = g_aAnswers[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
{
    var sRow = g_aAnswersPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}
 
function CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
{
    return g_aAnswersStatusPlayer[iRow].charAt(iLetter);
}

function CAB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerAnswer = g_aAnswersPlayer[iRow];
    var sNew = replaceAt(sPlayerAnswer, iLetter, cAnswer);
    g_aAnswersPlayer[iRow] = sNew;
}
