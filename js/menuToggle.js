function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
}
let x = document.getElementById('hamburgerBtn');
x.onclick = toggleMenu;
let y = document.getElementsByClassName("collapsed");
for (var i = 0; i < y.length; i++) {

    y[i].addEventListener("click", function() {
        this.classList.toggle("expand");
    })

}