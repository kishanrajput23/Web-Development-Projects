// to ask if they are sure to delete campground
const deleteBtn = document.getElementById('delete-btn');
if (deleteBtn) {
    deleteBtn.onclick = (event) => {
        let willDelete = confirm('Do you want to delete this campground?');
        if (!willDelete) event.preventDefault();
    };
}

// to prevent image overload when adding images
const addImageBtn = document.querySelector('.adds-images');
if (addImageBtn) {
    const imageInput = document.getElementById('new-camp-images');
    const fileLabel = document.querySelector('.custom-file-label');
    addImageBtn.onclick = (event) => {
        if (imageInput && imageInput.files.length > 3) {
            event.preventDefault();
            imageInput.classList.add('invalid');
            fileLabel.classList.add('invalid-text');
            fileLabel.innerText = "Maximum of 3 photos only.";
        }
    }
}