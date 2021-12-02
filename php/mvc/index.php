<!DOCTYPE html><html><head>
	<title>MVC</title>
	<meta charset="utf-8">
</head><body>
	<h1>Tổng hai số</h1>
	<?php
		require_once("c.php");
		$ctrl = new SumControl();
		$ctrl->proc();
	?>
	<form method="post">
        x = <input type="text" name="x"  value="<?php echo (isset($_POST["x"]) ? $_POST["x"] : ""); ?>"/> <br/>
        y = <input type="text" name="y" value="<?php echo (isset($_POST["y"]) ? $_POST["y"] : ""); ?>"/> <br/>
        <input type="submit" value="Chấp nhận"/>
    </form>
</body></html>
