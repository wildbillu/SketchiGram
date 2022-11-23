// TC-GRBMS-LoadClueAnswer.js

function GRBMS_MakeDualClue()
{
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;    
    elemCAB_DualClue = document.getElementById("GRBMS_Div_CAB_DualClue");
    elemCAB_DualClue.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemCAB_DualClue.style.top = MakePixelString(g_TC_iBiggestBottom);
    var iWidthClueAnswer = g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    elemCAB_DualClue.style.width = MakePixelString(iWidthClueAnswer);
    var iAccumulated = g_TC_Padding_Top_iSize;
// now we add 3 rows (of DIV)
    var sDualRow = '';
    sDualRow += '<DIV Id="CA01CI" class="CAB_Row_DualClue_Small CA_Color_InActive">' + g_ST_sClue_Intro + '</DIV>'
    sDualRow += '<DIV Id="CA01C" class="CAB_Row_DualClue CA_Color_InActive">' + g_ST_sClue_Itself + '</DIV>'
// we need to adjust the height of the dual clue depending on the size of the buttons
    // now we need to make the dual clue
    var sDualAnswers = '';
    sDualAnswers += '<DIV Id="CA_01_R">';
    sDualAnswers += '<TABLE width=' + iWidthClueAnswer + '><TR align=center><TD Id="GRBMS_Div_CAB_DualClue_Answers" class="GRBMS_Div_CAB_DualClue_Answers">'
    if ( g_bIsTwistiCross || g_bIsYourMove )
    {
        if ( g_Place_bPopupPlaceSupport )
            sDualAnswers += '<DIV class="GRBMS_Div_Inline">' + CA_MakePlaceButton(0)  + '</DIV>';
        if ( g_Place_bDirectPlaceSupport )
            sDualAnswers += '<DIV class="GRBMS_Div_Inline">' + TC_Place_Direct_Buttons(0) + '</DIV>';
    }
    sDualAnswers += '<DIV class="GRBMS_Div_Inline GRBMS_Clue_Text GRBMS_Clue_Right">' + g_sDualClueBefore + '</DIV>';
    sDualAnswers += '<DIV class="GRBMS_Div_Inline">' + CAB_MakeButtonsForAnswer(0) + '</DIV>';
    sDualAnswers += '<DIV class="GRBMS_Div_Inline GRBMS_Clue_Text GRBMS_Clue_Center">' + '&nbsp;&nbsp;' + g_sDualClueMiddle + '&nbsp;&nbsp;' + '</DIV>';
    sDualAnswers += '<DIV class="GRBMS_Div_Inline">' + CAB_MakeButtonsForAnswer(1) + '</DIV>';
    sDualAnswers += '<DIV class="GRBMS_Div_Inline GRBMS_Clue_Text GRBMS_Clue_Left">' + g_sDualClueEnd + '</DIV>';
    if ( g_bIsTwistiCross || g_bIsYourMove )
    {
        if ( g_Place_bPopupPlaceSupport )
            sDualAnswers += '<DIV class="GRBMS_Div_Inline">' + CA_MakePlaceButton(1)  + '</DIV>';
        if ( g_Place_bDirectPlaceSupport )
            sDualAnswers += '<DIV class="GRBMS_Div_Inline">' + TC_Place_Direct_Buttons(1) + '</DIV>';
    }
    sDualAnswers += '</TD></TR></TABLE></DIV>'
    sDualRow += sDualAnswers;
    elemCAB_DualClue.innerHTML = sDualRow;
//
    var elemIntro = document.getElementById("CA01CI");
    iAccumulated += 20;
    elemIntro.style.top = MakePixelString(iAccumulated);
    var elemClue = document.getElementById("CA01C");
    iAccumulated += 20;
    elemClue.style.top = MakePixelString(iAccumulated);
    elemClue.style.left = MakePixelString(100);
    iAccumulated += 30;
    iAccumulated += 20;
    elemCAB_DualClue.style.height = MakePixelString(iAccumulated);
    rect=elemCAB_DualClue.getBoundingClientRect();
    g_TC_iBiggestBottom += rect.height;
    CAB_ForRow_SetToInactive(0);
    CAB_ForRow_SetToInactive(1);
}

