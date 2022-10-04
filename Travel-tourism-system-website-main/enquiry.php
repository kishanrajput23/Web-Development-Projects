<!DOCTYPE html>
<html lang="en">

<head>
    <title>Travel Masti</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/enquiry.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">

</head>

<body>
    <marquee bgcolor="lighblue">Note: All your tour enquiry and bookings will be checked by our experts and all
        information
        will be given at your
        given email and mobile number.Thank You for choosing Travel Masti! </marquee>
    <section class="my-5">
        <div id="Package Enquiry" class="py-5">
            <h2 class="text-center">Tour Enquiry</h2>
        </div>

        <div class="w-50 m-auto">
            <form action="enquirydb.php" method="post">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="user" autocomplete="off" class="form-control"
                        placeholder="Enter your username">
                </div>
                <div class="form-group">
                    <label>Email Id</label>
                    <input type="text" name="email" autocomplete="off" class="form-control"
                        placeholder="Enter your Email-id">
                </div>
                <div class="form-group">
                    <label>Mobile No</label>
                    <input type="text" name="mobile" autocomplete="off" class="form-control"
                        placeholder="Enter your Mobile-No">
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






    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>