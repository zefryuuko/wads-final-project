<!doctype html>
<html lang="en">

<head>
    <!-- REQUIRED META TAGS -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="edit_profile.css">

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

    <div class="row row-bod" style="padding: 0px !important">
        <div class="col-md-12 va-info">
            <img src="assets/icon/avatar.png" alt="" style="width: 25%; margin: auto">
        </div>
        <div class="col-md-12 va-info">
            <form>
                <fieldset disabled>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">First Name</label>
                            <input type="text" id="disabledTextInput" class="form-control" placeholder="David">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Last Name</label>
                            <input type="text" id="disabledTextInput" class="form-control" placeholder="Amadeo">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">ID Number</label>
                        <input type="text" id="disabledTextInput" class="form-control" placeholder="Amadeo">
                    </div>
                </fieldset>
                <div class="form-group">
                    <label for="exampleInputEmail1" style="font-family: OpenSans-Bold !important;">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="david.amadeo@binus.ac.id">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1" style="font-family: OpenSans-Bold !important;">Address</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">Jl Mandala Selatan No.19</textarea>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Kelurahan</label>
                        <input type="text" id="disabledTextInput" class="form-control" value="Tomang">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Kecamatan</label>
                        <input type="text" id="disabledTextInput" class="form-control" value="Jakarta Barat">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Postal Code</label>
                        <input type="number" id="disabledTextInput" class="form-control" value="11440" maxlength="5">
                    </div>
                </div>
                <div class="form-group">
                    <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Phone Number</label>
                    <input type="number" id="disabledTextInput" class="form-control" value="081510400072">
                </div>
                <fieldset disabled>
                    <div class="form-group">
                        <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Major</label>
                        <input type="text" id="disabledTextInput" class="form-control" placeholder="Computer Science">
                    </div>
                    <div class="form-group">
                        <label for="disabledTextInput" style="font-family: OpenSans-Bold !important;">Batch</label>
                        <input type="number" id="disabledTextInput" class="form-control" placeholder="2022">
                    </div>
                </fieldset>
            </form>
            <div class="row" style="padding: 0px !important;">
                <div class="col-md-6">
                    <button type="submit" class="btn btn-primary user-btn" style="width: 100%; font-family: OpenSans-Regular">Save Changes</button>
                </div>
                <div class="col-md-6">
                    <button type=" submit" class="btn btn-danger user-btn" style="width: 100%; font-family: OpenSans-Regular">Discard Changes</button>
                    <br><br>
                </div>
            </div>
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