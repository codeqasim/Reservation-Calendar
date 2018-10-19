<?php
	require_once('./lib/dhtmlxScheduler/connector/scheduler_connector.php');
	include ('./config.php');

	$hours = new JSONOptionsConnector($res, $dbtype);
	$hours->render_table("hours","id","id(value),label(label)");
	
	$priceRanges = new JSONOptionsConnector($res, $dbtype);
	$priceRanges->render_table("price_ranges","id","id(value),label(label),minVal(minVal),maxVal(maxVal)");


	$types = new JSONOptionsConnector($res, $dbtype);
	$types->render_table("types","id","id(value),label(label)");

    $statuses = new JSONOptionsConnector($res, $dbtype);
    $statuses->render_table("statuses","id","id(value),label(label)");

	$cars = new JSONOptionsConnector($res, $dbtype);
	$cars->render_table("cars","id","id(value),label(label),price(price),link(link),type(type)");

	$scheduler = new JSONSchedulerConnector($res, $dbtype);

	$scheduler->set_options("hour", $hours);
	$scheduler->set_options("priceRange", $priceRanges);
	$scheduler->set_options("type", $types);
    $scheduler->set_options("status", $statuses);
	$scheduler->set_options("car", $cars);

	$scheduler->render_table("rents","id","start_date,end_date,text,car,status");
?>


