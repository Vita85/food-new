window.addEventListener('DOMContentLoaded', () => { //вешаем большой обработчик событий
    //TABS
    const tabs = document.querySelectorAll('.tabheader__item'), // querySelectorAll-получим все вкладки которые тут есть;tabheader__item класс который мы хотим получить
          tabsContent = document.querySelectorAll('.tabcontent'), //весь контент который есть в верстке
          tabsParent = document.querySelector('.tabheader__items'); //родитель который содержит все табы
    function hideTabContent() {   //этой функцией скрыть все ненужные табы
        tabsContent.forEach(item => { //внутри каждый ненужный контетн
            // item.style.display = "none";
            //вместо ин-лайн стилей прописываем классы
            item.classList.add('hide'); //добавляем класс 'hide
            item.classList.remove('show', 'fade');//удаляем класс 'show'
        });
        tabs.forEach(item => {   
            item.classList.remove('tabheader__item_active'); //удаляем класс активности у скрытых табов
        });
    } 
    function showTabContent(i = 0) {  //создаем функцию которая показывает табы
        // tabsContent[i].style.display = 'block'; //обращаемся к контенту и [i]передаем как аргумент
        //и тут так же добавляем классы как и выше,это только после того как добавили классы в стили
        tabsContent[i].classList.add('show', 'fade'); //нужный елемент показываем
        tabsContent[i].classList.remove('hide'); //у нужного елемента удаляем класс hide
        tabs[i].classList.add('tabheader__item_active'); //добавляем класс активности табам
    }
    hideTabContent(); //вызываем созданные функции
    showTabContent(); //так как хотим показать первый таб,передаем 0
    //(i=0)-этим мы говорим,что если функция showTabContent() будет без аргумента,то по умолчанию передастся 0  
   
    //делегирование событий,назначаем обработчик событий "клик"
    tabsParent.addEventListener('click', (event) => { //навешиваем обработчик на родителя
        const target = event.target; //переменная для event.target;чтобы постоянно не прописывать event.target,будет писать target

        if (target && target.classList.contains('tabheader__item')) { //проверяем что мы точно кликнули в таб
            /*для того чтобы кликнув на определенный таб
             показать соответствующую картинку,надо присвоить номер и по этому номеру вызвать функцию showTabContent;
             мы говорим,что если елемент который находится в псевдомассиве совпадает с елементом на который кликнул пользователь,
             тогда мы берем его номер и показываем на странице
            */
           tabs.forEach((item, i) => { //перебираем каждый елемент из масива
               if(target == item) { //если тот елемент в который только что кликнули совпадает с елементом который мы перебираем в цикле
                hideTabContent(); //вызываем созданные функции
                showTabContent(i); //i-номер елемента,который совпал
                }
            });
        }
    });
    //TIMER
    const deadline = '2021-12-30';  //создаем переменную которая будет определять дедлайн(тоесть когда акция закончится)
    function getTimeRemaining(endtime) {  //функция которая будет определять разницу между текущим временем и дедлайном(Remaining-осталось)
        const t = Date.parse(endtime) - Date.parse(new Date()), //тут мы получим количество миллисекунд,которое будет нашим конечным временем
        //теперь нам нужно разницу в миллисекундах которую мы получили превратить в дни,чвсы и минуты
              days = Math.floor(t / (1000 * 60 * 60 * 24)), //общее кол-во дней до конца
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), //общее кол-во часов до конца
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return { //создаем обьект и возвращаем значения
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //функция которая будет проверять длину числа,чтобы в тех.что меньше 10 подставлялся 0
    function getZero(num) { 
        if (num >= 0 && num < 10) {//если число больше 0 и меньше 10
            return `0${num}`; //то верни 0 цифре
        } else if (num < 0 ) {
            return '00'; //это условие прописываем если акция уже прошла,чтобы не было (-)
        }else {
            return num; //если нет,то верни просто еєто число
        }    //это условие мы подставляем ниже,в функцию расчета времени
    }
    //функция которая будет устанавливать таймер прямо на страничку 
    function setClock(selector, endtime) { 
       const timer = document.querySelector(selector),
            days = timer.querySelector('#days'), 
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); //запуск функции updateClock каждую секунду(создали ниже)
        updateClock(); //вызвали функцию обновления,а потом она запустится

    //создаем функцию которая будет обновлать таймер каждую секунду
    function  updateClock() {
        const t = getTimeRemaining(endtime); //расчет времени который у нас остался прямо на эту секунду,вызываем функцию,которую создали выше
        //функция расчетает величины и отобразит на странице + условие
            days.innerHTML = getZero(t.days); //количество дней которые нужно получить на странице
            hours.innerHTML = getZero(t.hours); //количество часов которые нужно получить на странице
            minutes.innerHTML = getZero(t.minutes); //количество минут которые нужно получить на странице
            seconds.innerHTML = getZero(t.seconds); //количество секунд которые нужно получить на странице
    
        /*но,таймер же остановиться и интервал нам тоже надо будет остановить
        воспользуемся переменной t('total'),ведь в ней содержаться миллисекунды
        */
            if (t.total <= 0) {  //ставим условие,что если переменная <= 0,тоесть время вышло,то:
                clearInterval(timeInterval); //останавливаем интервал(не обновляем таймер)
            }
        }
    }
    setClock('.timer', deadline); //вызываем функцию которая устанавливает таймер на страницу

    //МОДАЛЬНЫЕ ОКНА
    /*
    Мы назначили data-modal в верстке для кнопок которые будут отвечать за вызов модального окна;
    data-close- чтобы закрыть модальное окно.
    Теперь мы с помощью селекторов сможем получить только нужные кнопки
    */
   const modalWindow = document.querySelectorAll('[data-modal]'),  //получили нужные кнопки с верстки,их несколько,это атрибут- поэтому[]
        modal = document.querySelector('.modal'); //переменная которая отвечает за само модальное окно
        // modalClose = document.querySelector('[data-close]'); //кнопка отвечающая за закрытие модал.окна,мы удали ее когда будем ниже делать спинер

    /*нам понадобиться 2 функции: 
    1-отвечает за открытие(когда нажимает кнопку,тригер открывает окно);
    2-отвечает за закрытие этих окон
    И кроме того,повесить обработчик событий сразу на несколько тригеров,чтобы и там и там срабатывала одна и та же функция
    */
    function openModal () { //функция которая будет открывать модальное через какое-то время
        modal.classList.add('show'); //показывает окно
        modal.classList.remove('hide'); //если оно показано было-скрываем(тоест при повторном клике сворачиваем)
        document.body.style.overflow = 'hidden'; //теперь сделаем так,чтобы когда модальное окно открыто,у нас не было прокрутки страницы
        /*overFlow-свойство отвечающее за прокрутку,'hidden'-отображает то,что не выходит за границы*/
        clearInterval(modalTimerId); //мы сказали,что если пол-ль сам открыл модальное(раньше),то очистить

    }
    modalWindow.forEach(btn => { //перебираем кнопки в псевдомассиве
        btn.addEventListener("click", openModal); //вешаем обработчик на кнопки и говорим,что при клике-
    });
    
    /*но у нас повторяются два одинаковых участка кода modalaclose = modal
    поэтому мы эти участки определим в функцию и будем вызывать уже ее
    */
    function closeModal () {
        modal.classList.add('hide'); //скрываем окно
        modal.classList.remove('show'); //если оно было скрыто -показываем (тоест при повторном клике)
        document.body.style.overflow = ''; //а тут наоборот,когда окно закрыто,востановить прокрутку
    }
    // modalClose.addEventListener("click", closeModal); //вешаем обработчик прописываем функцию и говорим,что при клике- обратная функция,ее тоже удаляем когда добавим спинер
       
    
     //Сделаем,чтобы при клике на всю подложку(<div class="modal__dialog">),это обертка для модального окна,окно закрывалось
     modal.addEventListener('click', (e) => {  //на все модальное окно вешаем обработчик и передаем обьект события(е)
        if (e.target === modal || e.target.getAttribute('data-close') == '') {  
            /*когда удалили(я закоментировала) две функции вверху,то дописываем условия что если кликаем на подложку или какой то крестик,то модалка закрывается
            //говорим что если область куда кликнул пользователь (e.target) будет строго совпадать (===) с modal,то:
            */
            closeModal(); // а тут функцию,которую прописали для повторяющегося кода уже вызываем;она должна сработать после условия
        }
    });
    /*сделаем чтобы при нажатии на кнопку Esc окно закрывалось
    'keydown'-свойство отвечает за вдавливание кнопки
    уловитьт e.code(это коды для кнопок) в event.code есть таблицы с кодом для каждой кнопки
    */
    document.addEventListener('keydown', (e) => { //обработчик на весь документ,прописываем свойство и обьект собития
        if (e.code ==='Escape' && modal.classList.contains('show')) { //говорим,что если произошло событие нажатия четко на кнопку Esc,то:
            closeModal(); // вызываем функцию,закрывающую окно
            //а можна так    if(e.code === 'Escape' && !modal.classList.contains('hide'))
        }
        /*чтобы окно реагировкало на клавишу Esc только когда оно открыто
        && modal.classList.contains('show')-говорим что только если клас шоу показано(содержится ли оно)
        */
    });
    /* чтобы модальное открывалось через 10-15 секунд
    setTimeout-чтобы запустить функцию через определенный промежуток времени
    openModal-функция которую создали выше
    */
   const modalTimerId = setTimeout (openModal, 50000); //через 3 секунды

   /*чтобы отследить скролил ли пользователь страницу,используем событие scroll и вешается оно на глобальный обьект window
   pageYOffset - прокрученна часть
   clientHeight-видимая часть которую мы сейчас видим на сайте,без какой-то прокрутки
   (то что прокрутил и то что сейчас видимое,если в сумме >= высоте всей страницы,то значит поль-ль долистал до конца)
   и если эта сумма будет >= document.documentElement.scrollHeight(высоте всей страницы),это значит сто пользователь долистал до конца 
   на -1 пиксель раньше чем закончится страничка будет выскакивать модальное*/
   function showModalByScroll() { //функция которая показывает модальное во время скрола в ней условие
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
        openModal();
window.removeEventListener('scroll', showModalByScroll);//чтобы удалить какой то обработчик события мы должны сделать ссылку на функцию которая исполнялась как этот обработчик
//теперь как только пользователь долистал до конца ему один раз показалось модальное и все,больше не будет
/*
еще одно решение
if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
openModal();
removeScrollEvent();
} 
или
(window.pageYOffset >= 3800)-это когда мы на определенной точке
*/
}
}
window.addEventListener('scroll', showModalByScroll);

//ИСПОЛЬЗУЕМ КЛАССЫ ДЛЯ КАРТОЧЕК ТОВАРА
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) { //parentSelector-чтобы знать куда помещать елемент
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;//это массив,поэтому переберем  его с помощью forEach
        this.parent = document.querySelector(parentSelector); //тут лежит дом-елемент,в свойство parent кладем элемент со страницы по такому селектору
        this.transfer = 27; //свойство transfer со статическим курсом валют(27)
        this.changeToUAH();
    }/*this.parent и остальные this.src-это аргументы, которые мы передаем в параметр функции конструктора, 
    а ключевое слово this как раз указывает на принадлежность именно к новому классу, а не функции конструктора. 
    В общем this.src(это аргумент нового созданного класса) =src(присвоить значение параметру конструктора).
    Чтобы иметь возможность в процессе менять или добавлять параметры,мы в constructor еще прописываем один параметр-(...classes)
    */
    changeToUAH() { //метод для конвертации валют
        this.price = this.price * this.transfer;
    }
    render() { //вызовом метода render мы создаем структуру которая помещается в определенный  div
        //в структуру подставляем свойства this,что прописывали выше  
        const element = document.createElement('div');//Создаем переменную element и создаем element 'div', чтобы была обертка

        //чтобы проверить сколько елементов добавлено в массив и добавлены ли вообще,то:
        if (this.classes.length === 0) { //если(if) длина моего массива 0,то есть ни один елемент не был передан
            this.classes = 'menu__item'; //дефолтный класс для пустого массива ='menu__item',чтобы добавить классы;массив в строку
            element.classList.add(this.classes); //если небыли переданы ни одни классы,то я сформирую их самостоятельно
        } else { //если же у меня есть хотя бы один класс,то я буду:
            this.classes.forEach(className => element.classList.add(className));
        } //перебираем массив;className-каждый елем.этого массива;обращаемся к вновь созданному element('div') и дабавляем(classList) каждый(add) класс который есть в этом массиве (className)  
        
        element.innerHTML = ` 
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `; //взяли из верстки структуру карточки и обернули в div;после перебора this.classes.forEach мы этот div удалили
        this.parent.append(element);//помещаем новый елемент в конец елемента родителя
    }
}
//для замены карточки
// const div = new MenuCard();
// div.render();
//или
new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item'//теперь этот класс появится в верстке,без обертки div 
).render(); //сразу создаем новый обьект и на нем вызываем метод render;он отработает и исчезнет
//цифры это цена в usd для каждого предложения
/*еще создадим карточки 2.которых нехватает,а из верстки удалим эти 3 карточки
оставим контейнер,в который будут пушится эти елементы(цифра умноженная на курс доллара=цена)
*/
new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container'
    //хотя мы и не прописали в эту часть'menu__item' как ниже и выше--этот класс появится в верстке,
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container',
    'menu__item'
).render();
/*все 3 елемента(карточки) созданы на основе одного класса
Просто верстать карточки используя js не рационально, 
таким образом вас просто знакомят с классовой структурой и постепенно подводят к получению данных с сервера,
 ведь если каждая карточка будет храниться на сервере, 
 то намного эффективнее будет получить данные с него и как-то обработать в js 
 чем прописывать каждую карточку вручную при помощи верстки
 Поэтому,код универсален - каждый раз, когда пользователь заходит на сайт- сайт делает запрос на сервер, 
 получает массив данных про товары и ваш код рендерит актуальные!
*/

