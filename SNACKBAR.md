<!-- prettier-ignore-start -->
0. Создать HTML разметку
    <form class="form" data-form>
        <label>
            Delay (ms)
            <input type="number" name="delay" required />
        </label>

        <fieldset>
            <legend>State</legend>
            <label>
            <input type="radio" name="state" value="fulfilled" required />
            Fulfilled
            </label>
            <label>
            <input type="radio" name="state" value="rejected" required />
            Rejected
            </label>
        </fieldset>
        <button type="submit">Create notification</button>
    </form>
1. Логика работы
    0.1 Создать <class PromiseFactory>
        0.1.0 Конструктор принимает обьект параметров { iziToastSettings: {}, }
    ✅1.1 Создать обьект <refs>
        1.1.1 Создать утилитную функцию <getRef> которая принимает <generic HTMLElement> параметр <css selector> и возвращает ссылку на элемент если нашел, и выкидывет ощибку если не нашел
        1.1.2 Для каждого ключа в <refs> обернуть значение в <getRef>
            (optional) Получение ref от <rootSelector>
            (optional) Добавить возможность создания разметки при предоставлении rootSelector;
    1.2 Создать обработчик <submit> на <form>
        1.2.0 preventDefault()
        1.2.1 Валидировать минимально значение input, должно быть значение которое можно привести к number
        1.2.2 Обьект formData после клика на submit храниться внутри класса для доступа
        1.2.3 Вызвать функцию <makePromise> и передать <formData>
        1.2.4 <makePromise> возвращает promise, его нужно обработать в .then. Вызывать <iziToast> соответсвенно от результата промиса
    1.3 Создать функцию <makePromise>
        1.3.1 Принимает параметр <formData>
        1.3.2 Создает промис с задержкой <delay> и результатом <status>
    1.4 <iziToast>
        1.4.1 npm i iziToast, import 'izitoast/dist/css/iziToast.min.css';, import iziToast from 'izitoast';
    


<!-- prettier-ignore-end -->