function GRBMS_LoadClueAnswer()
{
    GRBMS_MakeDualClue();
    var iWidthClueAnswer = g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
//
    var iWidthLeftRight = (iWidthClueAnswer - g_TC_Padding_Inter_Horizontal_iSize)/2;
    var iCluesLeftRight = (g_aClues.length - 2)/2;
    elemCAB_Clues_Left = document.getElementById("GRBMS_Div_CAB_Clues_Left");
    elemCAB_Clues_Left.style.top   = MakePixelString(g_TC_iBiggestBottom);
    elemCAB_Clues_Left.style.width = MakePixelString(iWidthLeftRight);
    elemCAB_Clues_Left.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    var iHeightLeft = GRBMS_MakeClueElemsAndAddToinnerHTMLReturnHeight(elemCAB_Clues_Left, 2, iCluesLeftRight);
    elemCAB_Clues_Left.style.height = MakePixelString(iHeightLeft);
    //
    elemCAB_Clues_Right = document.getElementById("GRBMS_Div_CAB_Clues_Right");
    elemCAB_Clues_Right.style.top   = MakePixelString(g_TC_iBiggestBottom);
    elemCAB_Clues_Right.style.width = MakePixelString(iWidthLeftRight);
    elemCAB_Clues_Right.style.left = MakePixelString(g_TC_Padding_Left_iSize + iWidthLeftRight + g_TC_Padding_Inter_Horizontal_iSize);
    var iHeightRight = GRBMS_MakeClueElemsAndAddToinnerHTMLReturnHeight(elemCAB_Clues_Right, (2 + iCluesLeftRight), iCluesLeftRight);
    var iMaxHeight = Math.max(iHeightLeft, iHeightRight);
    g_TC_iBiggestBottom += iMaxHeight;   
}

function GRBMS_MakeClueAnswerInnerds(iClue, iWidth)
{
    var sInner = '';
    var sClueAnswerId_Answer = 'Id="CAA_' + iClue +'"';
    var sClueAnswerId_Clue = 'Id="CAI_' + iClue +'"';
    var sClue = g_aClues[iClue];
    sInner += '<DIV width=' + iWidth + ' '  + sClueAnswerId_Answer + ' class="GBMRS_Div_CAB_Single_Row_Buttons">';
    var sButtons = CAB_MakeButtonsForAnswerWithButtons(iClue);
    sInner += sButtons;
    sInner += '</DIV>';
    sInner += '<Div width=' + iWidth + ' '  + sClueAnswerId_Clue + ' class="GBMRS_Div_CAB_Single_Row_Clue">' + sClue + '</DIV>';
    return sInner;
}

function GRBMS_MakeClueElemsAndAddToinnerHTMLReturnHeight(elemLeftOrRight, iClueStart, iClues)
{
// first we make the clue row divs
    var sElemInside = '';
    for ( var iC = 0; iC < iClues; iC++ )
    {
        var iClue = iClueStart + iC;
        var sClue_Single_Row_Id = GRBMS_SingleRowClueId(iClue);
        sElemInside += '<DIV Id="' + sClue_Single_Row_Id + '" class="GRBMS_Div_CAB_Clue_Single_Row">DDD</DIV>';
    }
    elemLeftOrRight.innerHTML = sElemInside;
// now we fill each
    var rectSide = elemLeftOrRight.getBoundingClientRect();
    var iWidth = rectSide.width;
    for ( var iCC = 0; iCC < iClues; iCC++ )
    {
        var iClue = iClueStart + iCC;
        var sClue_Single_Row_Id = GRBMS_SingleRowClueId(iClue);
        var elem = document.getElementById(sClue_Single_Row_Id);
        elem.style.width = MakePixelString(iWidth);
        var sInner = GRBMS_MakeClueAnswerInnerds(iClue, iWidth);
        elem.innerHTML = sInner;
        var sClueAnswerId_Answer = 'CAA_' + iClue;
        elemAnswer = document.getElementById(sClueAnswerId_Answer);
        elemAnswer.style.top = MakePixelString(5);
        var sClueAnswerId_Clue = 'CAI_' + iClue;
        elemAnswer = document.getElementById(sClueAnswerId_Clue);
        elemAnswer.style.top = MakePixelString(5);
    }
    for ( var iCCC = 0; iCCC < iClues; iCCC++ )
    {
        var iClue = iClueStart + iCCC;
        CAB_ForRow_SetToInactive(iClue);
    }
    var sClueStartId = GRBMS_SingleRowClueId(iClue);
    var elemClueStart = document.getElementById(sClueStartId)
    var rectClueStart = elemClueStart.getBoundingClientRect();
    var iSingleClueHeight = rectClueStart.height;
    var iHeight = iClues * iSingleClueHeight;
    return iHeight;
}

function GRBMS_SingleRowClueId(iRow)
{
    return CAB_MakeIdForRow(iRow);
}

function CAB_SingleRowClueBackgroundId(iRow)
{
    return CAB_MakeIdForRow(iRow);
}