//Forms
/*Будет отправлять данные на сервер
Есть 2 способа отправки данных на сервер через форму в обычном формате  и в формате json-
это зависит от backend в каком формате он будет принимать данные.
Для json обязательно указывать заголовок request.setRequestHeader('Content-type', 'application/json')

У нас есть 2 формы на сайте,соответственно функционал по отправке должен будет повторяться,
чтобы 2 раза не прописывать одно и то же,мы 2 формы обернем в функцию,которую будем вызывать при отправке формы-function postData(form)
*/
const forms = document.querySelectorAll('form'); //получаем все формы по тегу 'form' которые есть на странице

const message = { //но мы не хотим просто выводить какой-то результат,мы хотим четко сказать что
    loading: "img/form/spinner.svg", //вместо текста "Загрузка" подставляем картинку
    success: "Спасибо! Скоро мы с вами свяжемся", //обработка позитивных сценариев и
    failure: "Что-то пошло не так..." //негативных сценариев 
};
forms.forEach(item => { //под каждую форму(перебирая каждую) подвязываем postData
    postData(item);
});
function postData(form) { //функция которая отвечает за постинг данных;принимает форму,аргумент
    form.addEventListener('submit', (e) => { //на форму навешиваем обработчик события 'submit'-срабатывает каждый раз когда мы пытаемся отправить какую-то форму
        e.preventDefault();//отменяем стандартное поведание страницы,тоесть перезагрезку;эта команда в ajax запросах должна идти в самом начале
        const statusMessage = document.createElement('img'); //нужно в network в консоле выбрать скорость интернета низкую(slow3G)
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        // form.append(statusMessage);//отправляем это сообщение на страницу(добавляем к форме)
        form.insertAdjacentElement('afterend', statusMessage);//мы переместили спинер в нижней форме под низ(был сбоку)

        // const request = new XMLHttpRequest();
        // request.open('POST', 'server.php'); //вызываем open-чтобы настроить запрос;server.php- путь на который ссылаемся
        /* request.setRequestHeader('Content-type', 'multipart/form-data');-заголовки тут не указываем,они выдают ошибку
         когда используем связку XMLHttpRequest()обьекта + FormData нам заголовок устанавливать не нужно,
         он устанавливается автоматически 
        */
       /*ДЛЯ ФОРМАТА JSON:
       php нативно не может принимать данные в формате json,нужно $_POST = json_decode(file_get_contents("php://input"), true);
       у нас есть обьект formData,который необходимо превратить в формат JSON,
       просто так мы это сделать не можем,для этого создаем новый обьект
       */
     
      
       
    //    request.setRequestHeader('Content-type', 'application/json');//обязательно заголовок
       const formData = new FormData(form);
       const object = {};
       formData.forEach(function(value, key){  //переберем каждый елемент и поместим в новый обьект  
            object[key] = value;
       });
    //    const json = JSON.stringify(object);
    //    request.send(json); //у нас уходит запрос
       
       /*ДЛЯ ОБЫЧНОЙ ОТПРАВКИ(НАДО ЗАКОМЕНТИРОВАТЬ ВСЕ ДЛЯ JSON И В 'СЕРВЕР PHP' УБРАТЬ СТРОКУ С $POST)
       чтобы все данные которые заполнил пользователь в форме мы получили в js и могли отправить на сервер-используем обьект formData
        обьект так же использует ключ-значение 
        new FormData- конструктор; (form)-та форма из которой нужно собрать данные
        надо всегда проверять name и прописывать его у форм иначе FormData не сможет найти этот input,
         неоткуда будет брать значение и формировать правильный обьект
        */
        // const formData = new FormData(form);//позволяет с опрееленной формы сформировать все данные которые заполнил пользователь
        // request.send(formData);//send-метод отправки данных;(formData)-тело
         //ПЕРЕПИШЕМ ФУНКЦИОНАЛ С ПРИМЕНЕНИЕМ  fetch а request закоментируем весь
      fetch('server.php', {
        method: "POST", 
        headers: { //если отправляем не json,то заголовок не надо прописывать и в server.php-закоментировать среднюю строку
          'Content-type': 'application/json' //что именно
        },
        body: JSON.stringify(object)
    }).then(data => {
        console.log(data); //успешная загрузка формы,тут сделаем обработку с помощью const message 
        showThanksModal(message.success);//вызываем функцию которую создаали ниже(когда сделали запрос и все успешно пришло,в message помещаем другое сообщение)
        statusMessage.remove();//удаляем блок(строку состояния запроса) со страницы
    }).catch(() => {
        showThanksModal(message.failure);//если произошел сбой или ошибка,другое сообщение 
    }).finally(() => {
        form.reset();//сделаем чтобы после успешной отправки,очистить форму 
    });
        
        // request.addEventListener('load', () => {//отслеживаем 'load'-конечную загрузку запроса
        //     if(request.status === 200) {
        //         console.log(request.response); //успешная загрузка формы,тут сделаем обработку с помощью const message 
        //         showThanksModal(message.success);//вызываем функцию которую создаали ниже(когда сделали запрос и все успешно пришло,в message помещаем другое сообщение)
        //         form.reset();//сделаем чтобы после успешной отправки,очистить форму
        //         statusMessage.remove();//удаляем блок(строку состояния запроса) со страницы
                
        //     } else {
        //         showThanksModal(message.failure);//если произошел сбой или ошибка,другое сообщение
        //     }
        // });
    });
}

