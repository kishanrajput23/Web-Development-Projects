<?php include('server.php') ?>
<!DOCTYPE html>
<html>

<head>
    <title>Registration</title>
    <link rel="stylesheet" type="text/css" href="css/style2.css">
</head>

<body>
    <div class="header">
        <h2>Register</h2>
    </div>

    <form method="post" action="register.php">

        <?php include('errors.php'); ?>

        <div class="input-group">
            <label>Username</label>
            <input type="text" name="username" autocomplete="off" value="<?php echo $username; ?>">
        </div>
        <div class="input-group">
            <label>Email</label>
            <input type="email" name="email" autocomplete="off" value="<?php echo $email; ?>">
        </div>
        <div class="input-group">
            <label>Password</label>
            <input type="password" name="password_1">
        </div>
        <div class="input-group">
            <label>Confirm password</label>
            <input type="password" name="password_2">
        </div>
        <div class="input-group">
            <button type="submit" class="btn" name="reg_user">Register</button>
        </div>
        <p>
            Already a member? <a href="login.php">Sign in</a>
        </p>
    </form>
</body>

</html>