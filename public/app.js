let select = document.querySelector('select');

document.querySelectorAll(".dlt-btn").forEach(button => {
    button.addEventListener("click", function(event) {
        if (!confirm("Do you want to delete this chat?")) {
            event.preventDefault();
        }
    });
});
