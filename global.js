var preg = new Array();//定义正则表达式数组  
preg[0] = /^(http|ws){1}[s]*:[\/]{2}([a-zA-Z\d]*[\.]{1})*houqinbao[\.]{1}com[\/]{1}/;//网站根域名，如houqinbao.com  
preg[1] = /^http[s]*:[\/]{2}([a-zA-Z\d]*[\.]{1})*qq[\.]{1}com[\/]{1}/;//链接腾讯的一些资源 
preg[2] = /^http[s]*:[\/]{2}([a-zA-Z\d]*[\.]{1})*anquan[\.]{1}org[\/]{1}/;//链接安全联盟资源 
preg[3] = /^weixin(ping)?:[\/]{2}[a-zA-Z\d]+/;//防止微信公众号里的一些资源被屏蔽，以免影响
preg[4] = /^[\/]{1}static(ping)?[\/]{1}[a-zA-Z\d]+/;//本地静态JS资源
preg[5] = /^(http|ws){1}[s]*:[\/]{2}([a-zA-Z\d]*[\.]{1})*bootcss[\.]{1}com[\/]{1}/;//网站根域名，如bootcss.com  
preg[6] = /^(http|ws){1}[s]*:[\/]{2}([a-zA-Z\d]*[\.]{1})*alicdn[\.]{1}com[\/]{1}/;//网站根域名，如alicdn.com  

var preg_length  = preg.length;

function preg_test(scripts){
	outer:
	for(var i=0; i < scripts.length; i++){
		if (scripts[i].src) {
			var ssrc = scripts[i].src;
			inter: 
			for (var k = 0; k < preg_length; k++) {
				if (new RegExp(preg[k]).test(ssrc)) {
					break;
				}else{
					if((k+1)==preg_length){
						console.log("发现广告,正在清除"+ssrc);
						scripts[i].remove();
					}
				}
			}
		}
	}
}
(function (d) {
	var ishttps = 'https:' == document.location.protocol ? true: false;//如果您的网站既有http又有https协议的页面，那么在https下就不必继续过滤了
	if(ishttps==false){
		var stop = setInterval(function(){
			var scripts = $('script');//获取全部script标签对象
			preg_test(scripts); 
			var iframes = $('iframe');//获取全部iframe标签对象
			preg_test(iframes);
		},200);//为比较彻底清除异己资源，200ms遍历一遍，可自行调整
		setTimeout(function(){clearInterval(stop);},10000);//10s之后关闭过滤操作，因为没必要一直执行下去

		var head = d.getElementsByTagName('body')[0];//body或者head
	    var orgAppendChild = head.appendChild;
	    head.appendChild = function (node) {
	    	for (var k = 0; k < preg_length; k++) {
	    		if(typeof node.src != "undefined" && node.src!=undefined && node.src!=''){
					if (new RegExp(preg[k]).test(node.src)) {
						orgAppendChild.apply(this, arguments);
						break;
					}else{
						if((k+1)==preg_length){
							alert("发现广告1,正在清除"+node.src);
						}
					}
	    		}else{
	    			orgAppendChild.apply(this, arguments);
					break;
	    		}
			}
	        return node;
	    };
	    var orgRemoveChild = head.removeChild;
	    head.removeChild = function (node) {
	    	for (var k = 0; k < preg_length; k++) {
	    		if(typeof node.src != "undefined" && node.src!=undefined && node.src!=''){
	    			if (new RegExp(preg[k]).test(node.src)) {
						orgRemoveChild.apply(this, arguments);
						break;
					}else{
						if((k+1)==preg_length){
							alert("发现广告1,正在清除"+node.src);
						}
					}
	    		}else{
	    			orgRemoveChild.apply(this, arguments);
					break;
	    		}
			}
	        return node;
	    };
		
	}
} (document));

