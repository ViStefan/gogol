# gogol
Proof-of-concept литературного чата, оформленного как книга.
Посмотреть можно [здесь](http://poketest.zz.mu/gogol) ([http://poketest.zz.mu/gogol](http://poketest.zz.mu/gogol)).

# Фичи
По возможности преобразует любое сообщение в приемлемый для книги вид. Заменяет дефисы, кавычки и почти любые другие сочетания знаков препинания на допустимые в типографии и близкие по смыслу. На основе знаков препинания, таких как `?`, `!`, `!!!`, `...`, подбирает случайные глаголы и оформляет реплику. Скобки распознаются как смайлики, в реплике опускаются, но могут влиять на выбор глагола. Например, текст от пользователя с ником Николай:

> *привееееет всем!)) очень рад всех видеть..... )))*
  
будет преобразован во что-то похожее на

> *— Приве-ет всем! — радостно воскликнул Николай. — Очень рад всех видеть...*

# TODO

POC очень сырой, нужно прикрутить базу данных, добавить токены для юзеров, сделать JSON API между клиентом и сервером, формализовать правила преобразования текста, добавить больше глаголов и неубиваемую типографику.

Добавить несколько фич:
* Распознавать ссылки в тексте и оформлять их как сноски в книге
* Ссылки на изображения вставлять как иллюстрации в книге
* Системные сообщения о том, что кто-то вошёл или вышел из чата, кто сейчас в чат-комнате etc. оформить как текст от автора
* Несколько сообщений подряд от одного пользователя схлопывать в одну реплику
* Добавить типы реплик, кроме настроений, вопросов и восклицаний, например: согласие или отказ для реплик, начинающихся с "да" или "нет". Таким репликам дать свои правила для глаголов
* Сделать возможность создавать чат-комнаты, причем создатель комнаты пишет в ней текст от автора. Можно использовать для проведения онлайн-квестов или совместной игры в D&D, текстовые RPG; везде, где есть литературная тема и требуется подобная эстетика.