<!doctype html>
<html lang="en">

<head>
    <!-- REQUIRED META TAGS -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="change_password.css">

    <!-- FONT AWESOME -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- BOOTSTRAP HOVER DOWN CSS -->
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="css/bootstrap-dropdownhover.min.css" rel="stylesheet">


    <title>BinusMaya</title>
</head>

<body>
    <!-- HEADER SECTION -->
    <?php include("components/header.html"); ?>
    <!-- END OF HEADER SECTION -->

    <!-- NAVBAR -->
    <?php include("components/navbar_index.html"); ?>
    <!-- END OF NAVBAR -->

    <div class="body-content">
        <h1 style="text-align: center; padding: 20px;">Hello World!</h1>

        <div class="row" style="padding: 0px !important">
            <div class="col-md-12 va-info">
                <div class="form-group">
                    <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Old Password</label>
                    <input type="password" id="disabledTextInput" class="form-control">
                </div>
                <div class="form-group">
                    <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">New Password</label>
                    <input type="password" id="disabledTextInput" class="form-control">
                </div>
                <div class="form-group">
                    <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Retype New Password</label>
                    <input type="password" id="disabledTextInput" class="form-control">
                </div>
                <div class="row" style="padding: 0px !important;">
                    <div class="col-md-6">
                        <button type=" submit" class="btn btn-danger submit-btn" style="width: 100%; font-family: OpenSans-Regular">Discard Changes</button>
                    </div>
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-primary submit-btn" style="width: 100%; font-family: OpenSans-Regular">Save Changes</button>
                    </div>
                </div>
            </div>

            <br><br>
        </div>
    </div>

    <!-- FOOTER -->
    <?php include("components/footer.html"); ?>
    <!-- END OF FOOTER -->

    <!-- OPTIONAL JAVASCRIPT -->
    <!-- JQUERY FIRST, THE POPPER.JS, THEN BOOTSTRAP JS -->
    <?php include("components/javascript.html"); ?>
</body>

</html>