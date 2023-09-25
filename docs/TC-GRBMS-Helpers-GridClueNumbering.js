// TC-GRBMS-Helpers-GridClueNumbering.js
function GR_PushDown(sAnswer, iNumber, iStartRow, iStartLetter)
{
    g_GR_aDownAnswers.push(sAnswer);
    g_GR_aDownAnswersNumber.push(iNumber);
    g_GR_aDownAnswersStartRow.push(iStartRow);
    g_GR_aDownAnswersStartLetter.push(iStartLetter);
    g_GR_aDownAnswersClueNumber.push(SG_Clues_IndexOfAnswer(sAnswer));
    TC_CA_MapToDownIfMatch(sAnswer, iStartRow, iStartLetter);
}

function GR_PushAcross(sAnswer, iNumber, iStartRow, iStartLetter)
{
    g_GR_aAcrossAnswers.push(sAnswer);
    g_GR_aAcrossAnswersNumber.push(iNumber);
    g_GR_aAcrossAnswersStartRow.push(iStartRow);
    g_GR_aAcrossAnswersStartLetter.push(iStartLetter);
    g_GR_aAcrossAnswersClueNumber.push(SG_Clues_IndexOfAnswer(sAnswer));
    TC_CA_MapToAcrossIfMatch(sAnswer, iStartRow, iStartLetter);
}

function TC_GRB_GetGridClueNumbering()
{
    g_aGridNumbers = g_sGridNumbering.split(g_cGeneralDelimiter);
    g_GR_aAcrossAnswers.length = 0;
    g_GR_aAcrossAnswersNumber.length = 0;
    g_GR_aAcrossAnswersStartRow.length = 0;
    g_GR_aAcrossAnswersStartLetter.length = 0;
    g_GR_aAcrossAnswersClueNumber.length = 0;
    for ( let iRR = 0; iRR < g_iGridHeight; iRR++ )
    {  // helpers for Grid - Across
        let iNumber = -1;
        let sAnswer = '';
        let iStartRow = -1;
        let iStartLetter = -1;
        for ( let iLL = 0; iLL < g_iGridWidth; iLL++ )
        {
            let cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_cCode_BlackSquare )
            {
                sAnswer += cThisChar;
                if ( iNumber == -1 )
                {
                    iNumber = g_aGridNumbers[iRR*g_iGridWidth+iLL];
                    iStartRow = iRR;
                    iStartLetter = iLL;
                }
            }
            else
            {
                if ( sAnswer != '' )
                {
                    if ( sAnswer.length != 1 )
                    {
                        GR_PushAcross(sAnswer, iNumber, iStartRow, iStartLetter)
                    }
                    iNumber = -1;
                    sAnswer = '';
                    iStartRow = -1;
                    sStartLetter = -1;
                }
            }
        }
        if ( sAnswer != '')
        {
            GR_PushAcross(sAnswer, iNumber, iStartRow, iStartLetter)
        }
    }
//
    g_GR_aDownAnswers.length = 0;
    g_GR_aDownAnswersNumber.length = 0
    g_GR_aDownAnswersStartRow.length = 0;
    g_GR_aDownAnswersStartLetter.length = 0;
    g_GR_aDownAnswersClueNumber.length = 0;
    for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
    {  // helpers for Grid - Down
        let iNumber = -1;
        let sAnswer = '';
        let iStartRow = -1;
        let iStartLetter = -1;
        for ( var iRR = 0; iRR < g_iGridHeight; iRR++ )
        {
            var cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_cCode_BlackSquare )
            {
                sAnswer += cThisChar;
                if ( iNumber == -1 )
                {
                    iNumber = g_aGridNumbers[iRR*g_iGridWidth+iLL];
                    iStartRow = iRR;
                    iStartLetter = iLL;
                }
            }
            else
            {
                if ( sAnswer != '' )
                {
                    if ( sAnswer.length != 1 )
                    {
                        GR_PushDown(sAnswer, iNumber, iStartRow, iStartLetter);
                    }
                    iNumber = -1;
                    sAnswer = '';
                }
            }
        }
        if ( sAnswer != '' )
        {
            GR_PushDown(sAnswer, iNumber, iStartRow, iStartLetter);
        }
    }
}