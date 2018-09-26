<?php
$con = mysql_connect("localhost","root","root");   //通过数据库地址接上数据库
					    if (!$con)
					    {
					    	die('Could not connect: ' . mysql_error());
					    }
					    //echo 'ok';
					    //echo "<br />";
					    mysql_select_db("ans", $con);
					    mysql_query("set character set 'utf8'");
					    $result = mysql_query("SELECT * FROM ans");

					    while($row = mysql_fetch_array($result))
					    {
					      	
					     
						    
							
								$info = $row['num'];
						    
						    	
						}
						echo $info;
						

					    mysql_close($con);
?>