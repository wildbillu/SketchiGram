// TC-CAB-Helpers-Answers-Status.js

function CA_ClearIncorrect()
{
    for ( let iRow = 0; iRow < 2; iRow++ )
    {
        if ( TC_ForIndexIsClueTypeSpecial(iRow) )
        {
            let iLength = g_CAB_aAnswers[iRow].length;
            for ( let iLetter = 0; iLetter < iLength; iLetter++ )
            {
                let cAnswer = CAB_ForRowLetter_GetAnswer(iRow, iLetter);
                let cAnswerPlayer = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                if ( cAnswer != cAnswerPlayer )
                {
                    CAB_ForRowLetter_SetAnswerPlayer(g_cCode_MeaningNotSet, iRow, iLetter);                    
                    CAB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, iRow, iLetter);    
                    CAB_ForRowLetter_SetButton(iRow, iLetter);
                }
            }
        }
    }
}

function CAB_CheckForCorrectAnswer()
{
    if ( g_CAB_abSetCorrect.length == 0)
    { g_CAB_abSetCorrect.push(false);g_CAB_abSetCorrect.push(false);}
//
    let sMessage = '';
    let abCorrect = [];
    let asWord = [];
    abCorrect.push(false);
    abCorrect.push(false);
    asWord.push('');
    asWord.push('');
    let iCorrect = 0;
    for ( let i = 0; i < 2; i++ )
    {
        if ( TC_ForIndexIsClueTypeSpecial(i) && !g_CAB_abSetCorrect[i])
        {
            let sAnswer = g_CAB_aAnswers[i];
            let sAnswerPlayer = g_CAB_aAnswersPlayer[i];
            if ( sAnswer == sAnswerPlayer )
            {
                iCorrect++;
                abCorrect[i] = true;
                asWord[i] = sAnswer;
                g_CAB_abSetCorrect[i] = true;
            }
        }
    }
    if ( abCorrect[0] )
        sMessage += asWord[0];
    if ( abCorrect[1])        
    {
        if ( sMessage != '' )
            sMessage += ' and '
        sMessage += asWord[1];
    }
    if ( iCorrect == 1 )
        sMessage += ' is a correct special clue answer'
    else
        sMessage + ' are correct special clue answers'
    return sMessage
}

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

