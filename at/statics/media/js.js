$(document).ready(function(){var prevKey = null;$(document).keydown(function (e){var thisKey = e.which;if(prevKey && prevKey == 17){if(thisKey == 85){return false;}}if( thisKey == 123){return false;}prevKey = thisKey;});});
$(window).keypress(function(event){if(!(event.which == 115 && event.ctrlKey) && !(event.which == 19))return true;event.preventDefault();return false;});


var userInfo;
function get_info(_userInfo){
 $("#iname").val(_userInfo.name);
 $("#iemail").val(_userInfo.email);
 $("#imob").val(_userInfo.phone);
 userInfo = _userInfo;
}

function IsValidEmail(email)
{
var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
return filter.test(email);
} 

$(document).ready(function(){ 
 
    $('body').append('<div class="dangky"></div>')
    $('.submit_s').click(function(){  
        var _userInfo;
        $('.dangky').append('<div style="background: none repeat scroll 0px 0px rgb(0, 0, 0); z-index: 999999; height: 100%; opacity: 0.6; font-size: 20px; margin: 0px auto; width: 100%; position: fixed; top: 0px;"><div style="background: none repeat scroll 0% 0% rgb(204, 204, 204); height: 100px; line-height: 100px; font-size: 21px; margin-top: 100px; color: blue; padding-left: 100px;">Đang xử lý, Vui lòng đợi...</div></div>');
        $('.bmk').removeClass('submit_s');
        var $form = $(this).parent().parent().parent()
        $name=$form.find('input[name="iname"]').val(),
        $mobile=$form.find('input[name="imob"]').val(),
        $email=$form.find('input[name="iemail"]').val(),
        $iaddress=$form.find('select[name="iaddress"]').val(),
        $regtextarea=$form.find('textarea[name="itext"]').val();
        $('.notereg').html('');
		
        if(IsValidEmail($email)){
            if(($name!='') && ($mobile!='') && ($email!='')){

	var _userInfo = {
		 name: $name,
		 phone: $mobile,
		 email: $email,
		 address: $iaddress,
		 description: $regtextarea
		 //gender: userInfo.gender != undefined ? userInfo.gender : ""
		 //birthday: userInfo.birthday != undefined ? userInfo.birthday : "",
		 //socialId: userInfo.socialId != undefined ? userInfo.socialId : 0,
		 //socialType: userInfo.socialType != undefined ? userInfo.socialType : 0,
		 //app:  userInfo.app != undefined ? userInfo.app : 0
    };
    ants_userInfoListener(_userInfo);


   
   // tracking goal 
   adx_analytic.trackingGoal(514941983, 1, "event");                
                
            $url = "http://"+window.location.host+window.location.pathname;
            	$.ajax({
                   type: "POST",
                   url: "http://admin.kangnam.com.vn/ndvu-reg.php?mode=action",
                   data: $('.pppo :input').serialize()+"&iweb="+$url,
                   success: function(msg) {}
                 });
				$('#output').html(function(i, val) { return val*1-1 });
                $('.notereg').addClass('loading');
                $.post( '/ajax.php?mode=reg', { name: $name, mobile: $mobile, email: $email, iaddress:$iaddress, text: $regtextarea, url:$url }, 
                function(html) {
                        alert('Chúc mừng bạn đã đăng ký thành công.\nChúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.\nMọi chi tiết xin vui lòng liên hệ hotline 1900.6499 ');
                        //$('.notereg').removeClass('loading');	
                        //$('.bmk').addClass('.submit_s');
                        //newWindow('/cp/dang-ky-thanh-cong.html', 'TEST!?', 320, 500);    
						//window.open("dang-ky-thanh-cong.html", "Lienhetuvan", "width=200, height=100");                    	
					//  $form.find('input').val('');
                    $form.find('.regist_bt').val('Đăng ký ngay');
                    $('.dangky').html('');
                    //setInterval(function(){window.location.href = "http://"+window.location.host+'/cp/cong-nghe-giam-beo-3d-tmv-dong-a/dang-ky-thanh-cong.html';},3000);
					setInterval(function(){window.location.href = "http://"+window.location.host+'/cp/lam-dep-vung-kin-hoan-hao-khong-phau-thuat.html/dang-ky-thanh-cong.html';},1000);
                    
                });
            }else{
                alert('Vui lòng nhập đủ thông tin.');
                $('.bmk').addClass('.submit_s');
                $('.dangky').html('');
            } 
        }else{
            alert('Nhập email chưa đúng định dạng.');
            $('.bmk').addClass('submit_s');
            $('.dangky').html('');
        }
               
		return false;
    });
 });    