// TC-DialogBox-Sizing.js
//
var g_DialogBox_Width_iMin = 150;
var g_DialogBox_Width_iMax = 200;
var g_DialogBox_Width_iPad = 20;
var g_DialogBox_Height_iMin = 100;
var g_DialogBox_Height_iMax = 300;

var g_DialogBox_Button_Width_iMin = 50;
var g_DialogBox_Button_Width_iMax = 100;
var g_DialogBox_Button_Width_iPad = 20;
var g_DialogBox_Button_Width_iBetween = 40;
var g_DialogBox_ElementSpacing_iWidth = 10;

var g_DialogBox_Button_Height_iPad = 20;
var g_DialogBox_ElementSpacing_iHeight = 10;


var g_DialogBox_Height_iMin = 100;
var g_DialogBox_Height_iMax = 200;

function DialogBox_OverallSizing()
{
    let elemSharedDialog_Div = document.getElementById("SharedDialog_Div");
    let elemDialogInside = document.getElementById(g_DialogBox_sId)
    let rectQuestion = DialogBox_GetRectQuestion();
    let iWidthQuestion = rectQuestion.width;
    let iHeightQuestion = rectQuestion.height;
    let iDialogWidth = iWidthQuestion + 2 * g_DialogBox_Width_iPad;

    let iMaxButtonWidth = 0;
    let iButtonHeightSingleRow = 0;
    let iButtons = g_DialogBox_aButtons_sText.length;
    for ( let iButton = 0; iButton < iButtons; iButton++ )
    {
        let sId = g_DialogBox_aButtons_sId[iButton];
        let sText = g_DialogBox_aButtons_sText[iButton];
        let rect = DialogBox_GetRectButton(sId, sText);
        if ( rect.width > iMaxButtonWidth ) iMaxButtonWidth = rect.width;
        iButtonHeightSingleRow = rect.height; // they should all be the same
    }
// now deal with horizontal size and spacing
// width of buttons if single row
    let iWidthButtons = iButtons * iMaxButtonWidth + 3 * g_DialogBox_ElementSpacing_iWidth;
    let iHeightButtons = iButtonHeightSingleRow;
    if ( iWidthButtons > g_DialogBox_Width_iMax )
    {
        alert('need to make double row buttons');
    }
    if ( iWidthButtons > iDialogWidth ) iDialogWidth = iWidthButtons;
// whole dialog
    elemSharedDialog_Div.style.width = MakePixelString(iDialogWidth); 
    elemDialogInside.style.width = MakePixelString(iDialogWidth); 
// now the question - centered?
    let elemQuestion = document.getElementById(g_DialogBox_Question_sId);
    elemQuestion.style.width = MakePixelString(rectQuestion.width);
    let iQuestionLeft = ( iDialogWidth - rectQuestion.width ) / 2;
    elemQuestion.style.left = MakePixelString(iQuestionLeft);
// now the buttons - width and positioning
    let iButtonWidthThemselves = iMaxButtonWidth * iButtons + g_DialogBox_Button_Width_iBetween * (iButtons - 1);
    let iSpacing = (iDialogWidth - iButtonWidthThemselves ) / 2;
    let iButtonLeft = iSpacing;
    for ( let iButton = 0; iButton < iButtons; iButton++ )
    {
        let elemButton = document.getElementById(g_DialogBox_aButtons_sId[iButton]);
        elemButton.style.width = MakePixelString(iMaxButtonWidth)
        elemButton.style.left = MakePixelString(iButtonLeft)
        iButtonLeft += iMaxButtonWidth + g_DialogBox_Button_Width_iBetween;
    }
// now deal with the heights
    let iTotalHeight = 2 * g_DialogBox_Button_Height_iPad + g_DialogBox_ElementSpacing_iHeight;
    iTotalHeight += iHeightQuestion;
    iTotalHeight += iHeightButtons;
    if ( iTotalHeight > g_DialogBox_Height_iMax )
        iTotalHeight = g_DialogBox_Height_iMax;
    if ( iTotalHeight < g_DialogBox_Height_iMin )
       iTotalHeight = g_DialogBox_Height_iMin;
       let iTopBottom = (iTotalHeight - iHeightQuestion - iHeightButtons - g_DialogBox_ElementSpacing_iHeight) / 2;
    elemQuestion.style.top = MakePixelString(iTopBottom);
    let iTopButtons = iTopBottom + iHeightQuestion + g_DialogBox_ElementSpacing_iHeight;
    for ( let iButton = 0; iButton < iButtons; iButton++ )
    {
        let elemButton = document.getElementById(g_DialogBox_aButtons_sId[iButton]);
        elemButton.style.top = MakePixelString(iTopButtons);
    }
    elemSharedDialog_Div.style.height = MakePixelString(iTotalHeight); 
    elemDialogInside.style.height = MakePixelString(iTotalHeight); 
}

function DialogBox_GetRectButton(sId, sText)
{
    let elemButton = document.getElementById(sId);
    let iButtonWidth = GetWidthOfTextInPixels(elemButton, sText) + g_DialogBox_Button_Width_iPad;
// allow width to be 90% of max dialog width
    let iRows = Math.ceil(iButtonWidth / g_DialogBox_Button_Width_iMax );
    if ( iRows != 1 )
        alert('need multirowbutton:' + sId)
    let iFontSize = parseInt(window.getComputedStyle(elemButton, null).getPropertyValue('font-size'));    
    let iHeight = iFontSize * 1.2 * iRows;
    let rectButton = new DOMRect(0, 0, iButtonWidth, iHeight);
    return rectButton;
}

function DialogBox_GetRectQuestion()
{
    let elem = document.getElementById(g_DialogBox_Question_sId);
    let iWidthQuestionItself = GetWidthOfTextInPixels(elem, g_DialogBox_Question_sText);
    let iWidthQuestionWithPadding = iWidthQuestionItself + g_DialogBox_Width_iPad * 2;
    let iRows = Math.ceil(iWidthQuestionWithPadding / g_DialogBox_Width_iMax);
    let iFontSize = parseInt(window.getComputedStyle(elem, null).getPropertyValue('font-size'));    
    let iHeight = iFontSize * ( iRows + 1 )* 1.2;// hoping this accommodates word breaks
    let iWidth = iWidthQuestionItself/iRows;
   let rectQuestion = new DOMRect(0, 0, iWidth, iHeight);
    return rectQuestion;
}
