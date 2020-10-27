function addDndHandlers() {

    var pieimages = document.getElementsByClassName("pies");
    var shoppingCartDropZone = document.getElementById("shoppingCart");

    var shoppingCart = document.querySelectorAll("#shoppingCart ul")[0];

    var Cart = (function() {
        this.pies = new Array();
    });

    var Pie = (function(title, price) {
        this.pieTitle = title;
        this.price = price;
    });

    var currentCart = null;
    currentCart = JSON.parse(localStorage.getItem('cart'));
    if (!currentCart) {
        createEmptyCart();
    }

    UpdateShoppingCartUI();

    currentCart.addPie = function(pie) {
        currentCart.pies.push(pie);
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }



    for (var i = 0; i < pieimages.length; i++) {
        pieimages[i].addEventListener("dragstart", function(ev) {
            ev.dataTransfer.effectAllowed = 'copy';
            ev.dataTransfer.setData("Text", this.getAttribute("id"));
        }, false);
    }


    shoppingCartDropZone.addEventListener("dragover", function(ev) {
        if (ev.preventDefault)
            ev.preventDefault();

        ev.dataTransfer.dropEffect = "copy";
        return false;
    }, false);

    shoppingCartDropZone.addEventListener("drop", function(ev) {
        if (ev.stopPropagation)
            ev.stopPropagation();

        var pieId = ev.dataTransfer.getData("Text");
        var element = document.getElementById(pieId);
        // currentCart = JSON.parse(localStorage.getItem("cart"));
        addPieToShoppingCart(element, pieId);
        ev.stopPropagation();
        return false;
    }, false);


    function addPieToShoppingCart(item, id) {

        var title = item.getElementsByClassName("title")[0].textContent;
        var price = item.getElementsByClassName("price")[0].textContent;
        var pie = new Pie(title, price);
        currentCart.addPie(pie);
        UpdateShoppingCartUI();
    }

    function createEmptyCart() {
        localStorage.clear();
        localStorage.setItem("cart", JSON.stringify(new Cart()));
        currentCart = JSON.parse(localStorage.getItem("cart"));
    }


    function UpdateShoppingCartUI() {

        shoppingCart.innerHTML = "";

        for (var i = 0; i < currentCart.pies.length; i++) {

            var liElement = document.createElement('li');
            liElement.innerHTML = currentCart.pies[i].pieTitle + ": " +
                currentCart.pies[i].price + "<br>" + " <input type = 'submit' class= 'delete'  value = 'Delete' onClick = 'DeleteItem(this)'>";
            shoppingCart.appendChild(liElement);

        }

    };


}