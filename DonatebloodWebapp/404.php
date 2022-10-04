<?php 
	//include header file
	include ('include/header.php');
?>

<style>
	.error{
		color: #e74c3c; 
		font-size: 20em;
		font-weight: 700;
	}
	a{
		padding: 20px 0 0 0;
	}
	.head-para{
		padding: 15px 0;
		
	}

	.container {
		margin-bottom: 30px; 
	}
</style>

<div class="container">
	<div class="row">
		<div class="col-md-6 offset-md-3">
			

			<h1 class="text-center error">404</h1>
			<div class="head-para">
				<h3 class="text-center">OOPS, SORRY WE CAN'T FIND THAT PAGE!</h3>
			<p class="text-center">Either something went wrong or that page dosent exist anymore.</p>
			</div>	

			<a href="index.php" class="btn btn-lg btn-danger center-aligned">Home</a>

		</div>
	</div>
</div>

<?php 

	//include footer file
	include ('include/footer.php');

?>
