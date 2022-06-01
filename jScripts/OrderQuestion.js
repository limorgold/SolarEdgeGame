const draggable_list = document.getElementById('draggable-list');
const submitAnswer = document.getElementById('checkAnswer');
const orderQuestion = document.getElementById('orderQuestion');

let availableQuesions = [];
let correntQuestion = {};
let questionCount = 0;
const questions = [
    {
        question: "Sort the list of names so the richest person is on top",
        QuestionPic: "",
        listItem: [
            'Jeff Bezos',
            'Bill Gates',
            'Warren Buffett',
            'Bernard Arnault'            
        ],
        feedback: "The richest man in the world is Jeff Bezos",
        tyep: "order",
        difficulty: 3
    },
    {
        question: "Sort the list of names so the oldest person is on top",
        QuestionPic: "",
        listItem: [
            'Yotam Avrahami',
            'Limor Avrahami',
            'Roi Ben-Zvi',
            'Liron Blum'
        ],
        feedback: "The oldes person in the list is Yotam Avrahami",
        tyep: "order",
        difficulty: 1
    }
    
];
availableQuesions = [...questions];
//correntQuestion = availableQuesions[questionCount];

// Store listitems
const listItems = [];
let dragStartIndex;

createList();


// Insert list items into DOM
function createList() {
    correntQuestion = availableQuesions[questionCount];

    orderQuestion.innerText = correntQuestion.question;
    correntQuestion.listItem
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
             <div class="draggable" draggable="true">
             <p class="person-name">${person}</p>
             <i class="fas fa-grip-lines"></i>
             </div>
             `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    submitAnswer.disabled = false;
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        //if (personName !== questions[index]) {
        if (personName !== correntQuestion.listItem[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
    questionCount++
    setTimeout(() => {
        createList();
    }, 1000);
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}