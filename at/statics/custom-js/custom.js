$(document).ready(function () {
    var $ = jQuery;
    $(".ldT2-form").submit(function (event) {
        alert("Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ lại với bạn");
    });
    $(".ldT2-form-popup").submit(function (event) {
        $(".ss-question-list").hide();
        $("h4.ld2-notice").html("Chúc mừng bạn đã đăng ký thành công").show();
        return;
    });
});