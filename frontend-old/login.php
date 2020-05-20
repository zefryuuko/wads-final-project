<!-- Source: https://colorlib.com/wp/template/login-form-v1/?v=b718adec73e0 (edited) -->

<!doctype html>
<html lang="en">

<head>
    <!-- REQUIRED META TAGS -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="login.css">

    <!-- FONT AWESOME -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">

    <!-- BOOTSTRAP HOVER DOWN CSS -->
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="css/bootstrap-dropdownhover.min.css" rel="stylesheet">


    <title>BinusMaya</title>
</head>

<body>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-pic js-tilt" data-tilt>
                    <img src="assets/components/logo.png" alt="IMG">
                </div>
                <form class="login100-form validate-form">
                    <span class="login100-form-title">
                        Login
                    </span>
                    <div class="wrap-input100 validate-input" data-validate="Valid email is required: firstname.surname@binus.ac.id">
                        <input class="input100" type="text" name="email" placeholder="Binusian Email">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" type="password" name="pass" placeholder="Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="form-group form-check" style="padding-top: 12px;">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1" style="OpenSans-Regular">Remember Me</label>
                    </div>
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" href="index.php">
                            Login
                        </button>
                    </div>
                    <div class="text-center" style="padding-top: 12px">
                        <span class="txt1">
                            Forgot
                        </span>
                        <a class="txt2" href="#">
                            Password?
                        </a>
                    </div>
                    <div class="text-center" style="padding-top: 136px">
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- OPTIONAL JAVASCRIPT -->
    <!-- JQUERY FIRST, THE POPPER.JS, THEN BOOTSTRAP JS -->
    <?php include("components/javascript.html"); ?>
</body>

</html>