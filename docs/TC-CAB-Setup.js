// TC-CAB-Setup.js

let g_CAB_SpecialClue_bImageExpanded = false;

function CAB_MakeSpecialClueAnswerDiv()
{
    let elem_SpecialClue_Div = document.getElementById("SpecialClue_Div");
    elem_SpecialClue_Div.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elem_SpecialClue_Div.style.top = MakePixelString(g_SpecialClueFrame_iTop);
    let iSpecialClueWidth = g_Window_iWidth - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    elem_SpecialClue_Div.style.width = MakePixelString(iSpecialClueWidth);
    let iHeight = g_TC_Padding_Top_iSize + 70;
    elem_SpecialClue_Div.style.height = MakePixelString(iHeight);
// so now we add the ClueAnswer and Image Divs
    let sClueAnswerAndImageDivs = ''
    sClueAnswerAndImageDivs += '<TABLE  cellpadding=0 cellspacing=0 class="SpecialClue_Table"><TR>'
    sClueAnswerAndImageDivs += '<TD><DIV id="SpecialClue_ClueAnswer_Div" class="SpecialClue_ClueAnswer_Div">ClueAnswer</DIV></TD>';
    if ( g_SpecialClue_bShowImageButton )
        sClueAnswerAndImageDivs += '<TD><DIV id="SpecialClue_Image_Div" class="SpecialClue_Image_Div"></DIV></TD>';
    sClueAnswerAndImageDivs += '</TR></TABLE>'
    elem_SpecialClue_Div.innerHTML = sClueAnswerAndImageDivs;
// now fill the image section
    let iImageWidth = 0;
    if ( g_SpecialClue_bShowImageButton )
    {
        let elemImage = document.getElementById("SpecialClue_Image_Div");
        let sImageHTML = '<img Id="SpecialClue_ImageItself_Img" class="SpecialClue_ImageItself_Div" onclick="CAB_SpecialClueExpandHint();" src="' + g_PuzzlePath_sName_Image_Extra + '" alt="Extra" height="200">';
        elemImage.innerHTML = sImageHTML;
        let sId = "SpecialClue_ImageItself_Img";
        let elemImageItself = document.getElementById(sId);
        iImageWidth = iHeight * g_ThemeImage_All_fWidthToHeight;  // need to deal with aspect ratio
        elemImageItself.style.width = MakePixelString(iImageWidth);
        elemImageItself.style.height = MakePixelString(iHeight);
    }
// now fill the clue div
    let elemClueAnswer = document.getElementById("SpecialClue_ClueAnswer_Div")
    let iClueAnswerWidth = iSpecialClueWidth - iImageWidth;

    elemClueAnswer.style.width = MakePixelString(iClueAnswerWidth);
    elemClueAnswer.style.height = MakePixelString(iHeight);
    let sClueAnswerRow = '';
    sClueAnswerRow += '<DIV Id="SpecialClueItself_Div" class="SpecialClueItself CA_Color_InActive">' + g_ST_sClue_Itself + '</DIV>'
    // we need to adjust the height of the Special clue depending on the size of the buttons
    // now we need to make the Special clue
    let iFudgedWidth = iClueAnswerWidth * .8;
    sClueAnswerRow += '<DIV Id="SC_TableInside_Div" class="SC_TableInside_Div">'
    sClueAnswerRow += '<TABLE Id="SpecialClue_Table" width=' + iFudgedWidth + ' class="SpecialClue_Table" cellspacing=0 cellpadding=0><TR width=100>';
    if ( TC_ForIndexIsClueTypeSpecial(0) )
    {
        if ( g_sSpecialClueBeforeLine2 == '' )
        {
            sClueAnswerRow += '<TD Id="SC_Before" class="SpecialClue_Text TC_Right">' + g_sSpecialClueBefore + '</TD>';
        }
        else
        {
            let sRight = '';
            sRight += '<TD Id="SC_Before" class="SG_SpecialClue_Text_DualLine TC_Right">'
            sRight += '<DIV>' + g_sSpecialClueBefore + '</DIV>';
            sRight += '<DIV>' + g_sSpecialClueBeforeLine2 + '</DIV>';
            sRight +=  '</TD>';
//            alert(sRight)
            sClueAnswerRow += sRight;
        }
        sClueAnswerRow += '<TD class="SpecialClue_Padding">&nbsp;</TD>';
        let sButtons = CAB_MakeButtonsForAnswer(0);
        sClueAnswerRow += '<TD Id="SC_Buttons_0" class="SpecialClue_Button_Div">' + sButtons + '</TD>';
    }
    if ( g_sSpecialClueMiddle != '' )
    {
        sClueAnswerRow += '<TD class="SpecialClue_Padding">&nbsp;</TD>';
        sClueAnswerRow += '<TD Id="SC_Middle" class="SpecialClue_Text TC_Center">' + g_sSpecialClueMiddle + '</TD>';
    }
    if (  TC_ForIndexIsClueTypeSpecial(1) )
    {
        sClueAnswerRow += '<TD class="SpecialClue_Padding">&nbsp;</TD>';
        sClueAnswerRow += '<TD Id="SC_Buttons_1" class="SpecialClue_Button_Div">' + CAB_MakeButtonsForAnswer(1) + '</TD>';
        sClueAnswerRow += '<TD class="SpecialClue_Padding">&nbsp;</TD>';
        sClueAnswerRow += '<TD Id="SC_End" class="SpecialClue_Text TC_Left">' + g_sSpecialClueEnd + '</TD>';
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
    sInnerRowHTML += '<DIV tabindex="0" '
    sInnerRowHTML += CAB_MakeHTMLId(iRow, iLetter);
    sInnerRowHTML += ' class="' + g_CAB_Square_sClass + '" ';
    sInnerRowHTML += sFunctionsToCall;
    sInnerRowHTML += '></DIV>';
    return sInnerRowHTML;
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
        iWidth += 10;
    }
    if ( g_sSpecialClueMiddle != '' )
    {
        iWidth += 10;
        let elemMiddle = document.getElementById("SC_Middle");
        let iWidthElemMiddle = GetWidthOfTextInPixels(elemMiddle, g_sSpecialClueMiddle);
        elemMiddle.style.width = MakePixelString(iWidthElemMiddle);
        iWidth += iWidthElemMiddle;
    }
    if ( TC_ForIndexIsClueTypeSpecial(1) )
    {
        iWidth += 10;
        let elemButton1 = document.getElementById("SC_Buttons_1")
        let iLength = g_CAB_aAnswers[1].length;
        elemButton1.style.width = MakePixelString(iLength * g_CAB_Square_iSize)
        iWidth += iLength * g_CAB_Square_iSize;
        let elemEnd = document.getElementById("SC_End");
        let iWidthElemEnd = GetWidthOfTextInPixels(elemEnd, g_sSpecialClueEnd);
        elemEnd.style.width = MakePixelString(iWidthElemEnd);
        iWidth += iWidthElemEnd;
        iWidth += 10;
    }
//
    return iWidth;
}

function CAB_SpecialClueExpandClosed()
{
    let elemSCI = document.getElementById("SpecialClue_ImageItself_Img");
    elemSCI.style.cursor = "zoom-in";
    g_CAB_SpecialClue_bImageExpanded = false;
}

function CAB_SpecialClueExpandHint()
{
    if ( g_CAB_SpecialClue_bImageExpanded )
    {
        TC_ThemeImage_Popup_HidePopup();
        return;
    }
    let iTop = 150;
    let iLeft = g_TC_Padding_Left_iSize;
    let iWidth = g_Window_iWidth;
    let iHeight = iWidth/g_ThemeImage_All_fWidthToHeight;
    TC_ThemeImage_Popup_ShowPopup(g_PuzzlePath_sName_Image_Extra, iTop, iLeft, iHeight, iWidth, CAB_SpecialClueExpandClosed)
    let elemSCI = document.getElementById("SpecialClue_ImageItself_Img");
    elemSCI.style.cursor = "zoom-out";
    g_CAB_SpecialClue_bImageExpanded = true;
}
