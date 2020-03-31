<!doctype html>
<html lang="en">

<head>
    <!-- REQUIRED META TAGS -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="main.css">

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

    <h1 style="text-align: center; padding: 20px;">Hello World!</h1>

    <!-- TABLE -->
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Period</th>
                    <th scope="col">D</th>
                    <th scope="col">Heading</th>
                </tr>
            </thead>
            <tbody>
                <tr class="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1" href="#collapseOne">
                    <td class="expand-button"></td>
                    <td>Cell</td>
                    <td>Cell</td>
                    <td>Cell</td>
                </tr>
                <tr class="hide-table-padding">
                    <td></td>
                    <td colspan="3">
                        <div id="collapseOne" class="collapse in p-3">
                            <div class="row">
                                <div class="col-2">label</div>
                                <div class="col-6">value 1</div>
                            </div>
                            <div class="row">
                                <div class="col-2">label</div>
                                <div class="col-6">value 2</div>
                            </div>
                            <div class="row">
                                <div class="col-2">label</div>
                                <div class="col-6">value 3</div>
                            </div>
                            <div class="row">
                                <div class="col-2">label</div>
                                <div class="col-6">value 4</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- END OF TABLE -->

    <!-- FOOTER -->
    <?php include("components/footer.html"); ?>
    <!-- END OF FOOTER -->

    <!-- OPTIONAL JAVASCRIPT -->
    <!-- JQUERY FIRST, THE POPPER.JS, THEN BOOTSTRAP JS -->
    <?php include("components/javascript.html"); ?>
</body>

</html>