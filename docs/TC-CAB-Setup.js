// TC-CAB-Setup.js

function CAB_MakeSpecialClueAnswerDiv()
{
    let elem_SpecialClue_Div = document.getElementById("SpecialClue_Div");
    elem_SpecialClue_Div.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elem_SpecialClue_Div.style.top = MakePixelString(g_SpecialClueFrame_iTop);
    let iSpecialClueWidth = g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    elem_SpecialClue_Div.style.width = MakePixelString(iSpecialClueWidth);
    let iHeight = g_TC_Padding_Top_iSize + 70;
    elem_SpecialClue_Div.style.height = MakePixelString(iHeight);
// so now we add the ClueAnswer and Image Divs
    let sClueAnswerAndImageDivs = ''
    sClueAnswerAndImageDivs += '<TABLE  cellpadding=0 cellspacing=0 class="SpecialClue_Table"><TR>'
    sClueAnswerAndImageDivs += '<TD><DIV id="SpecialClue_ClueAnswer_Div" class="SpecialClue_ClueAnswer_Div">ClueAnswer</DIV></TD>';
    sClueAnswerAndImageDivs += '<TD><DIV id="SpecialClue_Image_Div" class="SpecialClue_Image_Div" onclick="SpecialExpand();">Click to Expand Hint</DIV></TD>';
    sClueAnswerAndImageDivs += '</TR></TABLE>'
    elem_SpecialClue_Div.innerHTML = sClueAnswerAndImageDivs;
// now fill the image section
    let elemImage = document.getElementById("SpecialClue_Image_Div");
    let fWidthToHeight = GetWidthToHeightRatioOfImageWithId("ThemeImage");
    let iImageWidth = iHeight * fWidthToHeight;  // need to deal with aspect ratio
    elemImage.style.width = MakePixelString(iImageWidth);
    elemImage.style.height = MakePixelString(iHeight);
    let sImage = '';
    sImage = TC_AddWrappedUrlToString(sImage, g_PuzzlePath_sName_Image_Extra, true);
    elemImage.style.backgroundImage = sImage;
    elemImage.style.backgroundSize = MakePixelString(iImageWidth);
// now fill the clue div
    let elemClueAnswer = document.getElementById("SpecialClue_ClueAnswer_Div")
    let iClueAnswerWidth = iSpecialClueWidth - iImageWidth;
    elemClueAnswer.style.width = MakePixelString(iClueAnswerWidth);
    elemClueAnswer.style.height = MakePixelString(iHeight);
    let sClueAnswerRow = '';
    sClueAnswerRow += '<DIV Id="SpecialClueItself_Div" class="SpecialClueItself CA_Color_InActive">' + g_ST_sClue_Itself + '</DIV>'
    // we need to adjust the height of the dual clue depending on the size of the buttons
    // now we need to make the dual clue
    let iFudgedWidth = iClueAnswerWidth * .8;
    sClueAnswerRow += '<DIV Id="SC_TableInside_Div" class="SC_TableInside_Div">'
    sClueAnswerRow += '<TABLE Id="SpecialClue_Table" width=' + iFudgedWidth + ' class="SpecialClue_Table" cellspacing=0 cellpadding=0><TR width=100>';
    if ( TC_ForIndexIsClueTypeSpecial(0) )
    {
        let sAdd = '';
        sAdd += '<TD Id="SC_Before" class="SpecialClue_Text GRBMS_Clue_Right">' + g_sSpecialClueBefore + '</TD>';
        let sButtons = CAB_MakeButtonsForAnswer(0);
        sAdd += '<TD Id="SC_Buttons_0" class="SpecialClue_Button_Div">' + sButtons + '</TD>';
        sClueAnswerRow += sAdd;
    }
    sClueAnswerRow += '<TD Id="SC_Middle" class="SpecialClue_Text GRBMS_Clue_Center">' + g_sSpecialClueMiddle + '</TD>';
    if (  TC_ForIndexIsClueTypeSpecial(1) )
    {
        let sAdd = '<TD Id="SC_Buttons_1" class="SpecialClue_Button_Div">' + CAB_MakeButtonsForAnswer(1) + '</TD>';
        sAdd += '<TD Id="SC_End" class="SpecialClue_Text GRBMS_Clue_Left">' + g_sSpecialClueEnd + '</TD>';
        sClueAnswerRow += sAdd;
    }
    sClueAnswerRow += '</TR></TABLE>';
    sClueAnswerRow += '</DIV>'
    let elemSpecialClue_ClueAnswer_Div = document.getElementById("SpecialClue_ClueAnswer_Div");
    elemSpecialClue_ClueAnswer_Div.innerHTML = sClueAnswerRow;
// now we need to set the table width so stuff is not spread out
    iSpecialClueWidth = SpecialClue_AdjustAndGetGetTotalWidth();
    let elemTable = document.getElementById("SpecialClue_Table");
    elemTable.style.width = MakePixelString(iSpecialClueWidth + 10)
//
    let elemClue = document.getElementById("SpecialClueItself_Div");
    elemClue.style.top = MakePixelString(g_TC_Padding_Top_iSize + 30);
    elemClue.style.left = MakePixelString(100);
    g_TC_iBiggestBottom += iHeight;
    if ( TC_ForIndexIsClueTypeSpecial(0) ) CAB_ForRow_SetToInactive(0);
    if ( TC_ForIndexIsClueTypeSpecial(1) ) CAB_ForRow_SetToInactive(1);
}

