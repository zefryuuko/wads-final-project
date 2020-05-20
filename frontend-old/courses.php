<!doctype html>
<html lang="en">

<head>
    <!-- REQUIRED META TAGS -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="courses.css">

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
    <?php include("components/navbar_courses.html"); ?>
    <!-- END OF NAVBAR -->

    <div class="row row-title" style="margin: 0px !important;">
        <div class="col-md-12 va-info">
            <h1 style="font-family: OpenSans-Bold;">COURSES</h1>
        </div>
    </div>
    <div class="body-content">
        <!-- PERIOD -->
        <div class="row" style="margin: 0px !important;">
            <div class="col-md-12 va-info" style="padding: 0px !important;">
                <h3 style="font-family: OpenSans-Regular">PERIOD</h3>
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
        </div>
        <!-- END OF PERIOD -->

        <!-- CAROUSEL COURSES SUBJECTS -->
        <div class="row bod" style="margin-top: 40px; padding-bottom: 80px">
            <div class="col-md-12" style="padding: 20px 0px;">
                <div class="row" style="padding: 0px !important">
                    <div class="col-md-4">
                        <a id="cardHover" href="each_course.php" style="text-decoration: none; color: black; text-align: center">
                            <div class="card">
                                <h2 class="card-title">COMP6345 - Intelligent Systems </h2>
                                <div class="card-body">
                                    <h7 class="card-text">D6034 - Andreas Kurniawan</h7>
                                    <hr>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4">
                        <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                            <div class="card">
                                <h2 class="card-title">COMP6210 - Ethical Hacking and Penetration Testing</h2>
                                <div class="card-body">
                                    <h7 class="card-text">D5863 - Kalpin Erlangga S</h7>
                                    <hr>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4">
                        <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                            <div class="card">
                                <h2 class="card-title">COMP6343 - Web Application Development and Security</h2>
                                <div class="card-body">
                                    <h7 class="card-text">D5757 - Ida Bagus Kerthyayana</h7>
                                    <hr>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-12" style="padding: 20px 0px;">
                <div class="row" style="padding: 0px !important;">
                    <div class="col-md-4">
                        <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                            <div class="card">
                                <h2 class="card-title">COMP6504 - Computer Architecture and Operating Systems</h2>
                                <div class="card-body">
                                    <h7 class="card-text">D3378 - Benfano Soewito</h7>
                                    <hr>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4">
                        <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                            <div class="card">
                                <h2 class="card-title">ENGL6171 - Academic English I</h2>
                                <div class="card-body">
                                    <h7 class="card-text">D5332 - Michael Setiawan</h7>
                                    <hr>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4">
                        <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                            <div class="card">
                                <h2 class="card-title">LANG6061 - Indonesian</h2>
                                <div class="card-body">
                                    <h7 class="card-text">D4553 - Kristianus Oktriono</h7>
                                    <hr>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- END OF CAROUSEL SUBJECTS -->
        <br>
        <br>
        <br>
    </div>

    <!-- FOOTER -->
    <?php include("components/footer.html"); ?>
    <!-- END OF FOOTER -->

    <!-- OPTIONAL JAVASCRIPT -->
    <!-- JQUERY FIRST, THE POPPER.JS, THEN BOOTSTRAP JS -->
    <?php include("components/javascript.html"); ?>
</body>

</html>