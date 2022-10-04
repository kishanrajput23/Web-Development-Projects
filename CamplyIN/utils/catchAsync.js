const catchAsync = fn => { //return func
    //that return a new function
    return (req, res, next) => {
        //func executed that catch a new error and pass it to next
        fn(req, res, next).catch(next)
    };
}

module.exports = catchAsync;