//Доработапем модальное окно(спинер,смена текста при успешной отправке формы).Работаем с <div class="modal__dialog"> из верстки
function showThanksModal(message) { //функция показывает окно благодарности
    const prevModalDialog = document.querySelector('.modal__dialog'); //создаем переменную предыдущего просмотра и по класу получаем нужный елемент
/*ниже скрываем елемент до того как показалось модальное(не удаляем а скрываем,оно может понадобиться еще раз,
    если пользователь захочет отправить форму еще раз)
*/
    prevModalDialog.classList.add('hide'); //скрываем предыдущий контент
    openModal();//функция отвечающая за открытие модальных окон

    const thanksModal = document.createElement('div');
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove(); //через 4 сек удаляем блок
        prevModalDialog.classList.add('show'); //показ предыдущего контента
        prevModalDialog.classList.remove('hide'); //убираем класс 'hide'
        closeModal(); //закрываем модальное
    }, 4000);
}


// /*осуществляем fetch запрос(это проще чем с XMLHttpRequest)
// url задаем одной строкой(копировали на сайте https://jsonplaceholder.typicode.com/)
// все настройки которые нам нужны идут как обьект
// именно поэтому данная технология везде и используется
// функционал в этом проекте мы перепишем с использованием fetch
// */
// fetch('https://jsonplaceholder.typicode.com/posts', { //в скобках тот url на который будем посылать запрос(вернется именно промис)
//     method: "POST", //чтобы получать post или put запросы нужно прописать еще настройки метод и тело(как\каким методом и куда)
//     body: JSON.stringify({name: 'Alex'}),
//     headers: {  //заголовок
//         'Content-type': 'application/json'
//     }
// })
//     .then(response => response.json()) //получаем респонс-ответ в формате json и потом его трансформируем в обычный js обьект который дальше используем
//     .then(json => console.log(json));
});




