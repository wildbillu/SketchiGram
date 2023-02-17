// TC-SG-SG2-CADisplayHelpers.js

var g_SG_Clues_bCreated = false;

var g_SG_Clues_Row0_bLengthSet = false;
var g_SG_Clues_Row0_bAnswerSet = false;
var g_SG_Clues_Row0_bLocationSet = false;
var g_SG_Clues_Row1_bLengthSet = false;
var g_SG_Clues_Row1_bAnswerSet = false;
var g_SG_Clues_Row1_bLocationSet = false;

function SG_Clues_ShowCorrect()
{
    for ( let iAcross = 0; iAcross < g_GR_aAcrossAnswers.length; iAcross++)
    {
        //g_GR_aAcrossAnswersNumber
        let sAnswer = g_GR_aAcrossAnswers[iAcross];
        let iLength = sAnswer.length;
        let bCorrect = true;
        let iRow = g_GR_aAcrossAnswersStartRow[iAcross];
        let iLetterStart = g_GR_aAcrossAnswersStartLetter[iAcross];
        for ( let iL = 0; iL < iLength; iL++ )
        {
            let cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetterStart + iL);
            let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetterStart + iL);
            if ( cAnswer != cAnswerPlayer ) bCorrect = false;
//            alert('A:' + sAnswer + '|' + cAnswer + '|' + cAnswerPlayer)        
        }
        if ( bCorrect )
            SG_Clues_ShowClue_ResetAnswer(g_GR_aAcrossAnswersClueNumber[iAcross], false, true, true)
    }
//
    for ( let iDown = 0; iDown < g_GR_aDownAnswers.length; iDown++)
    {
        //g_GR_aAcrossAnswersNumber
        let sAnswer = g_GR_aDownAnswers[iDown];
        let iLength = sAnswer.length;
        let bCorrect = true;
        let iLetter = g_GR_aDownAnswersStartLetter[iDown];
        let iRowStart = g_GR_aDownAnswersStartRow[iDown];
        for ( let iR = 0; iR < iLength; iR++ )
        {
            let cAnswer = GRB_ForRowLetter_GetAnswer(iRowStart + iR, iLetter);
            let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRowStart + iR, iLetter);
            if ( cAnswer != cAnswerPlayer ) bCorrect = false;
//            alert('A:' + sAnswer + '|' + cAnswer + '|' + cAnswerPlayer)        
        }
        if ( bCorrect )
            SG_Clues_ShowClue_ResetAnswer(g_GR_aDownAnswersClueNumber[iDown], false, true, true)
    }


}

function SG_Clues_IndexOfAnswer(sAnswer)
{
    for ( let i = 0; i < g_aAnswers.length; i++)
        if ( g_aAnswers[i] == sAnswer )
            return i;
    return -1; 
}

function SG_Clues_ForRow_ReturnIfPlayerGridCorrect(iRow)
{
    let sAnswer = ''
    for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            let cAP = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
            let cA  = GRB_ForRowLetter_GetAnswer(iRow, iLetter)
            if ( cAP ==  cA )
            {
                sAnswer += cAP;
            }
            else
            {
               return '';
            }
        }
    }
    return sAnswer;
}

function SG_Clues_ForLetter_ReturnIfPlayerGridCorrect(iLetter)
{
    let sAnswer = ''
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            let cAP = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
            if ( cAP == GRB_ForRowLetter_GetAnswer(iRow, iLetter) )
            {
                sAnswer += cAP;
            }
            else
            return '';
        }
    }
    return sAnswer;
}

function SG_Clues_ShowClue_Set0(bLength, bAnswer, bLocation)
{
    g_SG_Clues_Row0_bLengthSet = bLength;
    g_SG_Clues_Row0_bAnswerSet = bAnswer;
    g_SG_Clues_Row0_bLocationSet = bLocation;
}

function SG_Clues_ShowClue_Set1(bLength, bAnswer, bLocation)
{
    g_SG_Clues_Row1_bLengthSet = bLength;
    g_SG_Clues_Row1_bAnswerSet = bAnswer;
    g_SG_Clues_Row1_bLocationSet = bLocation;
}

function SG_Clues_ShowClue_ResetAll()
{
    for ( let iRow = 0; iRow < g_aAnswers.length; iRow++ )
        SG_Clues_ShowClue_ResetAnswer(iRow, true, false, false);
}


