'use strict';
document.addEventListener('DOMContentLoaded', function () {
      // экранная клавиатура
      //     получить элементы document.querySelector('.клас из HTML); получив положим(сохраним) в переменные let keyboardButton и keyboard 
      // 2 час 2 18
      // ////////////////////////////////
      {
            // получаем и сохраняем переменные клавиатуры
            const keyboardButton = document.querySelector('.search-form__keyboard');
            const keyboard = document.querySelector('.keyboard');
            const closeKeyboard = document.getElementById('close-keyboard');
            const searchInput = document.querySelector('.search-form__input');

            // 1-q способ вызова клавиатуры 
            // keyboardButton.addEventListener('click', () => {
            // if (keyboard.style.top) {
            // keyboard.style.top = '';
            // }
            // keyboard.style.top = '50%';
            // })
            //  2-й способ вызова клавиатуры тернарный оператор 
            const toogleKeyboard = () => {
                  keyboard.style.top = keyboard.style.top ? '' : '50%';
            };
            const changeLang = (btn, lang) => {
                  const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                        'en', ' '
                  ];
                  const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                        'ru', ' '
                  ];
                  if (lang === 'en') {
                        btn.forEach((elem, i) => {
                              elem.textContent = langEn[i];
                        })
                  } else {
                        btn.forEach((elem, i) => {
                              elem.textContent = langRu[i];
                        })
                  }
            }


            const typing = event => {
                  const target = event.target;
                  if (target.tagName.toLowerCase() === 'button') {
                        const buttons = [...keyboard.querySelectorAll('button')].filter(elem => elem.style.visibility !== 'hidden');
                        const contentButton = target.textContent.trim();
                        if (contentButton === '⬅') {
                              searchInput.value = searchInput.value.slice(0, -1);
                        } else if
                        // пробел
                        (!contentButton) {
                              searchInput.value += ' ';

                        }
                        // en
                        else if (contentButton === 'en' || contentButton === 'ru') {
                              changeLang(buttons, contentButton)

                        } else {
                              searchInput.value += contentButton;
                        }
                  }
                  //   keyboard-backspace 
                  // пробел 

            }
            keyboardButton.addEventListener('click', (toogleKeyboard));
            closeKeyboard.addEventListener('click', (toogleKeyboard));
            keyboard.addEventListener('click', typing);
      }
      // /////////////////////////////////
      // MENU /////
      {
            // ф-ии для меню 1час 49 мин
            const burger = document.querySelector('.spinner');
            const sidebarMenu = document.querySelector('.sidebarMenu');
            // тут писать функции для меню
            // вешаем события на burger клик и функцию при клике
            // className все переписывает
            // remove- удаляет
            // classList.add добовляет класс 
            // classList.toggle b добовляет и убирает в нашем случае класс 

            burger.addEventListener('click', () => {
                  // при клике на  бургер меняет бургер при помоши classList.toggle на крестик добавив класс 'activ'
                  burger.classList.toggle('activ');
                  // при клике меняет вид меню добавив класс'rollUp'

                  sidebarMenu.classList.toggle('rollUp');

            });
            sidebarMenu.addEventListener('click', e => {
                  let target = e.target;
                  // проверяет элементы по дереву вверх target.closest 'a[href="#"]' пока не найдет наш эл-т
                  // console.log target.closest'a[href="#"]';
                  target = target.closest('a[href="#"]');
                  if (target) {
                        const perentTarget = target.parentElement;
                        sidebarMenu.querySelectorAll('li').forEach(elem => {
                              if (elem === perentTarget) {
                                    elem.classList.add('active');
                              } else {
                                    elem.classList.remove('active');
                              }
                        })
                  }
            })
      }
      // Модальное окно.
      // при переносе файла в др проект забрать стили youtuber.css
      {

            // для плавных переходов анимаций изменений и тд  в стилях  пишем //* {
            //transition: all 0.3 s;
            //}
            // https://developers.google.com/youtube/v3/quickstart/js
            //  ключ AIzaSyCx6IhG5wPSEQbkAEAM1bQlSuzNkPycdtg
            // вставляем на страницу выводим на экран
            document.body.insertAdjacentHTML('beforeend', `
            <div class="youTuberModal">
                  <div id="youtuberClose">&#215;</div>
                  <div id="youtuberContainer"> </div> 
                  </div>
            `);
            /*<div class="youTuberModal">
            <div id="youtuberClose">&#215;</div>
            <div id="youtuberContainer"></div>
              </div> */
            // создаем в памяти элемент при помощи createElement
            // const divYoutuber = document.createElement('div');
            // получаем все элементы видео по дата селектору
            const youtuberItems = document.querySelectorAll('[data-youtuber]');
            const youTuberModal = document.querySelector('.youTuberModal');
            // console.log youTuberModal;
            const youtuberContainer = document.getElementById('youtuberContainer');
            // переенные для адаптива для сохранения ширины и высоты видео
            // ширина
            const qw = [3840, 2660, 1920, 1280, 854, 640, 426, 256];
            // высота
            const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];
            // создаем функцию для размера видео которое выводим видео
            const sizeVideo = () => {
                  // текущий размер экрана видемой части видео ширина ww высота wh
                  let ww = document.documentElement.clientWidth;
                  let wh = document.documentElement.clientHeight;
                  // цикл страничка откроет тот размер видео который позволит экран
                  // console.log ww ;
                  for (let i = 0; i < qw.length; i++) {
                        if (ww > qw[i]) {
                              // внутри youtuberContainer контейнера найдем айфрейм
                              youtuberContainer.querySelector('iframe').style.cssText = `
                              width: ${qw[i]}px;
                              height: ${qh[i]}px;`;

                              youtuberContainer.style.cssText = `
                              width: ${qw[i]}px;
                              height: ${qh[i]}px;
                              top: ${(wh - qh[i]) / 2}px;
                              left: ${(ww - qw[i]) / 2}px;
                              `;
                              break;
                        }
                  }

            }

            // добовляем свойство id
            // divYoutuber.id = 'youTuberModal';
            // вставляем на страницу в боди в конец
            // document.body.appendChild(divYoutuber);
            // 2й способ вставить на страницу
            // добовляем класс youTuberModal(есть в стилях)
            // divYoutuber.classList.add('youTuberModal');
            // перебираем элементы 
            // и по клику выбирается наш выбранный ютубер
            youtuberItems.forEach(elem => {
                  elem.addEventListener('click', () => {
                        const idVideo = elem.dataset.youtuber;
                        // console.log idVideo ;
                        // сщздае 2 див для ограничения видео
                        // const divYoutuberModal = document.createElement 'div';
                        youTuberModal.style.display = 'block';
                        // создаем айфрем и удаляем его
                        const youTuberFrame = document.createElement('iframe');
                        // прописываем атрибут свойство
                        youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                        // в youtuberContainer  припомощи метода insertAdjacentElement будем вставлять айфрейм youTuberFrame в конец 'beforeend'
                        youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);
                        // открыли модалку то навешиваем событие ресайз для изменения размера видео в зависимости от экрана
                        window.addEventListener('resize', sizeVideo);
                        sizeVideo();

                  });

            });


            // на youTuberModal навешиваем (события при клике закрыть)
            youTuberModal.addEventListener('click', () => {
                  youTuberModal.style.display = '';
                  // очищаем после закрытия айфрейм
                  youtuberContainer.textContent = '';
                  // по закрытии модального окна закрываем в видео событие ресайз resize при помощи removeEventListener
                  window.removeEventListener('resize', sizeVideo);

            });
      }
      // https://developer.mozilla.org/ru/ сервис хороший

      // youTube
      {
            const API_KEY = 'AIzaSyCx6IhG5wPSEQbkAEAM1bQlSuzNkPycdtg';
            // К идентификатору клиента и секрету всегда можно получить доступ из учетных данных в API и сервисах.
            // 413596894395 - tgpgmj4t5msld50pc3kl437n6t50l20n.apps.googleusercontent.com
            // EjCgEqY8VfBETkDIpIAm3EJr
            // https://console.developers.google.com/apis/credentials?project=my-project-utub
            const CLIENT_ID = '413596894395-tgpgmj4t5msld50pc3kl437n6t50l20n.apps.googleusercontent.com'

      }

      // youTube

});