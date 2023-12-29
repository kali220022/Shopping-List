const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemFromStorage = getItemsFromStorage()
    itemFromStorage.forEach((item) => addItemToDOM(item))
    checkUI()
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Create item DOM element
    addItemToDOM(newItem)

    // Add item to local storage
    addItemToStorage(newItem)

    checkUI()

    itemInput.value = '';
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);

}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemFromStorage = getItemsFromStorage();

    // Add new items
    itemFromStorage.push(item)

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemFromStorage))
}

function getItemsFromStorage() {
    let itemFromStorage;

    if (localStorage.getItem('items') === null) {
        itemFromStorage = []
    } else {
        itemFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemFromStorage
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    }
}

function removeItem(item) {
    if (confirm('Are you sure?'))

        // Remove Item from storage
        item.remove();

    removeItemFromStorage(item.textContent)
    checkUI()
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

    //Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems() {
    if (confirm('Are you sure? ')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }

        // Clear from local storage
        localStorage.removeItem('items')
        checkUI()
    }
}

function filterItems(e) {
    const text = e.target.value.toLowerCase()
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })

}

function checkUI() {
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    clearBtn.addEventListener('click', clearItems);
    itemList.addEventListener('click', removeItem);
    itemList.addEventListener('click', onClickItem);
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI()

}

init()