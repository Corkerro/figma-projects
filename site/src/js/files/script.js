// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


const difficulty_list = ['легкий', 'средний','сложный','гуру']
const type_list = ['лендинг', 'магазин','многостраничник','приложение', 'квиз']
const adaptive_list = ['адаптивный', 'десктоп','мобильный']
const language_list = ['en', 'ru','ukr']


function setUrlParams() {
    if (difficulty_list.includes(hash)) {
        url_params = `filters[difficulty][$eq]=${hash}&sort=daatee:desc`
    } else if (type_list.includes(hash)) {
        url_params = `filters[type][$eq]=${hash}&sort=daatee:desc`
    } else if (adaptive_list.includes(hash)) {
        url_params = `filters[adaptive][$eq]=${hash}&sort=daatee:desc`
    } else if (language_list.includes(hash)) {
        url_params = `filters[language][$eq]=${hash}&sort=daatee:desc`
    } 
    else {
        url_params = 'sort=daatee:desc'
    }
}

let url_params
let hash = decodeURIComponent(location.hash.split('#')[1])


// выбираем элементы на странице
const mainBlock = document.querySelector('.main__block');
let page = 1;

document.querySelector('.header__logo').addEventListener('click', () => {
    page = 1
    window.location.hash = ''
})


function buttonsFilter() {
    const difficulty = document.querySelectorAll('.search');
    difficulty.forEach(button => {
        button.addEventListener('click', () => {
            page = 1
            window.location.hash = button.innerHTML.split('#')[1]
        });
    });
}


document.getElementsByClassName

async function fetchCards() {
    let pageSize
    if (window.innerWidth > 1270) pageSize = 12
    if (window.innerWidth >790) pageSize = 8
    if (window.innerWidth <=790) pageSize = 3
    console.log(`http://localhost:1337/api/cards?${url_params}&pagination[page]=${page}&populate=media&_sort=date:DESC&pagination[pageSize]=${pageSize}`);
    const response = await fetch(`http://localhost:1337/api/cards?${url_params}&pagination[page]=${page}&populate=media&_sort=date:DESC&pagination[pageSize]=${pageSize}`);
    const data = await response.json();
    return data;
}
function myDate(value) {
    const dateString = value;
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDate
}

async function displayCards() {
    document.querySelector('.main__loader').classList.toggle('hidden');
    const { data, meta: { pagination } } = await fetchCards();
    const cardsHtml = data.map(card => (
        fetch(`http://localhost:5000/cards/${card.id}`),
        `
        <div class="main__card">
            <div class="main__card_top">
                <div class="main__card_date"><img src="./img/calendar.svg" alt=""> ${myDate(card.attributes.daatee)}</div>
                <div class="main__card_views"><img src="./img/eye.svg" alt=""> ${parseInt(card.attributes.views)+1}</div>
            </div>
            <video loop autoplay src="${card.attributes.media.data.attributes.url.replace(/\/uploads/g, 'http://localhost:1337/uploads')}" controls></video>
            <ul>
                <li><strong>${card.attributes.title} </strong>${card.attributes.description}</li>
                <li><strong>Уровень сложности: </strong><button class="${card.attributes.difficulty} search">#${card.attributes.difficulty}</button></li>
                <li><strong>Тип: </strong><button class="${card.attributes.type} search">#${card.attributes.type}</button></li>
                <li><strong>Адаптивность: </strong><button class="${card.attributes.adaptive} search">#${card.attributes.adaptive}</button></li>
                <li><strong>Язык: </strong><button class="${card.attributes.language} search">#${card.attributes.language}</button></li>
                <li><strong>Цена макета: </strong>~${card.attributes.price} ₽.</li>
                <p>P.S. Вы можете дублировать файл Figma себе, нажав на Duplicate to your Drafts.</p>
            </ul>
            <div class="main__card_down">
                <a href="${card.attributes.link}">Ссылка на макет</a>
                <a href="${card.attributes.telegram}">Макет в телеграмме</a>
            </div>
        </div>
    `
    )).join('');
    mainBlock.insertAdjacentHTML('beforeend', cardsHtml);
    page++;
    buttonsFilter()
    if (page <= pagination.pageCount) {
        window.addEventListener('scroll', scrollHandler);
    }
    document.querySelector('.main__loader').classList.toggle('hidden');
}

function scrollHandler() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        window.removeEventListener('scroll', scrollHandler);
        displayCards();
    }
}
window.addEventListener('hashchange', () => changePage());

function changePage() {
    document.getElementById('main__block').innerHTML = ''
    hash = decodeURIComponent(location.hash)
    url_params = `sort=daatee:desc`
    page = 1
    if (hash) {
        hash = hash.split('#')[1]
        setUrlParams()
    }
    displayCards()
}
setUrlParams()
displayCards();

let search = document.querySelector('._search')
search.addEventListener('input', () => {
    page = 1
    if (search.value != '') {
        window.location.hash = ''
        document.getElementById('main__block').innerHTML = ''
        url_params = `filters[$or][0][title][$containsi]=${search.value}&filters[$or][1][description][$containsi]=${search.value}&filters[$or][2][language][$containsi]=${search.value}&filters[$or][3][type][$containsi]=${search.value}&filters[$or][4][adaptive][$containsi]=${search.value}&sort=daatee:desc`
        if (!isSearch) isSearch = true
    } else {
        document.getElementById('main__block').innerHTML = ''
        url_params = `sort=daatee:desc`
    }
    displayCards()
})

let isSearch = false