/*чтобы при переключении табов,это было не резко,мы прописываем стили для классов:
в style.css в конце
.show {
    display: block;
}
.hide {
    display: none;
}
.fade {
    animation-name: fade;
    animation-duration: 1,5s;
}
@keyframes fade {
    from{opacity: 0.1;}
    to{opacity: 1;}
}
и теперь мы вместо ин-лайн стилей используем классы  'show', 'fade' .hide
*/

/*
//ВТОРОЙ ВАРИАНТ РЕШЕНИЯ С ТАБАМИ
const tabContent = document.querySelectorAll('.tabcontent'),
      tabMenu = document.querySelectorAll('.tabheader__item');
 
 
function hideElement(el) {
    el.style.display = 'none';
}
 
function showElement(el) {
    el.style.display = 'block';
}
 
function makeTabs(tabMenu, tabContent, activeClass) {
    tabMenu.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            tabMenu.forEach(el => {
                el.classList.remove(activeClass);
                tabMenu[idx].classList.add(activeClass);
            });
            tabContent.forEach(el => {
                hideElement(el);
                showElement(tabContent[idx]);
            });
        });
        if(!tab.classList.contains(activeClass)) {
            hideElement(tabContent[idx]);
        } else {
            showElement(tabContent[idx]);
        }
    });
}
 
makeTabs(tabMenu, tabContent, 'tabheader__item_active');
*/