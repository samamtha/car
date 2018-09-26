<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	
	<style type="text/css">
	body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	#info {
		display: none;
	}
	</style>
	
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=buQZqR1M875bpRufYVxS33C2x6sfjxSf"></script>
	
	<title>车位显示地图</title>
</head>
<body>
	<?php
		/*ignore_user_abort(); 
			set_time_limit(0); 
			$interval=3;
			do{
		*/
	
				$con = mysql_connect("localhost","root","root");   
			    if (!$con)
			    {
			    	die('Could not connect: ' . mysql_error());
			    }
			    mysql_select_db("ans", $con);
			    mysql_query("set character set 'utf8'");
			    $result = mysql_query("SELECT * FROM ans");

			    while($row = mysql_fetch_array($result))
			    {
					$info = $row['num'];
				}
			    mysql_close($con);
	
			/*
			sleep($interval); 
			}while(true)
			*/
	?>
	
	<div id="info"><?php echo $info; ?></div>
	<div id="allmap"></div>
	<script type="text/javascript" src="car.php"></script>
</body>
</html>

<script type="text/javascript">
	var info = document.getElementById("info").innerHTML;
	
	var map = new BMap.Map('allmap');
	
	//var point = new BMap.Point(113.883511, 22.9068222);
	var point = new BMap.Point(113.42306, 23.02478);
	map.centerAndZoom(point, 18);
	
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));	  
	map.setCurrentCity("广东");          
	map.enableScrollWheelZoom(true);     
	if(info){
		//alert(info);
		if(info == "200"){
			
			//map.removeOverlay(marker);
			var icons = "img/blue.png"; 
			
			var markers = new BMap.Marker(new BMap.Point(113.42306, 23.02478));
			//var markers = new BMap.Marker(new BMap.Point(113.883511, 22.9068222)); 
			var icon = new BMap.Icon(icons, new BMap.Size(22, 25)); 
			markers.setIcon(icon);
			map.addOverlay(markers);
			//map.removeOverlay(markers);
			
		}else{
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);
			
		}
	}
	

	
</script>
