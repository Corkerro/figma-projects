# **Проверка света дома**
headers
## **Навигация**
  * [Регистрация](#registration)
  * [Подготовка телеграма](#podgotovka-telegram)


## <a name="registration"></a> **Регистрация**
Вам необходимо зарегистрироваться на:
 - [Heroku](https://dashboard.heroku.com)
 - [PythonAnyWhere](https://www.pythonanywhere.com/)

## <a name="podgotovka-telegram"></a>**Подготовка телеграма**
### **Создание бота и получение его токена**
1. Заходим в телеграм и ищем **[@BotFather](https://t.me/BotFather)**<br>![BotFather](https://imgur.com/fQvoRo2.png)
2. Пишем команду ***```/start```***<br>![/start](https://imgur.com/5le8OEM.png)
3. Выбираем команду ***```/newbot```***<br>![/newbot](https://imgur.com/Ghr15C9.png)
4. Пишем **Имя** бота(любое имя, так будет подписан сам бот) затем его **username_bot**(например: test_bot)<br>![name and username_bot](https://imgur.com/RRJhhYe.png)
5. Нужно сохранить этот токен<br>![BotFather](https://imgur.com/ipsRgAP.png)<br>
   В моем случае токен такой:
   ```
   5895410925:AAEQQUCagvTmFLkCe_SSikN8QveoqjpCnn8
   ```

### **Добовляем бота в группу**
   1. Создаем группу телеграм и добавляем в нее тех, кому должно приходить уведомление
   2. Добавляем в нее бота по его **username_bot**, в моем случае это Your_name_with_bot_<br>![add bot](https://imgur.com/FCl1d22.png)
