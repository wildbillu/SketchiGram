// TC-ScratchArea-EntryProcessing.js

function TC_SA_CheckIfEntryMatchesAnAnswer(iEntry, elemInputText)
{
    let sValue = g_SA_aWords[iEntry];
    sValue = sValue.toUpperCase();
    for ( let iAnswer = 0; iAnswer < g_CAB_aAnswers.length; iAnswer++ )
    {
        let sAnswer = g_CAB_aAnswers[iAnswer];
        if ( sAnswer == sValue )
        {
            let sMessage = sValue + ' is a correct grid answer'
            TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Positive, 2, 3);
//            SG_UpdateAnswersCorrectInGridAndDisplay();
            let iIndex = parseInt(TC_SA_EntryFromId(g_SA_Focus_sId));
            g_SA_sWordStatus = replaceAt(g_SA_sWordStatus, iIndex, 'T');
            elemInputText.className = "SA_EB_Entry_Base SA_EB_Entry_Correct";
// move to the next available answer if one not complete otherwise just lose focus
            let bFound = false;
            let iTry = 0;
            while ( iTry < g_SA_iMaxEntries && !bFound )
            {
                if ( g_SA_sWordStatus.charAt(iTry) != 'T' )
                {
                    let elemNew = document.getElementById(TC_SA_MakeId(iTry));
                    elemNew.focus();
                    bFound = true;
                }
                iTry++; 
            }
            if ( !bFound )
                TC_SA_LoseFocus()            
            break;
        }
    }
}

function TC_SA_ForEntrySetWord(iEntry, sValueWithOrWithoutCursor)
{
    let sValueNoCursor = removeAllChar(sValueWithOrWithoutCursor, g_SA_cCursor);
    g_SA_aWords[iEntry] = sValueNoCursor;
}

function TC_SA_InsertCursorAt(sValue)
{// first remove any existing cursor
    let sValueNoCursor = removeAllChar(sValue, g_SA_cCursor);
    let sValueWithCorrectCursor = insertAt(sValueNoCursor, g_SA_iCursorPosition, g_SA_cCursor);
    return sValueWithCorrectCursor;
}

function TC_SA_AddCharFixup(sValue, sUpper)
{
    sValue = removeAllChar(sValue, g_SA_cCursor);
    sValue = insertAt(sValue, g_SA_iCursorPosition, sUpper);
    g_SA_iCursorPosition++;
    sValue = TC_SA_InsertCursorAt(sValue);
    return sValue;
}

function TC_SA_ForEntrySetWord(iEntry, sValueWithOrWithoutCursor)
{
    let sValueNoCursor = removeAllChar(sValueWithOrWithoutCursor, g_SA_cCursor);
    g_SA_aWords[iEntry] = sValueNoCursor;
}

