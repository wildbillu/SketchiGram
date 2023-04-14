// TC-DialogBox-Base.js
//

var g_DialogBox_sId = "";

var g_DialogBox_Question_sText = ''; 
var g_DialogBox_Question_sId = ''; 

var g_DialogBox_aButtons_sText = [];
var g_DialogBox_aButtons_sId = [];
var g_DialogBox_aButtons_fn = [];
var g_DialogBox_aButtons_rect = [];

/*
var g_DialogBox_ButtonA_sText = '';
var g_DialogBox_ButtonB_sText = '';
var g_DialogBox_ButtonC_sText = '';

var g_DialogBox_ButtonA_sId = '';
var g_DialogBox_ButtonB_sId = '';
var g_DialogBox_ButtonC_sId = '';

var g_DialogBox_ButtonA_fn;
var g_DialogBox_ButtonB_fn;
var g_DialogBox_ButtonC_fn;
*/


function DialogBox_CloseAndHide()
{
    let elemSharedDialog_Div = document.getElementById("SharedDialog_Div");
    elemSharedDialog_Div.style.display = 'none';
    elemSharedDialog_Div.style.visibility = 'hidden';
    elemSharedDialog_Div.style.zIndex = 0;
}

function DialogBox_NoAction()
{
    DialogBox_CloseAndHide();
    return;
}

function DialogBox_OnClick_Button(iButton)
{
    g_DialogBox_aButtons_fn[iButton]();
    DialogBox_CloseAndHide();
}

function DialogBox_SetupAndOpen(
    iTop, iLeft,
    siD_Dialog_Div, 
    Question_sText, 
    ButtonA_sText, ButtonA_fn,
    ButtonB_sText, ButtonB_fn,
    ButtonC_sText, ButtonC_fn)
{
    g_DialogBox_sId = siD_Dialog_Div;
    g_DialogBox_Question_sId = siD_Dialog_Div + '_Question';
    g_DialogBox_Question_sText = Question_sText; 
//
    g_DialogBox_aButtons_sText.length = 0;
    g_DialogBox_aButtons_sId.length = 0;
    g_DialogBox_aButtons_fn.length = 0;
    g_DialogBox_aButtons_rect.length = 0;
//
    if ( ButtonA_sText != '' )
    {
        g_DialogBox_aButtons_sText.push(ButtonA_sText);
        g_DialogBox_aButtons_sId.push(siD_Dialog_Div + '_ButtonA');
        g_DialogBox_aButtons_fn.push(ButtonA_fn);
    }
    if ( ButtonB_sText != '' )
    {
        g_DialogBox_aButtons_sText.push(ButtonB_sText);
        g_DialogBox_aButtons_sId.push(siD_Dialog_Div + '_ButtonB');
        g_DialogBox_aButtons_fn.push(ButtonB_fn);
    }
    if ( ButtonC_sText != '' )
    {
        g_DialogBox_aButtons_sId.push(siD_Dialog_Div + '_ButtonC');
        g_DialogBox_aButtons_sText.push(ButtonC_sText);
        g_DialogBox_aButtons_fn.push(ButtonC_fn);
    }
    let elemSharedDialog_Div = document.getElementById("SharedDialog_Div");
    let sInner = '';
    sInner += '<dialog Id="' + siD_Dialog_Div + '" class="Dialog_Itself">'
    sInner += '<div Id="' + g_DialogBox_Question_sId + '" class="Dialog_Question">dummy</div>';
    let iButtons = g_DialogBox_aButtons_sText.length;
    for ( let iButton = 0; iButton < iButtons; iButton++ )
    {
        sInner += '<button Id="' + g_DialogBox_aButtons_sId[iButton];
        sInner += '" class="Dialog_Button_' + iButton +'" ';
        sInner += 'onclick="DialogBox_OnClick_Button(' + iButton + ');"'
        sInner += ' type="button">Button</button>'
    }
    sInner += '</div>'
    sInner += '</dialog>'
    elemSharedDialog_Div.innerHTML = sInner;
    let elemQuestion = document.getElementById(g_DialogBox_Question_sId);
    elemQuestion.innerHTML = Question_sText;
//    
    for ( let iButton = 0; iButton < iButtons; iButton++ )
    {
        let elemButton = document.getElementById(g_DialogBox_aButtons_sId[iButton]);
        elemButton.innerHTML = g_DialogBox_aButtons_sText[iButton];
    }
    // now the sizing
    DialogBox_OverallSizing();
    let elemDialogInside = document.getElementById(g_DialogBox_sId)
    elemDialogInside.style.display = 'block';
    elemDialogInside.style.visibility = 'visible';
    elemDialogInside.style.zIndex = 3;

    elemSharedDialog_Div.style.left = MakePixelString(iLeft);
    elemSharedDialog_Div.style.top = MakePixelString(iTop)
    
    elemSharedDialog_Div.style.display = 'block';
    elemSharedDialog_Div.style.visibility = 'visible';
    elemSharedDialog_Div.style.zIndex = 2;
} 

