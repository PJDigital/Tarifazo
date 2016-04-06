<!DOCTYPE html>
<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
		<title>QUE TARIFA TENGO, compartilo, reenvialo</title>
		<link href="css/bootstrap.min.css" rel="stylesheet">

	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	    <![endif]-->
	     <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    	<link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet" />
    	<!--theme css -->
    	<link href="css/jumbotron-narrow.css" rel="stylesheet" />
    	<link href="css/font-awesome.min.css" rel="stylesheet" />
    	<link href="css/awesome-bootstrap-checkbox.css" rel="stylesheet" />
    	<link href="css/awesome-bootstrap-checkbox-build.css" rel="stylesheet" />

  	</head>
  	<body>
  		<div class="container">
        <div class="header clearfix">
                         <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 center">
             
                    <a href="http://sindicatoagc.org/"><img  src="images/agc.png" ></a>
                    <img src="images/defensa.jpg" />
                    <img src="images/deuco.jpg" />
                    <a href="http:///"><img src="images/pjdigital-arriba-final.png" ></a>
                

                             
            	      		</div>
          </div>
          <div id="alert"></div>
      		<form class="form-horizontal" data-toggle="validator" role="form" id="myForm" action="envioMailLuz.php" method="POST">
      			<h4>Realizar Denuncia a Defensa al Consumidor</h4>
      			<div class="form-group">
      				<label for="cuenta" class="control-label">Cuenta:</label>		
      			  <input type="number" class="form-control" id="cuenta" placeholder="Numero de Cuenta" data-error="ingrese un valor" name="cuenta" required="required" />	
					 </div>
  				 <div class="form-group">
              <label for="medidor" class="control-label">Medidor:</label>    
              <input type="number" class="form-control" id="medidor" name="medidor" placeholder="Numero de Medidor" data-error="ingrese un valor"> 
           </div>
		  		<div class="form-group">
              <label for="nombre" class="control-label">Nombre y Apellido:</label>    
              <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre y Apellido:" data-error="ingrese un valor" required="required"> 
           </div>
           <div class="form-group">
            <label for="email" >Email de Contacto:</label>
            <input type="email" class="form-control" id="email" placeholder="midireccion@dominio.com" name="email" data-error="ingrese un valor" required="requered">
          </div>
		  		<div class="form-group">
		    		<label for="telefono" >Telefono de Contacto:</label>
		    		<input type="number" class="form-control" id="telelfono" name="telefono" placeholder="1144446666 " data-error="ingrese un valor" required="required">
		  		</div>
          <div class="form-group">
            <label for="observaciones" >Observaciones</label>
            <textarea  class="form-control" id="observaciones" name="observaciones" data-error="ingrese un valor" rows="10">Datos de la consulta
Distribuidora: <?php echo $_POST["cia"];?>

Zona: <?php if(strcmp($_POST["UBI"],"PROV")==0) {
    echo "Provincia";
  }else{ echo $_POST["UBI"];}?> 
Consumo Actual: <?php echo  $_POST["Consumo"]; ?> Kwh
Consumo Anterior: <?php echo $_POST["ConsumoAnterior"]; ?> Kwh
<?php if(isset($_POST["TarifaSoc"])) echo "Tiene tarifa social\n\r";?>
<?php echo trim($_POST["datos"]); ?></textarea>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-success" onclick="$('#myForm').submit()">Enviar Denuncia</button>
          </div>
		</form>
    <div class="header clearfix">
        <!-- calculadora -->
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1872748699637911" data-ad-slot="7586965782" data-ad-format="auto"></ins>
    </div>  	
	    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	    <script src="js/jquery.min.js"></script>
	    <!-- Include all compiled plugins (below), or include individual files as needed -->
      <script src="js/jquery.form.js"></script>
	     <script> 
        // wait for the DOM to be loaded 
        $(document).ready(function() { 
            // bind 'myForm' and provide a simple callback function  
            $('#myForm').validator().on('submit', function (e) {
               var form = $(this); 
              if (e.isDefaultPrevented()) {
                customAlert("complete los datos");
              } else {
                $.ajax({
                  type: 'POST',
                  url: form.attr('action'),
                  data: $(form).serialize(),
                  success: function(msg) {
                     customSuccess("Se ha enviado su reclamo");
                  }
                });                       
              }
              return false;  
            });
        }); 
      </script>
      <script src="js/bootstrap.min.js"></script>
	    <script src="js/bootstrap-validator.min.js"></script>
	    <script src="js/calculadora.js"></script>
	    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	    <script>
			    (adsbygoogle = window.adsbygoogle || []).push({});
		  </script>
      <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-73730461-1', 'auto');
          ga('send', 'pageview');

    </script>

  </body>
</html>