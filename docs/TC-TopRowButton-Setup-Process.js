// TC-TopRowButton-Setup-Process.js
// 

function Make_Button_Direction()
{
    var sInnerHTML = '';
    var sImage;
    sImage = '<img Id="Button_Direction_Image" src="' + TC_FullButtonName('Button_ChangeDirection.png') + '" alt="ChangeDirection" width=100%>';
    sInnerHTML += '<BUTTON Id="Button_Direction" class="TopRowControl_Button" onclick="TRB_Click_Direction();">';
    sInnerHTML += sImage;
    sInnerHTML += '</BUTTON>';
    return sInnerHTML;
}

function Make_Button_Settings()
{
    var sInnerHTML = '';
    sImage = '<img Id="Button_Settings_Image" src="' + TC_FullButtonName('Button_Settings.png') + '" alt="Settings" width=100%>'
    sInnerHTML += '<BUTTON Id="Button_Settings_A" class="TopRowControl_Button" onclick="TC_ShowSettings();">';
    sInnerHTML += sImage;
    sInnerHTML += '</BUTTON>';
    return sInnerHTML;
}

function TRB_Click_Direction()
{
    if ( !Dropdown_CanOpen() )
        return false;
    GRB_ChangeDirection();
}

function TRB_Click_Settings()
{
    if ( !Dropdown_CanOpen() )
        return false;
    TC_ShowSettings();
}
