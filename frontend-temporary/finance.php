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

    <div class="row row-title" style="margin: 0px !important;">
        <div class="col-md-12 va-info">
            <h1 style="font-family: OpenSans-Bold;">FINANCIAL STATUS</h1>
        </div>
    </div>

    <div class="body-content">
        <!-- VIRTUAL ACCOUNT INFORMATION -->
        <div class="row" style="margin: 0px !important;">
            <div class="col-md-6 va-info">
                <h3 style="font-family: OpenSans-Regular; padding: 0px">VIRTUAL ACCOUNT INFORMATION</h3>
                <p>BCA VIRTUAL ACCOUNT (TUITION) - 77422531 - DAVID AMADEO <br>
                    BCA VIRTUAL ACCOUNT (NON-TUITION) - 64456233 - DAVID AMADEO</p>
            </div>
            <div class="col-md-6 va-info">
                <!-- PERIOD -->
                <h3 style="font-family: OpenSans-Regular; padding: 0px 20px">PERIOD</h3>
                <div class="col-md-12 va-info">
                    <select class="form-control">
                        <option value="2019-Odd">2019, Odd Semester</option>
                        <option value="2019-Even">2019, Even Semester</option>
                        <option value="2018-Odd">2018, Odd Semester</option>
                    </select>
                    <script>
                        $(document).ready(function() {
                            $('select.form-control').combobox();

                            $('#it').click(function(e) {
                                $('ul.dropdown-menu').toggle();
                            });

                            //  $('input').focus(function(e){
                            //    $('ul.dropdown-menu').toggle();
                            //  });

                        });
                    </script>
                </div>
                <!-- END OF PERIOD -->
            </div>
        </div>
        <!-- END OF VIRTUAL ACCOUNT INFORMATION -->

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
                <div class="table-responsive w-auto">
                    <table class="table">
                        <thead>
                            <tr class="">
                                <th scope="col">No</th>
                                <th scope="col">Period</th>
                                <th scope="col">Description</th>
                                <th scope="col">Due</th>
                                <th scope="col">Bill</th>
                                <th scope="col">Payment</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>2019-2020 <br> Even semester</td>
                                <td>Development Fee</td>
                                <td>1 April 2020</td>
                                <td>$433.690</td>
                                <td>$433.690</td>
                                <td>Paid</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>2019-2020 <br> Even semester</td>
                                <td>Building Fee</td>
                                <td>1 March 2020</td>
                                <td>$168.700</td>
                                <td>$0.00</td>
                                <td>Unpaid - overdo</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>2020-2021 <br> Odd semester</td>
                                <td>Development Fee</td>
                                <td>10 April 2020</td>
                                <td>$213.790</td>
                                <td>$0.00</td>
                                <td>Unpaid</td>
                            </tr>
                        </tbody>
                    </table>
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