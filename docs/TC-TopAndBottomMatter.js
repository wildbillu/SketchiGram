// TC-GRBMS-TopAndBottomMatter.js

function TC_MakeStatusControlRow()
{
    var iEstimatedTop = 35;
// load the status elements first
    var elemStatusControlLeft = document.getElementById("Div_StatusControl_Left");
    var sStatusControlElements = '';
    sStatusControlElements += '<DIV Id="StatusControl_Title" class="StatusControl_Title" bgcolor=#FFFFFF>Progress&nbsp&nbsp</DIV>';
    sStatusControlElements += '<DIV Id="StatusControl_GR"    class="StatusControl_GR_CA_Stats">Grid: 0 of 8</DIV>';
    sStatusControlElements += '<DIV Id="StatusControl_CA"    class="StatusControl_GR_CA_Stats">Clues: 0 0f 8</DIV>';
    elemStatusControlLeft.innerHTML = sStatusControlElements;
// adjust things     
    elemStatusControlLeft.style.top = MakePixelString(iEstimatedTop);
    elemStatusControlLeft.style.height = MakePixelString(g_GRBMS_TopRow_Buttons_iSize);
    elemStatusControlLeft.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    var iStatusControlWidth = 0;
    var eStatusControlTitle = document.getElementById("StatusControl_Title");
    eStatusControlTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    iStatusControlWidth += g_TC_Padding_Right_iSize;
// we use that style width of this 
    var rectStatusControlTitle = eStatusControlTitle.getBoundingClientRect();
// we adjust this to center it knowing the height of the containing div is
    var rectStatusControlTitle = eStatusControlTitle.getBoundingClientRect();
    var iHeightToCenter = (g_GRBMS_TopRow_Buttons_iSize - rectStatusControlTitle.height)/2;
    eStatusControlTitle.style.top = MakePixelString(iHeightToCenter);
    eStatusControlTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    iStatusControlWidth += rectStatusControlTitle.width + g_TC_Padding_Left_iSize;
    elemStatusControlLeft.style.width = MakePixelString(iStatusControlWidth)
// again we assume that the style has the right width
    var eGR = document.getElementById("StatusControl_GR");
    eGR.style.top = MakePixelString(iHeightToCenter);
    eGR.style.left = MakePixelString(iStatusControlWidth + g_TC_Padding_Left_iSize);
    var rectGR = eGR.getBoundingClientRect();
    iStatusControlWidth += rectGR.width + g_TC_Padding_Left_iSize;
    var eCA = document.getElementById("StatusControl_CA");
    eCA.style.top = MakePixelString(iHeightToCenter);
    eCA.style.left = MakePixelString(iStatusControlWidth + g_TC_Padding_Left_iSize);
    var rectCA = eCA.getBoundingClientRect();
    iStatusControlWidth += rectCA.width + g_TC_Padding_Left_iSize;
    elemStatusControlLeft.style.width = MakePixelString(iStatusControlWidth)
// now the buttons and right side
    var sButtonsHTML = '';
    var iButtons = 0;
    sButtonsHTML += Make_Button_Info(); iButtons++;
    sButtonsHTML += Make_Button_Settings(); iButtons++;
    sButtonsHTML += Make_Button_MoreActions(); iButtons++;
    iStatusControlWidth += g_GRBMS_TopRow_Buttons_iSize;
    let iWidthButtons = iButtons * g_GRBMS_TopRow_Buttons_iSize;
//
    var elemControlStatusRight = document.getElementById("Div_StatusControl_Right");
    elemControlStatusRight.innerHTML = sButtonsHTML;
    elemControlStatusRight.style.width = MakePixelString(iWidthButtons);

    elemControlStatusRight.style.top = MakePixelString(iEstimatedTop);
    elemControlStatusRight.style.left = MakePixelString(iStatusControlWidth + g_TC_Padding_Left_iSize);
    elemControlStatusRight.style.height = MakePixelString(g_GRBMS_TopRow_Buttons_iSize);
    iStatusControlWidth += iWidthButtons + g_TC_Padding_Left_iSize + g_TC_Padding_Right_iSize;
    if ( iStatusControlWidth > g_TC_iBiggestRight )
        g_TC_iBiggestRight = iStatusControlWidth;
}

