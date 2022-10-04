	
	    <!-- JQuery File -->
    <script type="text/javascript" src="../jquery/jquery.js"></script>
    
    <!-- BootStrap JS File-->
	<script type="text/javascript" src="../bootstrap/js/bootstrap.min.js"></script>
    
    <!-- Fontawesome Icon JS-->
    <script defer src="../fontawesome/js/all.js"></script>

	</body>
</html>

<script>
		

		$(window).on('resize', function () {
		  if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
		})
		$(window).on('resize', function () {
		  if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
		})
	</script>