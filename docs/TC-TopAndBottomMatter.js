// TC-GRBMS-TopAndBottomMatter.js

function TC_SetTopMatter()
{
    var elemPuzzleType = document.getElementById("Div_PuzzleType");
    elemPuzzleType.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemPuzzleType.style.top = MakePixelString(g_TopMatter_iTop);
    elemPuzzleType.style.width = MakePixelString(g_Window_iWidth - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize);
    elemPuzzleType.innerHTML = 'Solve the SketchiGram&trade; Puzzle by rearranging the letters in the grid';
    let rectType = GetBoundingClientRectAbsolute(elemPuzzleType);
    let iTop = rectType.height + g_TopMatter_iTop;
    let iWidthTitle = g_Window_iWidth - 2 * g_TC_Padding_Left_iSize;

// determine rows in puzzle title
    let elemPuzzleTitle = document.getElementById("Div_PuzzleTitle");
    let iWidthIfOneLine = GetWidthOfTextInPixels(elemPuzzleTitle, g_sPuzzleTitle);
    let bOneLine = true;
    if ( iWidthIfOneLine > iWidthTitle )
        bOneLine = false;
    if ( bOneLine )
        iTop += 10;
    elemPuzzleTitle.style.top = MakePixelString(iTop);
    elemPuzzleTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    elemPuzzleTitle.style.width = MakePixelString(iWidthTitle);
    elemPuzzleTitle.innerHTML = g_sPuzzleTitle;

    let elemOneLine = document.getElementById("OneLineDirection_Div");
    elemOneLine.style.top = MakePixelString(g_OneLineInstruction_iTop)
    elemOneLine.style.left = MakePixelString(g_TC_Padding_Left_iSize)
    elemOneLine.style.width = MakePixelString(iWidthTitle)
}

function TC_SetBottomMatter()
{
    let elemBottomMatter = document.getElementById("Div_BottomMatter");
    elemBottomMatter.innerHTML = '<DIV Id="BottomLeft" class="Div_BottomMatter_Left">&copy; 2023 Northeast by Southwest, Inc.&nbsp;&nbsp;</DIV>';
    elemBottomMatter.innerHTML += TC_Archive_MakeActivationButton();
    elemBottomMatter.innerHTML += '<DIV Id="BottomRight" class="Div_BottomMatter_Right">&nbsp;&nbsp;SketchiToons&reg; by Sketchi Bill</DIV>';
//
    let iBottomMatterTop = g_iBottomMatterTop; 
    let elemLeft = document.getElementById("BottomLeft");
    elemLeft.style.left = MakePixelString(0);
    let elemRight = document.getElementById("BottomRight");
    let iWidth = g_Window_iWidth - g_TC_Padding_Right_iSize - g_TC_Padding_Left_iSize;
    elemRight.style.left = MakePixelString(iWidth-200); // specified width
    elemBottomMatter.style.top = MakePixelString(iBottomMatterTop);
    TC_Archive_ActivationButtonSetPosition(iBottomMatterTop)
    let rectBottomMatter = GetBoundingClientRectAbsolute(elemBottomMatter);
    let elemMessages = document.getElementById("Messages");
    let iMessagesTop = rectBottomMatter.bottom + g_TC_Padding_Inter_Vertical_iSize;
    elemMessages.style.top = MakePixelString(iMessagesTop);
    elemMessages.style.width = MakePixelString(iWidth);
    elemMessages.style.left = MakePixelString( g_TC_Padding_Left_iSize);
}
