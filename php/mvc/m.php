<?php
	/**
	*  Tính tổng hai số
	*/
	class SumModel {
		//Input:
		private $x; //Số thứ nhất
		private $y; //Số thứ hai
		//Output:
		private $sum; //Tổng

		//Nhận dữ liệu vào
		public function __construct($x, $y) {
			$this->x = $x;
			$this->y = $y;
		}

		/**
		* Giải bài toán
		*/
		public function solve() {
			$this->sum = $this->x + $this->y;
		}
		
		/**
		* Trả kết quả
		*/
		public function getSum() { return $this->sum; }		
	}
