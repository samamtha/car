var x2 = 113.423, y2 = 23.025;
var x1 = 113.4215, y1 = 23.020;
var myX, myY,index = 0;

var map = new BMap.Map("container");
var point1 = new BMap.Point(x1, y1);
var point2 = new BMap.Point(x2, y2);
map.centerAndZoom(point1, 15);

getLoca();


map.enableScrollWheelZoom(true);

//平移缩放控件
map.addControl(new BMap.NavigationControl());
//比例尺
map.addControl(new BMap.ScaleControl());
//地图类型控件
map.addControl(new BMap.MapTypeControl());
//定位
map.addControl(new BMap.GeolocationControl());
// 仅当设置城市信息时，MapTypeControl的切换功能才能可用
// map.setCurrentCity("广州");

// 创建标注
var marker2 = createMarker(point2);
var marker1 = createMarker(point1);
function createMarker(point){
    var myIcon = new BMap.Icon("img/icon.png", new BMap.Size(26, 30), {
        // 图标偏移。
        anchor: new BMap.Size(0, 0),

    });
    var marker = new BMap.Marker(point, {icon: myIcon});
    return marker;
}


//实时检测车位状态

carStatus(map, marker1, marker2);
setInterval(()=>carStatus(map, marker1, marker2), 3000);

function carStatus(map, marker1, marker2){
    let xhr = new XMLHttpRequest();

    xhr.open('get', 'http://127.0.0.1:7000/find', true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
            if(xhr.responseText.slice(0, 2) == '01'){
                map.addOverlay(marker1);     // 将标注添加到地图中
            }else if(xhr.responseText.slice(0, 2) == '00'){
                map.removeOverlay(marker1);//移除
            }
            if(xhr.responseText.slice(2, 4) == '11'){
                map.addOverlay(marker2);
            }else if(xhr.responseText.slice(2, 4) == '10'){
                map.removeOverlay(marker2);//移除
            }
        }
    }
}

//map.addOverlay(marker1); // 将标注添加到地图中
//map.removeOverlay(marker1);//移除




//监听标注事件
let route1 = 0, route2 = 0;
marker1.addEventListener("click",()=>{navigation(x1, y1,1);});
marker2.addEventListener("click",()=>{navigation(x2, y2,2);});


function navigation(x, y, exist){
    //alert("您点击了标注");
    if(myX == undefined || myY == undefined){
        alert("请共享您的位置以方便我们为您规划路线");
        if(getLoca()){
            drawRoute(x, y, exist);
        };
    }else{
        if(exist == 1 && route1 == 1 && route2 == 0){
            driving.clearResults();
            route1 = 0;
        }else if(exist == 2 && route1 == 0 && route2 == 1){
            driving.clearResults();
            route2 = 0;
        }else{
            if(exist == 2){
                route1 = 0;
                route2 = 1;
            }else if(exist == 1){
                route1 = 1;
                route2 = 0;
            }
            drawRoute(x, y, exist);
        }
    }
}
var driving = new BMap.DrivingRoute(map, {
    renderOptions: {
        map: map,
        autoViewport: true
    }
});

function drawRoute(x, y){
    //路线规划
    if(index != 0){
        driving.clearResults();

    }
    index++;
    var start = new BMap.Point(myX, myY);
    var end = new BMap.Point(x, y);
    driving.search(start, end);
}


function getLoca(){
    //获取当前经纬度
    var geolocation = new BMap.Geolocation();
    // 开启SDK辅助定位
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //var mk = new BMap.Marker(r.point);
            //map.addOverlay(mk);
            myX = r.point.lng;
            myY = r.point.lat;
            // point = new BMap.Point(r.point.lng, r.point.lat);
            // map.centerAndZoom(point, 12);
            //alert('您的位置：'+r.point.lng+','+r.point.lat);
            return true;
        }
        else {
            return false;
        }
    });
}