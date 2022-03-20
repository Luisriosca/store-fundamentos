const productos = [
    {
        id: 1,
        name: 'Gradient Frame 30x65cm',
        price: 399,
        img: './assets/img/product1.jpg'
    },
    {
        id: 2,
        name: 'Gradient Frame 30x65cm',
        price: 399,
        img: '/assets/img/product2.jpg'
    },
    {
        id: 3,
        name: 'Gradient poster 30x55cm',
        price: 299,
        img: './assets/img/product3.jpg'
    }
];

const database = {
    items: productos,
    methods: {
        find: function (id) {
            return database.items.find((item) => item.id === id );
        },
        render: function () {
            let html = '';
            database.items.forEach((item) => { 
                html += '<div class="product">';
                html += `<h3>${item.name}</h3><h3>$${item.price}</h3>`
                html += `<img class="product-img" src="${item.img}"/>`
                html += `<button class="btn-add" data-id="${item.id}">ADD TO CART</button>`
                html += '</div>'
            });
            
            return html;
        }
    }
}

const cart = {
    items: [],
    methods: {  
        add: function (id) {
            if(cart.methods.isAlreadyInCart(id)){
                alert('ese producto ya se encuentra en el carrito');
            } else{
                const item = database.methods.find(id);
                cart.items.push(item);
            }
        },
        count: function(){
            return cart.items.length;
        },
        getTotal: function(){
            let sum = 0;
            cart.items.forEach((item) => {
                sum += +item.price
            });
            return sum;
        },
        render: function (){
            let count = document.getElementById('count');
            count.innerHTML = cart.methods.count() + ' items';
            let html = ''; 
            
            cart.items.forEach((item) => {
                html += '<div class="product-cart">'
                html += `<h3>${item.name} - $${item.price}</h3>`
                html += `<img class="product-img img-cart" src="${item.img}"/>`
                html += `<button class="btn-remove" data-id="${item.id}">remove</button>`
                html += '</div>'
            });
            html += ` <h4>La suma del carrito es: ${cart.methods.getTotal()}</h4>`
            return html;
        },
        remove: function(id){
            cart.items = cart.items.filter((item) => {
                return item.id !== id
            });
        },
        isAlreadyInCart: function (id){
            return cart.items.find((item) => {
                return item.id === id
            });
        }
        
    }
}

let productsContainer = document.getElementById('products-container');
productsContainer.innerHTML = database.methods.render();

let cartContainer = document.getElementById("cart");
cartContainer.innerHTML = cart.methods.render();

// !Eventos
const wrapper = document.getElementById('wrapper');
wrapper.addEventListener('click', (evento) => {
    if (evento.target.matches('.btn-add')){
        let id = evento.target.dataset.id;
        // console.log(+cart.methods.getTotal());
        cart.methods.add(+id);
        cartContainer.innerHTML = cart.methods.render();
    }

    if (evento.target.matches('.btn-remove')){
        let id = evento.target.dataset.id;
        // console.log(+id);
        cart.methods.remove(+id);
        cartContainer.innerHTML = cart.methods.render();
    }
    // console.log(cart.items);
    cartContainer.innerHTML = cart.methods.render();
});


