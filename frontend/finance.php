<!doctype html>
<html lang="en">

<head>
    <!-- REQUIRED META TAGS -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="finance.css">

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
    <?php include("components/navbar_finance.html"); ?>
    <!-- END OF NAVBAR -->

    <h1 style="font-family: OpenSans-Regular; padding: 10px 20px;">FINANCIAL STATUS</h1>

    <!-- VIRTUAL ACCOUNT INFORMATION -->
    <div class="row" style="margin: 0px !important;">
        <div class="col-md-6 va-info">
            <p>BCA VIRTUAL ACCOUNT (TUITION) - 77422531 - DAVID AMADEO <br>
                BCA VIRTUAL ACCOUNT (NON-TUITION) - 64456233 - DAVID AMADEO</p>
        </div>
    </div>
    <!-- END OF VIRTUAL ACCOUNT INFORMATION -->

    <!-- PERIOD -->
    <h3 style="font-family: OpenSans-Regular; padding: 10px 20px;">PERIOD</h3>

    <!-- END OF PERIOD -->

    <!-- SUMMARY -->
    <div class="row" style="margin: 0px !important">
        <div class="col-md-6 va-info">
            <h3 style="font-family: OpenSans-Regular;">SUMMARY</h3>
            <p class="summary"><b>TOTAL CHARGE: $ 383.070 <br>
                    TOTAL DEPOSIT: $ 308.470 <br>
                    TOTAL PAYMENT: $135.820 <br>
                    TOTAL OUTSTANDING PAYMENT: $766.400 </b></p>
        </div>
        <div class="col-md-6 va-info">
            <div class="bg-white p-5">
                <!-- Default search bars with input group -->
                <form action="">
                    <div class="input-group mb-4">
                        <input type="search" placeholder="What are you searching for?" aria-describedby="button-addon5" class="form-control">
                        <div class="input-group-append">
                            <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- END OF SUMMARY -->

    <!-- TABLE -->
    <div class="row" style="margin: 0px !important">
        <div class="col-md-12 va-info">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr class="">
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
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