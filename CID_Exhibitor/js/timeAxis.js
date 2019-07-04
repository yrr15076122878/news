$(function() {
	$.ajax({
			url:'data/ObtainYear.ashx',
			type: 'GET',
			success: function(data){
				console.log(data)
				for(var i = 0; i < data.length; i++) {
					var li = "<li><a class='clearfix'> <div class='lc-left'><i class='line'></i> <span class='date'>" + data[i].year + "</span> </div><div class='lc-right'><div class='right-text'><h3>公司成立</h3><p>1995年12月14日，某某某有限公司成立。</p></div> </div></a></li>';"
					$(".clearfix").append(li);
				}
			}
	})
})
