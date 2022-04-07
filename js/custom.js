$(window).scroll(function(){
    var h = $(document).scrollTop();
    if(h>50)
    {
        $(".top-nav").addClass("navactive");
    }
    else
    {
        $(".top-nav").removeClass("navactive");
    }
});
$("body").on("click","#BuyNowFollowerContentUnLogged",function(){
    ShowSignupBox();
});
function ShowLoginBox(){
    $("#signupmodal").removeClass("activemodal");
    $("#loginmodal").addClass("activemodal");
    return false;
}
function ShowSignupBox(){
    $("#loginmodal").removeClass("activemodal");
    $("#signupmodal").addClass("activemodal");
    return false;
}
$(document).mouseup(function(e)
{
    var container = $(".modal-box");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        $(".modal-overlay").removeClass("activemodal");
        //document.location.reload();
    }
});

function Signup(){
    var myForm = $("#signupform").serialize();
    var response = $("#signupmodal .response");
    response.removeClass("error")
    response.css("display","flex");
    response.html("<div class='lds-ripple'><div></div><div></div></div>");
    $.post(siteURL+"/ajax/signup",{myForm:myForm},function(data){
        if(data.action=="Success")
        {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'signup_success'
            });
            $("#signupmodal").removeClass("activemodal");
            ShowFollowBox();
        }
        if(data.action=="Invalid")
        {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'signup_error',
                'signup_error_details':data.details
            });
            response.addClass("error")
            response.html(data.result);
        }
    },"json");
    event.preventDefault();
}
$("body").on("click",".hideresponse",function(){
    $(".response").html("").hide();
});
function ShowFollowBox()
{
    $("#followbox").remove();
    $.post(siteURL+"/ajax/followbox",{},function(data){
        $("body").append(data);
        $("#followbox").addClass("activemodal");
    });
}
function DownloadFile(projectID)
{
    $.post(siteURL+"/ajax/download",{projectID:projectID},function(data){
        if(data.action=="ShowFollowBox")
        {
            ShowFollowBox();
        }
        if(data.action=="ProcessDownload")
        {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'file_download_success'
            });
            window.location.href=data.download_url;
        }
    },"json");
    event.preventDefault();
}
function Login(){
    var myForm = $("#loginform").serialize();
    var response = $("#loginmodal .response");
    response.css("display","flex");
    response.html("<div class='lds-ripple'><div></div><div></div></div>");
    $.post(siteURL+"/ajax/login",{myForm:myForm},function(data){
        if(data.action=="ShowFollowBox")
        {
            ShowFollowBox();
        }
        if(data.action=="Reload")
        {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'login_success'
            });
            window.location.reload();
        }
        if(data.action=="Invalid")
        {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'login_error',
                'login_error_details':data.details
            });
            response.addClass("error")
            response.html(data.result);
        }
    },"json");
    event.preventDefault();
}
function Verify(verify_type)
{
    var response = $("#followbox .response");
    response.css("display","flex");
    response.html("<div class='lds-ripple'><div></div><div></div></div>");
    $.post(siteURL+"/ajax/verify",{verify_type:verify_type},function(data){
        if(data.result=="verified"){
            ShowFollowBox();
            response.html("").hide();
        }else{
            response.html(data.result);
        }
    },"json")
}
function ShowUpdateDribbbleProfileBox(){
    var response = $("#updatedribbbleurlmodal .response");
    response.html("").hide();
    $("#followbox, #signupmodal,#loginmodal, #updatedribbbleurlmodal").removeClass("activemodal");
    $("#updatedribbbleurlmodal").addClass("activemodal");
    event.preventDefault();
}
function UpdateDribbbleURL(){
    var response = $("#updatedribbbleurlmodal .response");
    response.css("display","block");
    var myForm = $("#updatedribbbleurlform").serialize();
    response.html("<div class='lds-ripple'><div></div><div></div></div>");
    $.post(siteURL+"/ajax/changedribbbleurl",{myForm:myForm},function(data){
        if(data.result=="success"){
            ShowFollowBox();
            response.html("").hide();
        }else{
            response.html(data.result);
        }
    },"json");
    event.preventDefault();
}
function ResetDribbbleProfileURL(){
    var response = $("#updatedribbbleurlmodal .response");
    response.html("").hide();
    event.preventDefault();
}
