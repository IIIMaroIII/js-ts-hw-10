<!-- prettier-ignore-start -->
1. Создать HTML разметку для Таймера
   1.1 <div class="timer-container">
			<input type="text" name="cal" data-cal />
			<button type="button" class="start-btn" disabled data-startBtn>Start</button>
			<div class="info" data-info="">
				<div class="field">
					<span class="value" data-days>00</span>
					<span class="label">Days</span>
				</div>
				<div class="field">
					<span class="value" data-hours>00</span>
					<span class="label">Hours</span>
				</div>
				<div class="field">
					<span class="value" data-minutes>00</span>
					<span class="label">Minutes</span>
				</div>
				<div class="field">
					<span class="value" data-seconds>00</span>
					<span class="label">Seconds</span>
				</div>
			</div>
		</div>
2. Логика работы
   2.1 При инициализации JS файла кнопка Start изначально не активна
   2.2 Импротировать библиотеку flatpickr и дополнительно импортировать файлы стилей <import 'flatpickr/dist/flatpickr.min.css'>
   2.3 Создание переменных и свойств
      ✅2.3.1 Создать обьект refs для доступа к HTML элементам
         ✅2.3.1.1 Создать <getRef> для безопастного доступа к элементу и обеспечение NON-NULL
         function getRef<T extends HTMLElement>(selector: string): T {получить доступ к элементу, проверить если null выкинуть ошибку, если нет вернуть элемент}
         🐷2.3.1.2 Использовать try/catch при обьявлении const refs
      ✅2.3.2 Сделать instance flatpickr и создать обьект options
      ✅2.3.3 Обьявить глобальные переменные <timerID>, <timeDiff> - разница между выбранным временем и текущим в миллисекундах
      2.3.4 Создать <handleSelectedDates> и передать как callback в метод <onClose> опций flatpickr
         2.3.4.0 Сделать кнопку <Start> не активной
         2.3.4.1 Принимает аргументом дату, конвертирует в ms
         2.3.4.2 Высчитывает разницу относительно текущей даты
         2.3.4.3 Записывает в глобальную переменную <timeDiff>
         2.3.4.4 Проверяет если <timeDiff> положительное число, то делает кнопку <Start> активной, если нет <Start> продолжает оставаться не активной и выкидывается alert => можно вынести в отдельную функцию   
      2.3.5 Создать <start()>
         2.3.5.1 Создает <setInterval> каждую секунду, и записывает id в <timerId>
         2.3.5.2 Делает не активными <input> <Start> после запуска таймера
      2.3.6 Создать <stop()>
         2.3.6.1 Делает <clearInterval> и снова возвращает в активное состояние <input> и <Start>
      2.3.7 Обработчик на кнопку start <onStartBtnClick>
         2.3.7.1 Запускает метод <start()> и 
      2.3.8 Функция <convertMS>
      2.3.9 Функция обновления интерфейса для span <updateUI>
       

<!-- prettier-ignore-end -->