function TC_SetTopMatter()
{
    TC_MakeStatusControlRow();
// now we add 
    var elemPuzzleType = document.getElementById("Div_PuzzleType");
    elemPuzzleType.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemPuzzleType.style.top = MakePixelString(3);
    g_TC_iBiggestBottom += 3;
    elemPuzzleType.style.width = MakePixelString(g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize);
    elemPuzzleType.innerHTML = 'SketchiGram&trade; Puzzle from Sketchi Bill at Absolutely Vocabulous&trade;';
    let rectType = GetBoundingClientRectAbsolute(elemPuzzleType);
    g_TC_iBiggestBottom += rectType.height;
// now we can adjust the position of the status row
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
//
    let elemStatusControlLeft = document.getElementById("Div_StatusControl_Left");
    elemStatusControlLeft.style.top = MakePixelString(g_TC_iBiggestBottom);
    let elemStatusControlRight = document.getElementById("Div_StatusControl_Right");
    elemStatusControlRight.style.top = MakePixelString(g_TC_iBiggestBottom);
    
    let rectControlRight =  GetBoundingClientRectAbsolute(elemStatusControlRight);
// determine rows in puzzle title
    let elemPuzzleTitle = document.getElementById("Div_PuzzleTitle");
    let iWidthAvailableForTitle = g_TC_iBiggestRight
    if ( g_bSettingsActive )
        iWidthAvailableForTitle = rectControlRight.left - g_TC_Padding_Left_iSize;
    let iWidthIfOneLine = GetWidthOfTextInPixels(elemPuzzleTitle, g_sPuzzleTitle);
    let bOneLine = true;
    if ( iWidthIfOneLine > iWidthAvailableForTitle )
        bOneLine = false;
    let iTop = g_TC_iBiggestBottom;
    if ( bOneLine )
        iTop += 10;
    elemPuzzleTitle.style.top = MakePixelString(iTop);
    elemPuzzleTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemPuzzleTitle.style.width = MakePixelString(iWidthAvailableForTitle);
    elemPuzzleTitle.innerHTML = g_sPuzzleTitle;
    g_TC_iBiggestBottom += rectControlRight.height;
    MoreActions_SizeAndPosition();
}

function TC_SetBottomMatter()
{
    let elemClue_Div = document.getElementById("SG_Clues_Div")
    let rectClue_Div = GetBoundingClientRectAbsolute(elemClue_Div);
    let iBottomClueDiv = rectClue_Div.bottom;
    g_TC_iBiggestBottom = iBottomClueDiv;
    let elemBottomMatter = document.getElementById("Div_BottomMatter");
    g_TC_iBiggestBottom += 1 * g_TC_Padding_Inter_Vertical_iSize + g_iFudgeSpace;
    elemBottomMatter.style.top = MakePixelString(g_TC_iBiggestBottom);
    var iWidth = g_TC_iBiggestRight - g_TC_Padding_Right_iSize - g_TC_Padding_Left_iSize;
    elemBottomMatter.style.width = MakePixelString(iWidth);
    elemBottomMatter.style.Left = MakePixelString(g_TC_Padding_Left_iSize);
    elemBottomMatter.innerHTML = '&copy; 2023 Northeast by Southwest, Inc.&nbsp;&nbsp;';
    elemBottomMatter.innerHTML += TC_Archive_AddButtonOrExtraSpace();
    elemBottomMatter.innerHTML += '&nbsp;&nbsp;SketchiToons&reg; by Sketchi Bill';
    rectBottomMatter = elemBottomMatter.getBoundingClientRect();
    g_TC_iBiggestBottom += rectBottomMatter.height;
//
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize + 2 * g_iFudgeSpace;

    var elemMessages = document.getElementById("Messages");
    elemMessages.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemMessages.style.width = MakePixelString(iWidth);
    elemMessages.style.Left = MakePixelString( g_TC_Padding_Left_iSize);
    var rectMessages = elemMessages.getBoundingClientRect();
    g_TC_iBiggestBottom += rectMessages.height;
    TC_SetActiveSize();
}