function SG_Clues_ShowClue_ResetAnswer(iRow, bShowLength, bShowAnswer, bShowGridLocation)
{   let sId = SG_MakeClueTextId(iRow);
    let elem = document.getElementById(sId);
//
    if ( iRow == 0 || iRow == 1 )
    {
        let bShowLength0 = bShowLength;
        let bShowAnswer0 = bShowAnswer;
        let bShowGridLocation0 = bShowGridLocation;
        let bShowLength1 = bShowLength;
        let bShowAnswer1 = bShowAnswer;
        let bShowGridLocation1 = bShowGridLocation;
        if ( iRow == 0 )
        {
            bShowLength1 = g_SG_Clues_Row1_bLengthSet;
            bShowAnswer1 = g_SG_Clues_Row1_bAnswerSet;
            bShowGridLocation1 = g_SG_Clues_Row1_bLocationSet;
            g_SG_Clues_Row0_bLengthSet = bShowLength;
            g_SG_Clues_Row0_bAnswerSet = bShowAnswer;
            g_SG_Clues_Row0_bLocationSet = bShowGridLocation;
        }
        else
        {
            bShowLength0 = g_SG_Clues_Row0_bLengthSet;
            bShowAnswer0 = g_SG_Clues_Row0_bAnswerSet;
            bShowGridLocation0 = g_SG_Clues_Row0_bLocationSet;
            g_SG_Clues_Row1_bLengthSet = bShowLength;
            g_SG_Clues_Row1_bAnswerSet = bShowAnswer;
            g_SG_Clues_Row1_bLocationSet = bShowGridLocation;
        }
        let sDualAnswerRow = '';
//         
        if ( bShowGridLocation0 ) sDualAnswerRow += SG_Position_Answer(0);
        sDualAnswerRow += g_sDualClueBefore;
       if ( bShowLength0 ) sDualAnswerRow += SG_Size_Answer(0);
       if ( bShowAnswer0 ) sDualAnswerRow += g_aAnswers[0];
//       
        sDualAnswerRow += g_sDualClueMiddle;
//
        if ( bShowLength1 ) sDualAnswerRow += SG_Size_Answer(1);
        if ( bShowAnswer1 ) sDualAnswerRow += g_aAnswers[1];
        sDualAnswerRow += g_sDualClueEnd;
        if ( bShowGridLocation1 ) sDualAnswerRow += SG_Position_Answer(1);
//
        let elemDualClue = document.getElementById(SG_MakeClueTextId(1));
        elemDualClue.innerHTML = sDualAnswerRow;
        SG_Clues_Div_SetVisibility(iRow, true);
        return;
    }
    let sCluePlus = '';
    if ( bShowGridLocation ) sCluePlus += SG_Position_Answer(iRow);
    sCluePlus += g_aClues[iRow];
    if ( bShowLength ) sCluePlus += SG_Size_Answer(iRow);
    if ( bShowAnswer ) sCluePlus += ' : ' + g_aAnswers[iRow];
    elem.innerHTML = sCluePlus;
    SG_Clues_Div_SetVisibility(iRow, true);
}

function SG_ShowClue_PlaceButtonEnabling(iAnswer, bEnabled)
{ // 

}

var g_SG2_CAB_bVisible = false;
var g_SG_SC_FrameOnly   = -1;
var g_SG_SC_ShowAll     = -2;
function SG_Clues_Div_SetVisibility(iIndex, bVisible)
{
    g_SG2_CAB_bVisible = bVisible;
    ForIdSetVisibility("SG_Clues_Div", bVisible)
    ForIdSetVisibility("Div_Grid_Image", !bVisible);
    if ( iIndex == -1 )
        return;
    if ( iIndex == 0 || iIndex == 1 || iIndex == -2 )
    {
        ForIdSetVisibility("SG_DualClue_Outer", bVisible)
        ForIdSetVisibility("SG_Clues_Text_Intro", bVisible)
        ForIdSetVisibility(SG_MakeClueTextId(0), bVisible)
        ForIdSetVisibility(SG_MakeClueTextId(1), bVisible)
    }
    if ( iIndex == -2 )
    {
        for ( let i = 2; i < g_aClues.length; i++ )
            ForIdSetVisibility(SG_MakeClueTextId(i), bVisible)
        return;
    }
    if ( iIndex > 1 )
        ForIdSetVisibility(SG_MakeClueTextId(iIndex), bVisible)
}

