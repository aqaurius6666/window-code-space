<?php
	require_once("m.php");

	class SumControl {
		public function proc() {
			//1. Nhận yêu cầu, kiểm tra dữ liệu người dùng
			if (isset($_POST["x"]) && isset($_POST["y"]) 
				&& is_numeric($_POST["x"]) && is_numeric($_POST["y"])) {
				// nhận tham số và chuyển kiểu				
				$x = floatval($_POST["x"]);
				$y = floatval($_POST["y"]);

				//2. Gọi model để xử lý nghiệp vụ
				$model = new SumModel($x, $y);
				$model->solve();
				$ret = $model->getResult(); //Kết quả xử lý nghiệp vụ
	
				//3. Trả lời trình khách
				header('Content-type: application/json');
				echo $ret;
			} else {
				header('Content-type: application/json');
				echo "{}";
			}
		}
	}


	$ctrl = new SumControl();
	$ctrl->proc();
