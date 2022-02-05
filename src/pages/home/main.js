const currentProduct = {
  id: 1,
  addedCount: 1
}

const productsList = [
  {
    id: 1,
    name: 'VIZIO 65" Class 4K UHD Quantum SmartCast Sma...',
    image: '../../assets/img/tv.jpg',
    currPrice: 548.0,
    oldPrice: 748.0,
    availableCount: 10
  },
  {
    id: 2,
    name: 'Apple Watch Series 5 GPS, 44mm Space Gray Alumi...',
    image: '../../assets/img/relogio.png',
    currPrice: 449.0,
    oldPrice: null,
    availableCount: 10
  },
  {
    id: 3,
    name: 'The Pioneer Woman Cowboy Rustic 14-Piece...',
    image: '../../assets/img/faqueiro.png',
    currPrice: 59.0,
    oldPrice: 69.97,
    availableCount: 10
  },
  {
    id: 4,
    name: 'onn. Wireless Charging Pad with LED Night Light',
    image: '../../assets/img/carregador.png',
    currPrice: 15.88,
    oldPrice: null,
    availableCount: 10
  },
  {
    id: 5,
    name: 'Office Chair Ergonomic Desk Chair Mesh Comp...',
    image: '../../assets/img/cadeira.png',
    currPrice: 554.99,
    oldPrice: 635.9,
    availableCount: 10
  },
  {
    id: 6,
    name: 'Hershey, Halloween Assorted Candy Nuts...',
    image: '../../assets/img/chocolate.png',
    currPrice: 9.94,
    oldPrice: 11.5,
    availableCount: 10
  },
  {
    id: 7,
    name: 'onn. Wireless Charging Pad with LED Night Light',
    image: '../../assets/img/carregador.png',
    currPrice: 449.0,
    oldPrice: 600,
    availableCount: 10
  },
  {
    id: 8,
    name: 'Hershey, Halloween Assorted Candy Nuts...',
    image: '../../assets/img/fone.png',
    currPrice: 11.9,
    oldPrice: 15.9,
    availableCount: 10
  }
]

const cartItems = []

const updateProductInfo = product => {
  const productTitle = document.querySelectorAll('.describe-featured-product')
  const productImage = document.querySelector('.product-featured-img img')

  productTitle.forEach(title => (title.innerText = product.name))
  productImage.setAttribute('src', product.image)
}

const getCurrentProduct = () => {
  const currProduct = productsList.find(
    product => product.id == currentProduct.id
  )
  return currProduct
}

const setCurrentProductItem = product_id => {
  currentProduct.id = product_id
  currentProduct.addedCount = 1

  const product = getCurrentProduct()
  if (!product) return

  updateProductInfo(product)
  displaydiscount(currentProduct.addedCount)
  productCart()
}

const displaydiscount = count => {
  const product = getCurrentProduct()

  if (!product) return

  const newPrice = document.getElementById('new-price')
  const oldPrice = document.getElementById('old-price')
  const tagSave = document.getElementById('tag-save')

  const totalValue = product?.currPrice * count
  newPrice.innerHTML = `$ ${totalValue.toFixed(2)}`

  if (product.oldPrice) {
    const oldTotalValue = product?.oldPrice * count
    oldPrice.innerHTML = `$ ${oldTotalValue.toFixed(2)}`

    const calcDiscount = oldTotalValue - totalValue
    tagSave.innerHTML = `SAVE $ ${calcDiscount.toFixed(2)}`
  } else {
    tagSave.style.display = 'none'
  }
}

const productCart = () => {
  const btnAdd = document.querySelector('.btn-add')
  const btnMinus = document.querySelector('.btn-minus')
  let leftCount = document.querySelector('.left-count')
  let numberCount = document.querySelector('.count')

  const product = getCurrentProduct()
  leftCount.innerHTML = product?.availableCount
  numberCount.innerHTML = currentProduct.addedCount

  btnAdd.onclick = () => {
    if (!product) return

    if (currentProduct.addedCount + 1 <= product.availableCount) {
      currentProduct.addedCount++
      numberCount.innerHTML = currentProduct.addedCount
      displaydiscount(currentProduct.addedCount)
    }
  }
  btnMinus.onclick = () => {
    if (currentProduct.addedCount > 1) {
      currentProduct.addedCount--
      numberCount.innerHTML = currentProduct.addedCount
      displaydiscount(currentProduct.addedCount)
    }
  }
}

const updateCartCount = () => {
  const totalAddedProducts = document.querySelector('.totalAddedProducts')
  const totalCount = 0
  const sumCount = cartItems.reduce((acc, curr) => (acc += curr.addedCount), 0)
  totalAddedProducts.innerHTML = sumCount
}

const addToCart = () => {
  const btnAddCart = document.querySelector('.btn-cart')
  const totalAddedProducts = document.querySelector('.totalAddedProducts')

  if (cartItems.length == 0) {
    totalAddedProducts.style.display = 'none'
  }

  btnAddCart.onclick = () => {
    const product = getCurrentProduct()

    if (!product) return

    if (product.availableCount < currentProduct.addedCount) return

    const itemOnCart = cartItems.findIndex(item => item.id == currentProduct.id)
    if (itemOnCart != -1) {
      cartItems[itemOnCart].addedCount += currentProduct.addedCount
    } else {
      const item = {
        ...product,
        addedCount: currentProduct.addedCount
      }
      if ('availableCount' in item) delete item['availableCount']

      cartItems.push(item)
      totalAddedProducts.style.display = 'flex'
    }

    product['availableCount'] -= currentProduct.addedCount
    currentProduct.addedCount = 1

    displaydiscount(currentProduct.addedCount)
    productCart()
    updateCartCount()
  }
}

const onClickProductItem = product_id => {
  window.scrollTo(0, 0)
  setCurrentProductItem(product_id)
}

const insertItems = () => {
  const list = document.querySelectorAll('.list-customer-bought')

  for (let i = 0; i < productsList.length; i++) {
    const element = productsList[i]
    const itemProduct = `
    <li class="item-customer" onClick="onClickProductItem(${element.id})">
      <img
        src="${element.image}"
        alt="Imagem ilustrativa de um notebook"
        class="img-customer"
      />
      <div class="header-customer">
        <a class="title-customer">
          ${element.name}
        </a>        
        <p class="old-price">$ ${element.oldPrice || '0.00'}</p>
        <h3 class="new-price">$ ${element.currPrice}</h3>
        <small class="installment">10x $ 320,00</small>
      </div>
    </li>
  `
    list.forEach(item => {
      item.insertAdjacentHTML('beforeend', itemProduct)
    })
  }
}

window.onload = () => {
  displaydiscount(currentProduct.addedCount)
  productCart()
  addToCart()
  insertItems()
}