function CAB_MakeButtonsForAnswer(iRow)
{ // used only for row 0 and 1
    let sInnerHTML = '';
    let iLength = g_CAB_aAnswers[iRow].length;
    for ( let iLetter = 0; iLetter < iLength; iLetter++ )
        sInnerHTML += CAB_MakeButtonSingleHTML(iRow, iLetter);
    return sInnerHTML;
}

function CAB_MakeButtonSingleHTML(iRow, iLetter)
{
    let sInnerRowHTML = '';
    let sFunctionsToCall = '';
    sFunctionsToCall += ' onclick="CAB_onfocus(this);"'
    sFunctionsToCall += ' onkeypress="return CAB_onkeypress(event);"';
    sFunctionsToCall += ' onkeyup="return CAB_onkeyup(event.key,' + iRow + ',' + iLetter + ');"';
//    sFunctionsToCall += ' onfocus="CAB_onfocus(this);"';
    sInnerRowHTML += '<DIV '
    sInnerRowHTML += CAB_MakeHTMLId(iRow, iLetter);
    sInnerRowHTML += ' class="' + g_CAB_Square_sClass + '" ';
    sInnerRowHTML += sFunctionsToCall;
    sInnerRowHTML += '> </DIV>';
    return sInnerRowHTML;
}

function SpecialExpand()
{
    TC_ShowExtraImage()
}

function TC_ForIndexIsClueTypeSpecial(iIndex)
{
    if ( g_CAB_aAnswerType.length > iIndex && g_CAB_aAnswerType[iIndex] != g_cCode_ClueType_Special )
        return false;
    return true
}
function SpecialClue_AdjustAndGetGetTotalWidth()
{
    let iWidth = 0;
    if ( TC_ForIndexIsClueTypeSpecial(0) )
    {
        let elemButton0 = document.getElementById("SC_Buttons_0")
        let iLength = g_CAB_aAnswers[0].length;
        elemButton0.style.width = MakePixelString(iLength * g_CAB_Square_iSize)
        iWidth += iLength * g_CAB_Square_iSize;
        let elemBefore = document.getElementById("SC_Before");
        let iWidthElemBefore = GetWidthOfTextInPixels(elemBefore, g_sSpecialClueBefore);
        elemBefore.style.width = MakePixelString(iWidthElemBefore);
        iWidth += iWidthElemBefore;
    }
    let elemMiddle = document.getElementById("SC_Middle");
    let iWidthElemMiddle = GetWidthOfTextInPixels(elemMiddle, g_sSpecialClueMiddle);
    elemMiddle.style.width = MakePixelString(iWidthElemMiddle);
    iWidth += iWidthElemMiddle;
    if ( TC_ForIndexIsClueTypeSpecial(1) )
    {
        let elemButton1 = document.getElementById("SC_Buttons_1")
        let iLength = g_CAB_aAnswers[1].length;
        elemButton1.style.width = MakePixelString(iLength * g_CAB_Square_iSize)
        iWidth += iLength * g_CAB_Square_iSize;
        let elemEnd = document.getElementById("SC_End");
        let iWidthElemEnd = GetWidthOfTextInPixels(elemEnd, g_sSpecialClueEnd);
        elemEnd.style.width = MakePixelString(iWidthElemEnd);
        iWidth += iWidthElemEnd;
    }
//
    return iWidth;
}
