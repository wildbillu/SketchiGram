// TC-GRBMS-TopAndBottomMatter.js

function TC_MakeStatusControlRow()
{
    var iEstimatedTop = 35;
    let sButtonsHTML = '';
    let iButtons = 0;
    sButtonsHTML += Make_Button_Info(); iButtons++;
    sButtonsHTML += Make_Button_Settings(); iButtons++;
    let iWidthButtons = iButtons * g_GRBMS_TopRow_Buttons_iSize;
//
    let elemControlStatusRight = document.getElementById("Div_StatusControl_Right");
    elemControlStatusRight.innerHTML = sButtonsHTML;
    elemControlStatusRight.style.width = MakePixelString(iWidthButtons);
    elemControlStatusRight.style.height = MakePixelString(g_GRBMS_TopRow_Buttons_iSize);
    elemControlStatusRight.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemControlStatusRight.style.left = MakePixelString(g_Window_iWidth - iWidthButtons);
    return iWidthButtons;
}

function TC_SetTopMatter()
{
    var elemPuzzleType = document.getElementById("Div_PuzzleType");
    elemPuzzleType.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemPuzzleType.style.top = MakePixelString(g_TC_Padding_Bottom_iSize);
    elemPuzzleType.style.width = MakePixelString(g_Window_iWidth - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize);
    elemPuzzleType.innerHTML = 'SketchiGram&trade; Puzzle from Sketchi Bill at Absolutely Vocabulous&trade;';
    let rectType = GetBoundingClientRectAbsolute(elemPuzzleType);
    g_TC_iBiggestBottom += rectType.height;
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    let iWidthTitle = g_Window_iWidth - 2 * g_TC_Padding_Left_iSize;
    if ( g_InfoSettingsButtons_bActive )
        iWidthTitle -= TC_MakeStatusControlRow();
// determine rows in puzzle title
    let elemPuzzleTitle = document.getElementById("Div_PuzzleTitle");
    let iWidthIfOneLine = GetWidthOfTextInPixels(elemPuzzleTitle, g_sPuzzleTitle);
    let bOneLine = true;
    if ( iWidthIfOneLine > iWidthTitle )
        bOneLine = false;
    let iTop = g_TC_iBiggestBottom;
    if ( bOneLine )
        iTop += 10;
    elemPuzzleTitle.style.top = MakePixelString(iTop);
    elemPuzzleTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemPuzzleTitle.style.width = MakePixelString(iWidthTitle);
    elemPuzzleTitle.innerHTML = g_sPuzzleTitle;
    g_TC_iBiggestBottom += elemPuzzleTitle.style.height;
}

function TC_SetBottomMatter()
{
    let iHeight = SG_CA_HeightOrMinimum();
//
    let elemBottomMatter = document.getElementById("Div_BottomMatter");
    elemBottomMatter.innerHTML = '&copy; 2023 Northeast by Southwest, Inc.&nbsp;&nbsp;';
    elemBottomMatter.innerHTML += TC_Archive_AddButtonOrExtraSpace();
    elemBottomMatter.innerHTML += '&nbsp;&nbsp;SketchiToons&reg; by Sketchi Bill';
//
    let elemKB = document.getElementById("KB_Mini_Div");
    let rectKB = GetBoundingClientRectAbsolute(elemKB);
    let iBottomMatterTop = rectKB.bottom + g_TC_Padding_Inter_Vertical_iSize + iHeight; 
    elemBottomMatter.style.top = MakePixelString(iBottomMatterTop);
    let iWidth = g_Window_iWidth - g_TC_Padding_Right_iSize - g_TC_Padding_Left_iSize;
    elemBottomMatter.style.width = MakePixelString(iWidth);
    elemBottomMatter.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    //
    let rectBottomMatter = GetBoundingClientRectAbsolute(elemBottomMatter);
    g_TC_iBiggestBottom_NoExtras = rectBottomMatter.bottom;
    let elemMessages = document.getElementById("Messages");
    let iMessagesTop = rectBottomMatter.bottom + g_TC_Padding_Inter_Vertical_iSize;
    elemMessages.style.top = MakePixelString(iMessagesTop);
    elemMessages.style.width = MakePixelString(iWidth);
    elemMessages.style.left = MakePixelString( g_TC_Padding_Left_iSize);
    let rectMessages = GetBoundingClientRectAbsolute(elemMessages)
    g_TC_iBiggestBottom = rectMessages.bottom;
    TC_SetActiveSize();
}

function TC_ResetBottomMatter()
{
    return;
    let elemClue_Div = document.getElementById("SG_Clues_Div");
    let bHidden_Clues = (window.getComputedStyle(elemClue_Div).visibility === "hidden"); 
    let elemThemeImage = document.getElementById('ThemeImage_Base_Div');
    let bHidden_ThemeImage = (window.getComputedStyle(elemThemeImage).visibility === "hidden");
    let elemBottomMatter = document.getElementById("Div_BottomMatter");
    if ( !bHidden_Clues )
    {
        let rectClue = GetBoundingClientRectAbsolute(elemClue_Div);
        let iTop = rectClue.bottom;
        elemBottomMatter.style.top = MakePixelString(iTop)
    } 
    if ( !bHidden_ThemeImage)
    { // we should go back to biggest bottom
        let rectBottomMatter = GetBoundingClientRectAbsolute(elemBottomMatter);
        let iTop = g_TC_iBiggestBottom_NoExtras - rectBottomMatter.height;
        elemBottomMatter.style.top = MakePixelString(iTop)
    }
}





