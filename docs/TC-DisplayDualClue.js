// TC-DisplayDualClue.js

function TC_DisplayDualClue_Setup(iTop, iLeft, iWidth)
{
    let elemDisplayDualClue = document.getElementById("DisplayDualClue_Div");
    elemDisplayDualClue.innerHTML = 'Click here to expand SketchiToons&reg; Clue';
    elemDisplayDualClue.style.left = MakePixelString(iLeft);
    elemDisplayDualClue.style.top = MakePixelString(iTop);
    elemDisplayDualClue.style.width = MakePixelString(iWidth);
}

function TC_DisplayDualClue()
{
    TC_ShowExtraImage();
}