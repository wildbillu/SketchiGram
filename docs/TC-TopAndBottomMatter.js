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
    if ( g_bIsTwistiCross )
        {sButtonsHTML += Make_Button_Direction(); iButtons++}
    sButtonsHTML += Make_Button_Info(); iButtons++;
    sButtonsHTML += Make_Button_Settings(); iButtons++;
    sButtonsHTML += Make_Button_MoreActions(); iButtons++;
    if ( g_bIsSketchiGramVariant2 )
    {    
        iStatusControlWidth += g_GRBMS_TopRow_Buttons_iSize;
    }
    var iWidthButtons = iButtons * g_GRBMS_TopRow_Buttons_iSize;
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
    if ( g_bIsTwistiCross )
        elemPuzzleType.innerHTML = 'TwistiCross&trade; with SketchiToons&reg; from Sketchi Bill at Absolutely Vocabulous&trade;';
    else if ( g_bIsYourMove )
        elemPuzzleType.innerHTML = 'It\'s Your Move Puzzle from Sketchi Bill at Absolutely Vocabulous&trade;';
    else if ( g_bIsSketchiGramVariant1 )
        elemPuzzleType.innerHTML = 'Sketchi-Gram Puzzle from Sketchi Bill at Absolutely Vocabulous&trade;';
    else if ( g_bIsSketchiGramVariant2 )
        elemPuzzleType.innerHTML = 'Sketchi-Gram&trade; Puzzle from Sketchi Bill at Absolutely Vocabulous&trade;';
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
//
    let elemPuzzleTitle = document.getElementById("Div_PuzzleTitle");
    if ( g_bIsSketchiGramVariant2 )
    {
        elemPuzzleTitle.style.top = MakePixelString(g_TC_iBiggestBottom);
        elemPuzzleTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
        elemPuzzleTitle.style.width = MakePixelString(rectControlRight.left - g_TC_Padding_Left_iSize);
    }
    g_TC_iBiggestBottom += rectControlRight.height;
//
    elemPuzzleTitle.innerHTML = g_sPuzzleTitle;
    if ( !g_bIsSketchiGramVariant2 )
    {
        g_TC_iBiggestBottom +=  - g_TC_Padding_Right_iSize;
        elemPuzzleTitle.style.top = MakePixelString(g_TC_iBiggestBottom);
        elemPuzzleTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
        elemPuzzleTitle.style.width = MakePixelString(g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize);
        let rectTitle = GetBoundingClientRectAbsolute(elemPuzzleTitle);
        g_TC_iBiggestBottom += rectTitle.height;
    }
//
    if ( !g_bIsSketchiGramVariant2 )
    {
        var elemPuzzleDualClue = document.getElementById("Div_PuzzleDualClue");
        if ( elemPuzzleDualClue )
        {
            elemPuzzleDualClue.innerHTML = 'Dual Clue:' + g_ST_sClue_Itself;
            g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
            elemPuzzleDualClue.style.top = MakePixelString(g_TC_iBiggestBottom);
            elemPuzzleDualClue.style.left = MakePixelString(g_TC_Padding_Left_iSize);
            elemPuzzleDualClue.style.width = MakePixelString(g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize);
            var rectDualClue = elemPuzzleDualClue.getBoundingClientRect();
            g_TC_iBiggestBottom += rectDualClue.height;
        }
    }
/*    
    if ( g_bIsSketchiGram )
    { // instruction line will be moved vertically later just adjust width
        var elemHowToA = document.getElementById("SG_HowToA_Div");
//        g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
//        elemHowToA.style.top = MakePixelString(g_TC_iBiggestBottom);
        // make the width the width of the grid
        var iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
        elemHowToA.style.width = MakePixelString(iWidthGrid);
//        var rectelemHowToA = elemHowToA.getBoundingClientRect();
//        g_TC_iBiggestBottom += rectelemHowToA.height;
    }
*/    
    MoreActions_SizeAndPosition();
}

function TC_SetBottomMatter()
{
    var elemBottomMatter = document.getElementById("Div_BottomMatter");
    g_TC_iBiggestBottom += 3 * g_TC_Padding_Inter_Vertical_iSize + g_iFudgeSpace;
    elemBottomMatter.style.top = MakePixelString(g_TC_iBiggestBottom);
    var iWidth = g_TC_iBiggestRight - g_TC_Padding_Right_iSize - g_TC_Padding_Left_iSize;
    elemBottomMatter.style.width = MakePixelString(iWidth);
    elemBottomMatter.style.Left = MakePixelString(g_TC_Padding_Left_iSize);
    elemBottomMatter.innerHTML = '&copy; 2022 Northeast by Southwest, Inc.&nbsp;&nbsp;';
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






