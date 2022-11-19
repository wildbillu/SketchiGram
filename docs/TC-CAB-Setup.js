// TC-CAB-Setup.js
//

function TC_CAB_AdjustSingleAnswerRows()
{
    for ( let iRow = 2; iRow < g_aClues.length; iRow++ )    
    {
        let elemContainer = document.getElementById(CAB_MakeIdForRow(iRow));
        elemContainer.style.width = MakePixelString(g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize);
        elemContainer.style.left = MakePixelString(g_TC_Padding_Left_iSize);
        let rectContainer = elemContainer.getBoundingClientRect();
        let Container_iTop = rectContainer.top;
        let Container_iRight = rectContainer.right;
        let Container_iLeft = rectContainer.left;
        //
        let iWidthAnswer = 30 * 4 + 30 * 2; // need to get this right
        let elemAnswer = document.getElementById(CAB_MakeIdForAnswerButtons(iRow));
        elemAnswer.style.top = MakePixelString(Container_iTop+1);
        elemAnswer.style.width = MakePixelString(iWidthAnswer);
        elemAnswer.style.left = MakePixelString(Container_iRight - iWidthAnswer)
        //
        let iAnswer_Left = Container_iRight - Container_iLeft - iWidthAnswer - 3 * g_TC_Padding_Inter_Horizontal_iSize;
        let iWidthClueText = iAnswer_Left;
        let elemClueText = document.getElementById(CAB_MakeIdForClueText(iRow));
        elemClueText.style.top = MakePixelString(Container_iTop+1);
        elemClueText.style.width = MakePixelString(iWidthClueText);
        elemClueText.style.left = MakePixelString(Container_iLeft);
    }
}

function CAB_MakeButtonsForAnswerWithButtons(iRow)
{
    var sInnerHTML = '';
    var iLength = g_aAnswers[iRow].length;
    for ( var iLetter = 0; iLetter < iLength; iLetter++ )
        sInnerHTML += CAB_MakeButtonSingleHTML(iRow, iLetter);
    if ( g_bIsTwistiCross || g_bIsYourMove )
    {
        if ( g_Place_bPopupPlaceSupport )
            sInnerHTML += CA_MakePlaceButton(iRow);
        if ( g_Place_bDirectPlaceSupport )
            sInnerHTML += TC_Place_Direct_Buttons(iRow);
    }
    return sInnerHTML;
}

function CAB_SetRow(iRow)
{
    var sClue = g_aClues[iRow];
    var sInnerHTML = CAB_MakeButtonsForAnswerWithButtons(iRow);
    var sAnswerElementId = CAB_MakeIdForAnswerButtons(iRow);
    var elemAnswer = document.getElementById(sAnswerElementId);
    elemAnswer.innerHTML = sInnerHTML;
//
    var sClueElementTextId =  CAB_MakeIdForClueText(iRow);
    var elemClue = document.getElementById(sClueElementTextId);
    elemClue.innerHTML = sClue;
}

function CAB_MakeRowEntry2toN(iRow)
{ // ids are CA_#_R CA_#_C CA_# CA_#_Place
    var sInner = '';
    sInner += '<DIV Id="' + CAB_MakeIdForRow(iRow) +         '" class="CAB_Row_Base"></DIV>'
    sInner += '<DIV Id="' + CAB_MakeIdForClueText(iRow) +    '" class="CAB_Clue_Text">CLUE</DIV>';
    sInner += '<DIV Id="' + CAB_MakeIdForAnswerButtons(iRow) +  '" class="CAB_Answer_Text">ANSWER</DIV>'
    return sInner;
}

function CAB_ClueAnswerSection_Load()
{
    var iLastRow = g_aClues.length;
// first we need to load the spa
    for ( var iRR = 2; iRR < iLastRow; iRR++ )
        CAB_SetRow(iRR);
    for ( var iR = 0; iR < iLastRow; iR++ )
        CAB_ForRow_SetToInactive(iR)
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    for ( var iRRR = 2; iRRR < iLastRow; iRRR++ )
    {
        var sId = CAB_MakeIdForRow(iRRR);
        elem = document.getElementById(sId);
        elem.style.top = MakePixelString(g_TC_iBiggestBottom)
        g_TC_iBiggestBottom += (32 + g_TC_Padding_Inter_Vertical_iSize); // fix this?;
    }
}

function CAB_MakeButtonsForAnswer(iRow)
{
    // used only for row 0 and 1
    var sInnerHTML = '';
    var iLength = g_aAnswers[iRow].length;
    for ( var iLetter = 0; iLetter < iLength; iLetter++ )
        sInnerHTML += CAB_MakeButtonSingleHTML(iRow, iLetter);
    return sInnerHTML;
}

function CAB_MakeButtonSingleHTML(iRow, iLetter)
{
    var sInnerRowHTML = '';
    var sFunctionsToCall = '';
    sFunctionsToCall += ' onkeypress="return CAB_onkeypress(event);"';
    sFunctionsToCall += ' onkeyup="return CAB_onkeyup(event.key,' + iRow + ',' + iLetter + ');"';
    sFunctionsToCall += ' onfocus="CAB_onfocus(this);"';
    sInnerRowHTML += '<BUTTON '
    sInnerRowHTML += CAB_MakeHTMLId(iRow, iLetter);
    sInnerRowHTML += ' class="' + g_CAB_Square_sClass + '" ';
    sInnerRowHTML += sFunctionsToCall;
    sInnerRowHTML += '>';
    return sInnerRowHTML;
}

function CAB_MakeIdForRow(iRow)
{
    return 'CA_' + iRow + '_R'
}

function CAB_MakeIdForClueText(iRow)
{
    return 'CA_' + iRow + '_C'
}
function CAB_MakeIdForAnswerButtons(iRow)
{
    return 'CA_' + iRow + '_A'
}
function CAB_MakeIdForPlaceButton(iRow)
{
    return 'CA_' + iRow + '_Place'
}

