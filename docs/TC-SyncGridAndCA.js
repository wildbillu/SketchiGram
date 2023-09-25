// TC-CA-SyncWithGrid.js

var g_CA_aMappingSpecial0ToGrid = [];
var g_CA_aMappingSpecial1ToGrid = [];

function TC_ShowSpecialClueAnswers()
{
    for ( let i = 0; i < 2; i++ )
    {
        if ( TC_ForIndexIsClueTypeSpecial(i) )
        {
            let iLength = g_CAB_aAnswers[i].length;
            for ( let iLetter = 0; iLetter < iLength; iLetter++ )
            {
                let cAnswer = CAB_ForRowLetter_GetAnswer(i, iLetter);
                let cAnswerPlayer = CAB_ForRowLetter_GetAnswerPlayer(i, iLetter);
                let cPlayerStatus = CAB_ForRowLetter_GetStatusPlayer(i, iLetter);
                if ( cPlayerStatus == g_cCode_Normal )
                {
                    if ( cAnswerPlayer == cAnswer )
                    {
                        CAB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, i, iLetter);
                    }
                    else
                    {
                        CAB_ForRowLetter_SetAnswerPlayer(cAnswer, i, iLetter)
                        CAB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, i, iLetter);
                    }
                    CAB_ForRowLetter_SetButton(i, iLetter);
                }
            }
            CAB_ForRow_SetToInactive(0);
        }
    }
}

function TC_SyncGridToSpecialAnswers()
{
    let bChange = false;
    if ( !g_bGridAndCA ) return bChange;
    for ( let i = 0; i < g_CA_aMappingSpecial0ToGrid.length; i++ )
    {
        let cPlayerAnswer = CAB_ForRowLetter_GetAnswerPlayer(0, i);
        let cAnswer       = CAB_ForRowLetter_GetAnswer(0, i);
        if ( cPlayerAnswer == cAnswer)
        {
            let sId = g_CA_aMappingSpecial0ToGrid[i];
            let iRow = GRB_RowFromId(sId);
            let iLetter = GRB_LetterFromId(sId);
            let cLetterExisting = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
            if ( cLetterExisting != cAnswer )
            { // what we want to do is an exchange
                let cNow = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                GRB_ReplaceMeReturnFoundId(iRow, iLetter, cAnswer, true, cNow)
                bChange = true;
            }
        }
    }
    for ( let i = 0; i < g_CA_aMappingSpecial1ToGrid.length; i++ )
    {
        let cPlayerAnswer = CAB_ForRowLetter_GetAnswerPlayer(1, i);
        let cAnswer       = CAB_ForRowLetter_GetAnswer(1, i);
        if ( cPlayerAnswer == cAnswer)
        {
            let sId = g_CA_aMappingSpecial1ToGrid[i];
            let iRow = GRB_RowFromId(sId);
            let iLetter = GRB_LetterFromId(sId);
            let cLetterExisting = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
            if ( cLetterExisting != cAnswer )
            {
                let cNow = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                GRB_ReplaceMeReturnFoundId(iRow, iLetter, cAnswer, true, cNow)
                bChange = true;
            }
        }
    }
    return bChange;
}

function TC_SyncSpecialAnswersToGrid()
{
    let bChange = false;
    if ( !g_bGridAndCA ) bChange;
    if ( TC_ForIndexIsClueTypeSpecial(0) )
    {
        for ( let i = 0; i < g_CA_aMappingSpecial0ToGrid.length; i++ )
        {
            let sId = g_CA_aMappingSpecial0ToGrid[i];
            let iRow = GRB_RowFromId(sId);
            let iLetter = GRB_LetterFromId(sId);
            let cPlayerAnswer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
            let cAnswer       = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
            if ( cPlayerAnswer == cAnswer )
            {
                let cPlayerExisting = CAB_ForRowLetter_GetAnswerPlayer(0, i);
                let cPlayerStatus   = CAB_ForRowLetter_GetStatusPlayer(1, i);
                if ( cPlayerExisting != cAnswer )
//                if ( cPlayerStatus != g_cCode_Golden && cPlayerExisting != cAnswer )
                {
                    CAB_ForRowLetter_SetAnswerPlayer(cAnswer, 0, i);
                    CAB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, 0, i);
                    CAB_ForRowLetter_SetButton(0, i, g_cCode_Inactive);
                    bChange = true;
                }
            }
        }
    }
    if ( TC_ForIndexIsClueTypeSpecial(1) )
    {
        for ( let i = 0; i < g_CA_aMappingSpecial1ToGrid.length; i++ )
        {
            let sId = g_CA_aMappingSpecial1ToGrid[i];
            let iRow = GRB_RowFromId(sId);
            let iLetter = GRB_LetterFromId(sId);
            let cPlayerAnswer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
            let cAnswer       = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
            if ( cPlayerAnswer == cAnswer )
            {
                let cPlayerExisting = CAB_ForRowLetter_GetAnswerPlayer(1, i);
                let cPlayerStatus   = CAB_ForRowLetter_GetStatusPlayer(1, i);
                if ( cPlayerStatus != g_cCode_Golden && cPlayerExisting != cAnswer )
                {
                    CAB_ForRowLetter_SetAnswerPlayer(cAnswer, 1, i);
                    CAB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, 1, i)
                    CAB_ForRowLetter_SetButton( 1, i, g_cCode_Inactive)
                    bChange = true;
                }
            }
        }
    }
    return bChange;
}

function TC_CA_MapToAcrossIfMatch(sAnswer, iStartRow, iStartLetter)
{
    let iLength = sAnswer.length;
    if ( sAnswer == g_CAB_aAnswers[0] )
    {
        g_CA_aMappingSpecial0ToGrid.length = 0;
        for ( let i = 0; i < iLength; i++ )
        {
            g_CA_aMappingSpecial0ToGrid.push(GRB_MakeId(iStartRow, i + iStartLetter));
        }
    }
    if ( sAnswer == g_CAB_aAnswers[1] )
    {
        g_CA_aMappingSpecial1ToGrid.length = 0;
        for ( let i = 0; i < iLength; i++ )
        {
            g_CA_aMappingSpecial1ToGrid.push(GRB_MakeId(iStartRow, i + iStartLetter));
        }
    }
}

function TC_CA_MapToDownIfMatch(sAnswer, iStartRow, iStartLetter)
{
    let iLength = sAnswer.length;
    if ( sAnswer == g_CAB_aAnswers[0] )
    {
        g_CA_aMappingSpecial0ToGrid.length = 0;
        for ( let i = 0; i < iLength; i++ )
        {
            g_CA_aMappingSpecial0ToGrid.push(GRB_MakeId(i + iStartRow, iStartLetter));
        }
        return;
    }
    if ( sAnswer == g_CAB_aAnswers[1] )
    {
        g_CA_aMappingSpecial1ToGrid.length = 0;
        for ( let i = 0; i < iLength; i++ )
        {
            g_CA_aMappingSpecial1ToGrid.push(GRB_MakeId(i + iStartRow, iStartLetter));
        }
    }
}
