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

    let elemPuzzleTitle = document.getElementById("Div_PuzzleTitle");
    let sFull = '';
    let iLines = 1;
    if ( g_TitleInMainFrame_bShowPrefix )
    {
        let sPrefix = TC_Archive_ForPuzzleName_GetPuzzleTitlePrefix(g_sPuzzleName);
// determine rows in puzzle title
        if ( sPrefix != '' )
        {
            iLines++;
            sFull += sPrefix + '<br>';
        }
    }
    let sTitle = TC_Archive_ForPuzzleName_GetPuzzleTitle(g_sPuzzleName);
    if ( sTitle.indexOf('<br>') != -1 )
        iLines++;
    sFull += sTitle;
    if ( iLines == 1 )
        iTop += 30;
    if ( iLines == 2 )
       iTop += 10;

    elemPuzzleTitle.style.top = MakePixelString(iTop);
    elemPuzzleTitle.style.left = MakePixelString(g_TC_Padding_Left_iSize);
    let iWidthTitle = g_Window_iWidth - 2 * g_TC_Padding_Left_iSize;
    elemPuzzleTitle.style.width = MakePixelString(iWidthTitle);
    elemPuzzleTitle.innerHTML = sFull;

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
    elemBottomMatter.style.top = MakePixelString(g_BottomMatter_iTop);
    let iWidth = g_Window_iWidth - g_TC_Padding_Right_iSize - g_TC_Padding_Left_iSize;
    elemBottomMatter.style.left = MakePixelString(g_TC_Padding_Left_iSize);
//
    let elemLeft = document.getElementById("BottomLeft");
    elemLeft.style.left = MakePixelString(0);
    let elemRight = document.getElementById("BottomRight");
    elemRight.style.left = MakePixelString(iWidth-200); // specified width

    let elemMessages = document.getElementById("Messages");
    elemMessages.style.top = MakePixelString(g_Message_iTop);
    elemMessages.style.width = MakePixelString(iWidth);

    elemMessages.style.left = MakePixelString( g_TC_Padding_Left_iSize);
}
