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
    elemControlStatusRight.style.top = MakePixelString(iEstimatedTop);
    elemControlStatusRight.style.left = MakePixelString(iWidthButtons + g_TC_Padding_Left_iSize);
    elemControlStatusRight.style.height = MakePixelString(g_GRBMS_TopRow_Buttons_iSize);
}

function TC_SetTopMatter()
{
    if ( g_InfoSettingsButtons_bActive )
        TC_MakeStatusControlRow();
    // now we add 
    var elemPuzzleType = document.getElementById("Div_PuzzleType");
    elemPuzzleType.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemPuzzleType.style.top = MakePixelString(g_TC_Padding_Bottom_iSize);
    g_TC_iBiggestBottom += 3;
    elemPuzzleType.style.width = MakePixelString(g_Window_iWidth - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize);
    elemPuzzleType.innerHTML = 'SketchiGram&trade; Puzzle from Sketchi Bill at Absolutely Vocabulous&trade;';
    let rectType = GetBoundingClientRectAbsolute(elemPuzzleType);
    g_TC_iBiggestBottom += rectType.height;
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    let iWidthTitle = g_Window_iWidth - 2 * g_TC_Padding_Left_iSize;
    if ( g_InfoSettingsButtons_bActive )
    {
        let elemStatusControlRight = document.getElementById("Div_StatusControl_Right");
        elemStatusControlRight.style.top = MakePixelString(g_InfoSettingsButtons_iTop);
        elemStatusControlRight.style.left = MakePixelString(g_InfoSettingsButtons_iLeft);
        let rectControlRight =  GetBoundingClientRectAbsolute(elemStatusControlRight);
        iWidthTitle -= rectControlRight.width;
    }
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
    let elemClue_Div = document.getElementById("SG_Clues_Div")
    let rectClue_Div = GetBoundingClientRectAbsolute(elemClue_Div);
    let iBottomClueDiv = rectClue_Div.bottom;
    g_TC_iBiggestBottom = iBottomClueDiv;
    let elemBottomMatter = document.getElementById("Div_BottomMatter");
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    elemBottomMatter.style.top = MakePixelString(g_TC_iBiggestBottom);
    let iWidth = g_Window_iWidth - g_TC_Padding_Right_iSize - g_TC_Padding_Left_iSize;

    elemBottomMatter.style.width = MakePixelString(iWidth);
    elemBottomMatter.style.Left = MakePixelString(g_TC_Padding_Left_iSize);
    elemBottomMatter.innerHTML = '&copy; 2023 Northeast by Southwest, Inc.&nbsp;&nbsp;';
    elemBottomMatter.innerHTML += TC_Archive_AddButtonOrExtraSpace();
    elemBottomMatter.innerHTML += '&nbsp;&nbsp;SketchiToons&reg; by Sketchi Bill';
    rectBottomMatter = GetBoundingClientRectAbsolute(elemBottomMatter);
    g_TC_iBiggestBottom = rectBottomMatter.bottom + 2 * g_TC_Padding_Inter_Vertical_iSize;
    let elemMessages = document.getElementById("Messages");
    elemMessages.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemMessages.style.width = MakePixelString(iWidth);
    elemMessages.style.Left = MakePixelString( g_TC_Padding_Left_iSize);
    let rectMessages = elemMessages.getBoundingClientRect();
    g_TC_iBiggestBottom += rectMessages.height;
    TC_SetActiveSize();
}






