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
            <div class="col-md-12">
                <div id="carouselExampleControls2" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class=" carousel-item active">
                            <div class="row" style="padding: 0px !important">
                                <div class="col-md-4">
                                    <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                                        <div class="card">
                                            <h2 class="card-title">COMP6345 - Intelligent Systems </h2>
                                            <div class="card-body">
                                                <h7 class="card-text">D6034 - Andreas Kurniawan</h7>
                                                <hr>
                                                <p class="card-text">The course provides students with the knowledge of Artificial Intelligence (AI) concepts and enables them to develop intelligent programs. The course covers the basic intelligent building blocks such as solution searching algorithms, knowledge representation, logical reasoning (inference) and learning algorithms that allow an intelligent agent to operate autonomously in a complex environment to achieve its design purpose. It also covers the history of AI, the present, the future and the challenges that will broaden the students' perspectives on the field. Some projects that require programming work will provide the students with the opportunity to apply various techniques learned in the class to solve practical problems.</p>
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
                                                <p class="card-text">This course prepares student to perform offensive security for the purpose of penetration testing. It introduces hacking tools, techniques, and the theory behind how the tools are used and where they work. The materials follow ethical hacking steps such as foot printing, enumeration, system hacking, escalating privilege, and covering tracks. Areas of instruction include setting up a lab to act as a victim, understanding vulnerabilities of operating systems, using various tools used by hackers to access unauthorized information. The course includes hands-on lab on attacking and defending the systems and network.</p>
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
                                                <p class="card-text">This course is designed to teach the major web-related topics with several technologies as a unifying theme. It introduces students to the concepts and techniques of a dynamic web page construction, basic web protocols, explore design issues and techniques, and its implementation in Scripting language and Java server–side programming. Students will be exposed to development using those programming languages in solving common problems in the areas of development, and systems administration on a particular operating systems platform.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item ">
                            <div class="row" style="padding: 0px !important;">
                                <div class="col-md-4">
                                    <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                                        <div class="card">
                                            <h2 class="card-title">COMP6504 - Computer Architecture and Operating Systems</h2>
                                            <div class="card-body">
                                                <h7 class="card-text">D3378 - Benfano Soewito</h7>
                                                <hr>
                                                <p class="card-text">The course is designed to explain about computer architecture and organization, which includes computer evolution and performance, computer interconnection structures, internal and external memory, I/O, operating systems support, computer arithmetic, instruction sets, CPU structure and function, RISC, superscalar processors, control unit operation, micro-programmed control, multiprocessors and vector processing, and digital logic. In addition, it is also designed to explain the mechanism of general modern operating systems, which includes the history of most operating systems, their concepts, components, and functions, and how the common operating systems work in the hardware framework. Furthermore, the hands-on lab session will be the focus in an open source operating system, such as Linux, with the intention of broadening students’ minds, knowledge, and interest of an alternative open-source operating system.</p>
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
                                                <p class="card-text">This course is designed to increase student understanding of academic discourse, both written and spoken, and the ability to produce such discourse, at a certain level, in relation to general and student specific studies. Reading skills, such as skimming and scanning, and dealing with unknown vocabulary, are integrated with the production of various essay types, such as logical division of ideas, comparison-contrast and cause and effect. The course also focuses on the production and performance of professional outputs in the form of oral presentations in relation to students’ current studies. Language skills are provided by a workshop series for remediation in grammar, syntax and academic lexis acquisition. The course also emphasizes heavily on other academic skills such as paraphrasing, quoting, summarizing, and referencing.</p>
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
                                                <p class="card-text">The course Indonesian as a subject of personality development in college emphasizes students' skills to use Indonesian good and right, especially in preparing the essay academics with diction, effective sentence, and paragraphs coherence, and be able to present it in a variety of scientific language.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls2" role="button" data-slide="prev" style="margin-left: -35px; width: 40px; overflow-x: hidden;">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls2" role="button" data-slide="next" style="margin-right: -35px; width: 40px; overflow-x: hidden;">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- END OF CAROUSEL SUBJECTS -->

        <!-- CARDS -->
        <!-- CLASS MATERIALS -->
        <div class="row" style="padding: 0px !important">
            <div class="col-md-12 va-info">
                <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                    <div class="card text-center">
                        <div class="card-header">
                            Class Materials
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <!-- END OF CLASS MATERIALS -->

        <!-- FORUM -->
        <div class="row" style="padding: 0px !important">
            <div class="col-md-12 va-info">
                <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                    <div class="card text-center">
                        <div class="card-header">
                            Forum
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <!-- END OF FORUM -->

        <!-- ASSIGNMENTS -->
        <div class="row" style="padding: 0px !important">
            <div class="col-md-12 va-info">
                <a id="cardHover" href="#" style="text-decoration: none; color: black; text-align: center">
                    <div class="card text-center">
                        <div class="card-header">
                            Assignments
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <!-- END OF ASSIGNMENTS -->

        <!-- END OF CARDS -->
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