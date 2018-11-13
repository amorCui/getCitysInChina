 var fso = new ActiveXObject("Scripting.FileSystemObject");
        var pathName = window.location.pathname;
		var uri = pathName.substring(1,pathName.lastIndexOf("/"));
		var folderName = (uri+"/china/").replace(new RegExp("/","gm"),"\\\\");
        //var folderName = "C:\\Users\\acui022\\Desktop\\getMapPoints\\china\\";
        if (!fso.FolderExists(folderName)) fso.CreateFolder(folderName);
        
        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
        map.addControl(new BMap.NavigationControl({
            type: BMAP_NAVIGATION_CONTROL_SMALL
        }));
        map.enableScrollWheelZoom();
        
		
		//获取输入的区域边界
		function getBoundaryByClick(isClear,city){
			if(isClear){
				var city = document.getElementById("districtName").value;
			}
			
			var bdary = new BMap.Boundary();
			bdary.get(city,function(rs){
				if(isClear){
					map.clearOverlays(); //清除地图覆盖物 
				}
				
				var count = rs.boundaries.length; //行政区域的点有多少个
				
				for (var i = 0; i < count; i++) {
                      var ply = new BMap.Polygon(rs.boundaries[i], {
                           strokeWeight: 2,
                           strokeColor: "#ff0000"
                       }); //建立多边形覆盖物
                    map.addOverlay(ply); //添加覆盖物
					if(isClear){
						map.setViewport(ply.getPath()); //调整视野         
					}
                }
			});
			//getBoundary(city,'');
		}
		
		function getAllDataList(city){
			var bdary = new BMap.Boundary();
			var data = [];
			bdary.get(city,function(rs){
				
				var count = rs.boundaries.length; //行政区域的点有多少个
				
				for (var i = 0; i < count; i++) {
					data.push(rs.boundaries[i]);
                }
				
				return data;
			});
			
		}
		
		// function saveAllBoundaryList(){
			// var bdary = new BMap.Boundary();
			// //直辖市 
			// if (cityData.municipalities && cityData.municipalities.length > 0) {
				// for (var i = 0, n = cityData.municipalities.length; i < n; i++) {
					// var mu = cityData.municipalities[i];
					// (function(){
						// return function(i){
							// bdary.get(mu.n,function(rs){
								// if(rs.boundaries.length > 0){
									// cityData.municipalities[i].points = Unit(rs.boundaries[0]);
								// }
								// //cityData.municipalities[i].points = rs.boundaries; 
							// });
						// }(i);
					// }());
					
				// }
			// }
			 // // 普通省
			// for (var i = 0, n = cityData.provinces.length; i < n; i++) {
				// var pv = cityData.provinces[i];
				// (function(){
					// return function(i){
						// bdary.get(pv.n,function(rs){
							// if(rs.boundaries.length > 0){
								// cityData.provinces[i].points = Unit(rs.boundaries[0]);
							// }
							// //cityData.provinces[i].points = rs.boundaries;
						// });
					// }(i);
				// }());
				
				
				// for (var j = 0, m = pv.cities.length; j < m; j++) {
					// (function(){
						// return function(i,j){
							// bdary.get(pv.cities[j].n,function(rs){
								// if(rs.boundaries.length > 0){
									// cityData.provinces[i].cities[j].points = Unit(rs.boundaries[0]);
								// }
								// //cityData.provinces[i].cities[j].points = rs.boundaries;
							// });
						// }(i,j);
					// }());
					
				// }
			// }
			
			 // // 其他地区
			// if (cityData.others && cityData.others.length > 0) {
				// for (var i = 0, n = cityData.others.length; i < n; i++) {
					// var oth = cityData.others[i];
					// (function(){
						// return function(i){
							// bdary.get(oth.n,function(rs){	
								// if(rs.boundaries.length > 0){
									// cityData.others[i].points = Unit(rs.boundaries[0]);
								// }
								
							// });
						// }(i);
					// }());
					
				// }
			// }
		// }
		
		function saveAllBoundaryList(){
			var bdary = new BMap.Boundary();
			//直辖市 
			if (cityData.municipalities && cityData.municipalities.length > 0) {
				for (var i = 0, n = cityData.municipalities.length; i < n; i++) {
					var mu = cityData.municipalities[i];
					(function(){
						return function(i){
							bdary.get(mu.n,function(rs){
								if(rs.boundaries.length > 0){
									cityData.municipalities[i].areas = Unit(rs.boundaries);
								}
								//cityData.municipalities[i].points = rs.boundaries; 
							});
						}(i);
					}());
					
				}
			}
			 // 普通省
			for (var i = 0, n = cityData.provinces.length; i < n; i++) {
				var pv = cityData.provinces[i];
				(function(){
					return function(i){
						bdary.get(pv.n,function(rs){
							if(rs.boundaries.length > 0){
								cityData.provinces[i].areas = Unit(rs.boundaries);
							}
							//cityData.provinces[i].points = rs.boundaries;
						});
					}(i);
				}());
				
				
				for (var j = 0, m = pv.cities.length; j < m; j++) {
					(function(){
						return function(i,j){
							bdary.get(pv.cities[j].n,function(rs){
								if(rs.boundaries.length > 0){
									cityData.provinces[i].cities[j].areas = Unit(rs.boundaries);
								}
								//cityData.provinces[i].cities[j].points = rs.boundaries;
							});
						}(i,j);
					}());
					
				}
			}
			
			 // 其他地区
			if (cityData.others && cityData.others.length > 0) {
				for (var i = 0, n = cityData.others.length; i < n; i++) {
					var oth = cityData.others[i];
					(function(){
						return function(i){
							bdary.get(oth.n,function(rs){	
								if(rs.boundaries.length > 0){
									cityData.others[i].areas = Unit(rs.boundaries);
								}
								
							});
						}(i);
					}());
					
				}
			}
		}
		
		// function UnitData(name,type,i,j){
			// var bdary = new BMap.Boundary();
			// if(type=="municipalities"){
				// bdary.get(name,function(rs){
					// if(rs.boundaries.length > 0){
						// cityData.municipalities[i].points = Unit(rs.boundaries[0]);
					// }
					// //cityData.municipalities[i].points = rs.boundaries; 
				// });
			// }
			// if(type=="provinces"){
				// bdary.get(name,function(rs){
					// if(rs.boundaries.length > 0){
						// cityData.provinces[i].points = Unit(rs.boundaries[0]);
					// }
					// //cityData.provinces[i].points = rs.boundaries;
				// });
			// }
			// if(type=="others"){
				// bdary.get(name,function(rs){	
					// if(rs.boundaries.length > 0){
						// cityData.others[i].points = Unit(rs.boundaries[0]);
					// }
					
				// });
			// }
		// }
		
		function Unit(dataList){
			var areas = [];
			dataList.forEach(function(data,index,list){
				
				var points =[];
				for(var i = 0;i < arr.length;i++ ){
					var item = arr[i].split(",");
					points.push({x:item[1],y:item[0]});
				}
				areas.push(points);
			});
		}
		
		// function Unit(data){
			// var arr = data.split(";");
			// var rst =[];
			// for(var i = 0;i < arr.length;i++ ){
				// var item = arr[i].split(",");
				// rst.push({x:item[0],y:item[1]});
			// }
			// return rst;
		// }
		
		function getAllBoundaryByClick(){
			 //直辖市 
			if (cityData.municipalities && cityData.municipalities.length > 0) {
				for (var i = 0, n = cityData.municipalities.length; i < n; i++) {
					var mu = cityData.municipalities[i];
					getBoundaryByClick(false,mu.n);
				}
			}
			 // 普通省
			for (var i = 0, n = cityData.provinces.length; i < n; i++) {
				var pv = cityData.provinces[i];
				var newFolderName = folderName + pv.n
				if (!fso.FolderExists(newFolderName)) newFolderName = fso.CreateFolder(folderName + pv.n);
				getBoundaryByClick(false,pv.n);
				for (var j = 0, m = pv.cities.length; j < m; j++) {
					getBoundaryByClick(false,pv.cities[j].n);
				}
			}
			
			 // 其他地区
			if (cityData.others && cityData.others.length > 0) {
				for (var i = 0, n = cityData.others.length; i < n; i++) {
					var oth = cityData.others[i];
					getBoundaryByClick(false,oth.n);
				}
			}
			
			
			map.centerAndZoom("china", 12);
			//map.setViewport(ply.getPath()); //调整视野         
			
		}
		
		//获取所有中国行政区域坐标
		function getAllBoundaryOfChina(){
			 //直辖市 
			if (cityData.municipalities && cityData.municipalities.length > 0) {
				for (var i = 0, n = cityData.municipalities.length; i < n; i++) {
					var mu = cityData.municipalities[i];
					getBoundary(mu.n, "");
				}
			}
			 // 普通省
			for (var i = 0, n = cityData.provinces.length; i < n; i++) {
				var pv = cityData.provinces[i];
				var newFolderName = folderName + pv.n
				if (!fso.FolderExists(newFolderName)) newFolderName = fso.CreateFolder(folderName + pv.n);
				getBoundary(pv.n, "");
				for (var j = 0, m = pv.cities.length; j < m; j++) {
					getBoundary(pv.cities[j].n, pv.n);
				}

			}

			 // 其他地区
			if (cityData.others && cityData.others.length > 0) {
				for (var i = 0, n = cityData.others.length; i < n; i++) {
					var oth = cityData.others[i];
					getBoundary(oth.n, "");
				}

			}
		}
		
        function getBoundary(name, pvName) {
            var bdary = new BMap.Boundary();

            bdary.get(name, function(rs) { //获取行政区域
                //  map.clearOverlays(); //清除地图覆盖物       
                //  var count = rs.boundaries.length; //行政区域的点有多少个
                //  for (var i = 0; i < count; i++) {
                //      var ply = new BMap.Polygon(rs.boundaries[i], {
                //           strokeWeight: 2,
                //           strokeColor: "#ff0000"
                //       }); //建立多边形覆盖物
                //       map.addOverlay(ply); //添加覆盖物
                //     map.setViewport(ply.getPath()); //调整视野         

                //  }
                var fileName = "";
                var newFileObject = null;
                if (pvName == "") newFileObject = fso.CreateTextFile(folderName + name + ".txt", true);
                else newFileObject = fso.CreateTextFile(folderName + pvName + "\\" + name + ".txt", true);

                newFileObject.write(rs.boundaries[0]);
                newFileObject.Close();
                //  eventsTable.innerHTML = rs.boundaries[0].length +':'+ rs.boundaries[0];
            });
        }
		
		function saveFile(path,file){
			var path ='C:\\Users\\acui022\\Desktop\\Newfolder\\getMapPoints\\js\\data.txt';
			var fStr = JSON.stringify(cityData);
			fStr = fStr.replace(new RegExp("\"","gm"),"'");
			var ForAppending  = 8;
			var file = fso.createTextFile(path,ForAppending,true);
			for(var i =0;i<fStr.length;i+=100){
				file.write(fStr.substring(i,i+100));
				//file.write(fStr);
			}
			file.close();
		}