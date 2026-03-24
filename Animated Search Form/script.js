document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector(".search");
    const btn = document.querySelector(".search + button");
    const form = document.querySelector("form");

    btn.addEventListener("click", function (e) {
        if (!input.classList.contains("active")) {
            e.preventDefault();
            input.classList.add("active");
            input.focus();
        } else {
            form.submit();
        }
    });
});
