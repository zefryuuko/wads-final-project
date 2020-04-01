<!doctype html>
<html lang="en">

<head>
    <!-- REQUIRED META TAGS -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="attendance.css">

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
    <?php include("components/navbar_attendance.html"); ?>
    <!-- END OF NAVBAR -->

    <div class="row row-title" style="margin: 0px !important;">
        <div class="col-md-12 va-info">
            <h1 style="font-family: OpenSans-Bold;">ATTENDANCE INFORMATION</h1>
        </div>
    </div>

    <!-- PERIOD -->
    <div class="row" style="margin: 0px !important;">
        <div class="col-md-6 va-info" style="padding: 10px 20px !important;">
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

    <!-- TABLE -->
    <div class="row" style="margin: 0px !important">
        <div class="col-md-12 va-info">
            <div class="table-responsive w-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Course</th>
                            <th scope="col">Class</th>
                            <th scope="col">Component</th>
                            <th scope="col">Total Session</th>
                            <th scope="col">Session Done</th>
                            <th scope="col">Total Absence</th>
                            <th scope="col">Maximum Absence</th>
                            <th scope="col">Status</th>
                            <th scope="col">Eligibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1" href="#collapseOne">
                            <td>1</td>
                            <td>Web Applicatoin Development and Security</td>
                            <td>L4AC</td>
                            <td>Lecturer</td>
                            <td>12</td>
                            <td>6</td>
                            <td>3</td>
                            <td>3</td>
                            <td>Warning, 80%</td>
                            <td>Eligibile</td>
                        </tr>
                        <tr class="hide-table-padding">
                            <td></td>
                            <td colspan="10">
                                <div id="collapseOne" class="collapse in p-3">
                                    <div class="table-responsive w-auto">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Week</th>
                                                    <th scope="col">Session</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Delivery Mode</th>
                                                    <th scope="col">Session Done</th>
                                                    <th scope="col">Absence</th>
                                                    <th scope="col">Tapping Time</th>
                                                    <th scope="col">Reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>1</td>
                                                    <td>Mon Oct 14 2020</td>
                                                    <td>09:30 - 11:10</td>
                                                    <td>F2F</td>
                                                    <td>Y</td>
                                                    <td>P</td>
                                                    <td>Mon Oct 14 2019 15:11:04 GMT+0910 (Indochina Time)</td>
                                                    <td>-</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>2</td>
                                                    <td>Mon Oct 14 2020</td>
                                                    <td>11:30 - 13:10</td>
                                                    <td>F2F</td>
                                                    <td>Y</td>
                                                    <td>P</td>
                                                    <td>Mon Oct 14 2019 15:11:04 GMT+1110 (Indochina Time)</td>
                                                    <td>-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="accordion-toggle collapsed" id="accordion2" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                            <td>2</td>
                            <td>Intelligent Systems</td>
                            <td>L4AC</td>
                            <td>Lab</td>
                            <td>12</td>
                            <td>6</td>
                            <td>0</td>
                            <td>3</td>
                            <td>OK</td>
                            <td>Eligibile</td>
                        </tr>
                        <tr class="hide-table-padding">
                            <td></td>
                            <td colspan="10">
                                <div id="collapseTwo" class="collapse in p-3">
                                    <div class="table-responsive w-auto">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Week</th>
                                                    <th scope="col">Session</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Delivery Mode</th>
                                                    <th scope="col">Session Done</th>
                                                    <th scope="col">Absence</th>
                                                    <th scope="col">Tapping Time</th>
                                                    <th scope="col">Reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>1</td>
                                                    <td>Mon Oct 14 2020</td>
                                                    <td>13:30 - 15:10</td>
                                                    <td>F2F</td>
                                                    <td>Y</td>
                                                    <td>P</td>
                                                    <td>Mon Oct 14 2019 15:11:04 GMT+1310 (Indochina Time)</td>
                                                    <td>-</td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>2</td>
                                                    <td>Mon Oct 14 2020</td>
                                                    <td>15:30 - 17:10</td>
                                                    <td>F2F</td>
                                                    <td>Y</td>
                                                    <td>P</td>
                                                    <td>Mon Oct 14 2019 15:11:04 GMT+1510 (Indochina Time)</td>
                                                    <td>-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </ </div> <!-- END OF TABLE -->

            <!-- FOOTER -->
            <?php include("components/footer.html"); ?>
            <!-- END OF FOOTER -->

            <!-- OPTIONAL JAVASCRIPT -->
            <!-- JQUERY FIRST, THE POPPER.JS, THEN BOOTSTRAP JS -->
            <?php include("components/javascript.html"); ?>
</body>

</html>