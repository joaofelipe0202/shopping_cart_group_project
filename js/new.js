class Cart {
  constructor() {
    this.courses = [];
  }

  get length() {
    return this.courses.length;
  }

  addCourse(id) {
    const currentCourse = courses.find(course => {
      return course.id === id;
    });
    this.courses.push(currentCourse);
    this.reDraw();
  }

  decreaseSpaces(li) {
    const spacesRemaining = li.querySelector('#spaces-remaining span');
    let spacesLeft = parseInt(spacesRemaining.textContent);
    let previousSpaces = spacesLeft;
    spacesLeft > 0 ? spacesLeft-- : alert('Sorry, no spaces remaining.');
    spacesRemaining.innerHTML = spacesLeft;
    return previousSpaces;
  }

  removeCourse(index, id) {
    this.courses.splice(index,1);
    cart.increaseSpaces(id);
    this.reDraw();
  }

  increaseSpaces(id) {
    const courseCards = document.querySelectorAll('.courses li');
    courseCards.forEach(course => {
      if(course.dataset.courseId === id) {
        const spacesRemaining = course.querySelector("#spaces-remaining span")
        let updateSpaces = parseInt(spacesRemaining.textContent);
        spacesRemaining.textContent = ++updateSpaces;
      }
    });
  }

  subtotal() {
    //return 2 decimal of the values of all the items
    let subTotalPrice = 0;
    this.courses.forEach(course => {
      subTotalPrice += this.getPrice(course);
    });

    return subTotalPrice.toFixed(2);

  }

  total() {
    //return 2 decimal subtotal calculated with 13% tax
    let totalPrice = 0;
    let subTotal = this.subtotal();
    totalPrice = subTotal*(1+0.13);
    return totalPrice.toFixed(2);
  }

  getPrice(course) {
    return course.price;
  }

  reDraw() {
    const ul = document.querySelector('.cart-inner ul');
    ul.innerHTML = '';

    this.courses.forEach((course, index) => {
      const item = `<li data-id = '${course.id}' data-index = '${index}'>
        <img src="images/${course.image}">  
        <div id="cart-title">${course.title}</div>
        <div id="cart-price">${course.price}</div>
        <div id="delete">
          <i class="far fa-times-circle"></i>
        </div>
      </li>`;
      ul.insertAdjacentHTML('afterbegin', item);
    });

    document.querySelector('#items-in-cart').innerHTML = `You have ${this.length} ${this.length === 1 ? 'item' : 'items' } in your cart`;

    const subtotalAmount = document.querySelector('#subtotal-amount'),
    totalAmount = document.querySelector('#total-amount');

    subtotalAmount.innerHTML = '$'+this.subtotal();
    totalAmount.innerHTML = '$'+this.total();
  }
}

const cart = new Cart();
const cartInner = document.querySelector('.cart-inner ul');
const coursesContainer = document.querySelector('.courses');

coursesContainer.addEventListener('click', event => {
  if(event.target.nodeName === 'BUTTON') {
    const li = event.target.closest('li');
    if(cart.decreaseSpaces(li) > 0) {
      cart.addCourse(li.dataset.courseId);
      console.log(li.dataset.courseId);
    };
  }
});

cartInner.addEventListener('click', event => {
  if(event.target.childNode = 'I') {
    const li = event.target.closest('li');
    cart.removeCourse(li.dataset.index,li.dataset.id);
  }
});