const checkboxes = document.querySelectorAll('.delete-item input');

for (let chk of checkboxes) {
    chk.addEventListener('click', function () {
        if (this.checked) {
            this.parentElement.style.borderColor = "#0004";
        }
        else {
            this.parentElement.style.borderColor = "transparent";
        }
        // console.log(this.parentElement);
    });
}