function SG_ShowClues(bShowLength, bShowGridLocation, bShowPlaceButtons)
{
    if ( g_SG_Clues_bCreated )
        return;
// need to know where to start - 
// since we might do this more than once we start at the bottom of the kb
//    var elemStartFromMe = document.getElementById("KB_Mini_Div");
//    var rectStartFromMe = elemStartFromMe.getBoundingClientRect();
//var iStartTop = rectStartFromMe.bottom + g_TC_Padding_Inter_Vertical_iSize;
g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    var elemClues = document.getElementById("SG_Clues_Div");
// first do the dual row stuff
    let iWidthClues = g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    elemClues.style.width = MakePixelString(iWidthClues);
//
    elemClues.style.top = MakePixelString(g_TC_iBiggestBottom);
    var sInnerFullDualClue = '';
// wrap this in the SG_DualClueOuter
    sInnerFullDualClue += '<DIV Id="SG_DualClue_Outer" class="SG_DualClue_Outer StartHidden">';
    sInnerFullDualClue += '<DIV Id="SG_Clues_Text_Intro" class="SG_DualClue_Text StartHidden">' + g_ST_sClue_Intro + '</DIV>';
    sInnerFullDualClue += '<DIV Id="' + SG_MakeClueTextId(0) + '" class="SG_DualClue_Text StartHidden">' + g_ST_sClue_Itself + '</DIV>';
//
    SG_Clues_ShowClue_Set0(bShowLength, false, bShowGridLocation)
    SG_Clues_ShowClue_Set1(bShowLength, false, bShowGridLocation)
    var sDualAnswerRow = '';
    if ( bShowGridLocation ) sDualAnswerRow += SG_Position_Answer(0);
    sDualAnswerRow += g_sDualClueBefore;
    if ( bShowLength ) sDualAnswerRow += SG_Size_Answer(0);
    sDualAnswerRow += g_sDualClueMiddle;
    if ( bShowLength ) sDualAnswerRow += SG_Size_Answer(1);
    sDualAnswerRow += g_sDualClueEnd;
    if ( bShowGridLocation ) sDualAnswerRow += SG_Position_Answer(1);
    let sWrappedDualClueItself = '<DIV Id="' + SG_MakeClueTextId(1) + '" class="SG_DualClue_Text StartHidden">' + sDualAnswerRow + '</DIV>';
    sInnerFullDualClue += sWrappedDualClueItself;
    sInnerFullDualClue += '</DIV>';
    elemClues.innerHTML += sInnerFullDualClue;
// now we add this partial and adjust things
    let iTopRelative = 0 ;
    iTopRelative += TC_MoveTopAndAdjustBiggestBottom("SG_Clues_Text_Intro", iTopRelative);
    document.getElementById("SG_Clues_Text_Intro").style.width = MakePixelString(iWidthClues);
    iTopRelative += TC_MoveTopAndAdjustBiggestBottom(SG_MakeClueTextId(0), iTopRelative);
    document.getElementById(SG_MakeClueTextId(0)).style.width = MakePixelString(iWidthClues);
    iTopRelative += TC_MoveTopAndAdjustBiggestBottom(SG_MakeClueTextId(1), iTopRelative);
    document.getElementById(SG_MakeClueTextId(1)).style.width = MakePixelString(iWidthClues);
    document.getElementById("SG_DualClue_Outer").style.height = MakePixelString(iTopRelative);
    document.getElementById("SG_DualClue_Outer").style.width = MakePixelString(iWidthClues);
    iTopRelative += 2;
//
    let sInner = '';
    var iMaxRow = g_aAnswers.length
    for ( var iRow = 2; iRow < iMaxRow; iRow++ )
    {
        var sCluePlus = '';
        if ( bShowGridLocation ) sCluePlus += SG_Position_Answer(iRow);
        sCluePlus += g_aClues[iRow];
        if ( bShowLength ) sCluePlus += SG_Size_Answer(iRow);
        var sWrapped = '<DIV Id="' + SG_MakeClueTextId(iRow) + '" class="SG_Clues_Text StartHidden">' + sCluePlus + '</DIV>'
        sInner += sWrapped;
    }
    elemClues.innerHTML += sInner;
// now we adjust the 2 to N
    for ( let iRow = 2; iRow < iMaxRow; iRow++ )
    {
    // this part is incase clue needs two rows
        let elemRow = document.getElementById(SG_MakeClueTextId(iRow));
// need to determine if we need two rows
        let iWidthThisRow = GetWidthOfTextInPixels(elemRow, elemRow.innerHTML);
        if ( iWidthThisRow > iWidthClues )
            elemRow.style.height = MakePixelString(2 * elemRow.getBoundingClientRect().height);
        iTopRelative += TC_MoveTopAndAdjustBiggestBottom(SG_MakeClueTextId(iRow), iTopRelative);
        document.getElementById(SG_MakeClueTextId(iRow)).style.width = MakePixelString(iWidthClues);
    }
    elemClues.style.height = MakePixelString(iTopRelative);
    g_SG_Clues_bCreated = true;
}

