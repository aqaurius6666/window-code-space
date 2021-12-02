<?php
	require_once("m.php");
	require_once("v.php");

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
				$ret = $model->getSum(); //Kết quả xử lý nghiệp vụ
	
				//3. Gọi view để tạo nội dung
				$view = new SumView($x, $y, $ret);
				$html = $view->render();
	
				//4. Trả lời trình khách
				echo $html;
			} else {
				echo "Nhập x, y là các số.";
			}
		}
	}
