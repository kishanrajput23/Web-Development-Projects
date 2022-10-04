<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Travel Masti</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">


</head>

<body>
    <nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand text-warning font-weight-bold" href="#">Travel Masti</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link text-warning font-weight-bold" href="#">Home <span
                            class="sr-only">(current)</span></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link text-warning " href="#AboutUs">AboutUs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning " href="#Services">Services</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning " href="register.php">Register</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link text-warning" href="#ContactUs">Contact Us</a>
                </li>

                <?php if(isset($_SESSION['username'])){?>
                <li><a class="nav-link text-warning" href="index.php"><?php echo $_SESSION['username'];?></a></li>
                <a class="nav-link text-warning" href="logout.php">Logout</a>
                <?php }else {?>
                    <li><a href="login.php">Login</a></li>


               <?php }?>
                
            </ul>

        </div>
    </nav>






    <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-interval="3000" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>

        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="images/79.jpg" alt="First slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2>Agra(India)</h2>
                    <p>India is one the best country in the World.India is rich in all cultural and
                        traditional activities. </p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="images/1.jpg" alt="Second slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2>Europe(London)</h2>
                    <p>London is one of the best cities for tourism and the most attractive spot in UK
                    </p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="images/2.jpg" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2>Sydney(Austrailia)</h2>
                    <p> Austrailia is famous for its kangaroos and it is one of the most tourist visit
                        places in the world.</p>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>








    <section class="my-5">
        <div id="AboutUs" class="py-5">
            <h2 class="text-center">About Us</h2>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                    <img src="images/3.jpg" class="img-fluid aboutusimg">
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                    <h2 class="display-4">Tour with Travel Masti</h2>
                    <p class="py-3">Travel & TourismTravel is the largest service industry in India. It provides
                        heritage, cultural, medical, business and sports tourism. The main objective of this sector is
                        to develop and promote tourism, maintain competitiveness of India as tourist destination and
                        improve and expand existing tourism products to ensure employment generation and economic
                        growth. In this section, we provide information about various tourist destinations, modes of
                        travel, accommodation and approved travel agents.<br><br>
                        Tourism is travel for pleasure or business; also the theory and practice of touring, the
                        business of attracting, accommodating, and entertaining tourists, and the business of operating
                        tours. The World Tourism Organization defines tourism more generally, in terms which go "beyond
                        the common perception of tourism as being limited to holiday activity only", as people
                        "traveling to and staying in places outside their usual environment for not more than one
                        consecutive year for leisure and not less than 24 hours, business and other purposes".</br></br>
                    </p>
                    <a href="aboutus.php" class="btn btn-success"> Read More</a>
                </div>
            </div>
        </div>
    </section>
    <hr>








    <section class="my-5">
        <div id="Services" class="py-5">
            <h2 class="text-center">Our Services</h2>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-12">
                    <div class="card">
                        <img class="card-img-top" src="images/1.jpg" alt="Card image">
                        <div class="card-body">
                            <h4 class="card-title">London(Europe)</h4>
                            <p class="card-text">Europe is a continent located entirely in the Northern Hemisphere and
                                mostly in the Eastern Hemisphere. It has lots of tourists attraction with full
                                bloom.Book your tour for fantastic holidays now.Travel London for one of the best
                                expierience in your life.

                                <br><br>Starting From:<br>
                                Rs.200,000<br><br>

                                7 Days, 6 Nights
                            </p>
                            <a href="enquiry.php" class="btn btn-primary">Book Package</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <div class="card">
                        <img class="card-img-top" src="images/79.jpg" alt="Card image">
                        <div class="card-body">
                            <h4 class="card-title">Agra(India)</h4>
                            <p class="card-text">Welcome to a soulful experience of vacationing in India, the cradle of
                                ancient civilization with rich cultural heritage.<br> Experience the sights and sounds
                                of
                                its amazing diversity that is embedded in its geography, people and their
                                cultures.<br>
                                <br>

                                Starting From:<br>
                                Rs.85,000<br><br><br>

                                6 Days, 5 Nights
                            </p>
                            <a href="enquiry.php" class="btn btn-primary">Book Package</a>
                        </div>
                    </div>

                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <div class="card">
                        <img class="card-img-top" src="images/6.jpg" alt="Card image">
                        <div class="card-body">
                            <h4 class="card-title">Sydney(Austrailia)</h4>
                            <p class="card-text">Austrailia is one of the best cities for tourism and the most
                                attractive spot in Austrailia.Australia is a country for all seasons.<br><br>
                                Starting From:<br>
                                Rs.300,000<br><br>

                                6 Days, 5 Nights<br><br>
                            </p>
                            <a href="enquiry.php" class="btn btn-primary">Book Package</a><br><br>
                        </div>
                    </div>
    </section>
    <hr>






    <section class="my-5">
        <div id="Gallery" class="py-5">
            <h2 class="text-center"> Our Gallery</h2>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-12">
                    <img src="images/aust.jpg" class="img-fluid pb-3">
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <img src="images/6.jpg" class="img-fluid pb-3">
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <img src="images/shimla.jpg" class="img-fluid pb-3">
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <img src="images/3.jpg" class="img-fluid pb-3">
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <img src="images/london.jpg" class="img-fluid pb-3">
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <img src="images/56.jpg" class="img-fluid pb-3">
                </div>
            </div>
        </div>
    </section>
    <hr>






    <section class="my-5">
        <div id="ContactUs" class="py-5">
            <h2 class="text-center">Contact Us</h2>
        </div>

        <div class="w-50 m-auto">
            <form action="userinfo.php" method="post">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="user" autocomplete="off" class="form-control">
                </div>
                <div class="form-group">
                    <label>Email Id</label>
                    <input type="text" name="email" autocomplete="off" class="form-control">
                </div>
                <div class="form-group">
                    <label>Mobile No</label>
                    <input type="text" name="mobile" autocomplete="off" class="form-control">
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea class="form-control" name="message">
                      </textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>

            </form>
        </div>
    </section>




    <footer>
        <h2 class="p-3 bg-dark text-white text-center">@Travel Masti</h2>
    </footer>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>