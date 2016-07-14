//main_out
//传的id都是当作键
//window.atob是对应于php base64加密的解密
//window.atob是对应于php base64解密的加密
$(document).ready(function(){
	$('#reader').html5_qrcode(function(data){
			var obj = eval('(' + data + ')');
			var type = obj.type;
			var id = window.atob(obj.id);
			var balance = window.atob(obj.balance);
			if(type == "gift"){
				$('#read').html(id);
			}else{
				$('#read').html("用户:"+id);
			}
			$.post(
                    "http://localhost:9091/metro_out",
                    {
                        id:id,
						balance:balance,
						station:"南京站",
						type:type
                    },
                    function (data) {
						$('#read_res').html(data);
						var now = new Date(); 
						var exitTime = now.getTime() + 1500; 
						while (true) { 
						now = new Date(); 
						if (now.getTime() > exitTime) 
						return; 
						} 
                    },
                    "text");
		},
		function(error){
			//$('#read_error').html(error);
		}, function(videoError){
			//$('#vid_error').html(videoError);
		}
	);
});