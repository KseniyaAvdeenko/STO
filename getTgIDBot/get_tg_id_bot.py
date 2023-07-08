import telebot
from decouple import config
from telebot.types import ReplyKeyboardMarkup, KeyboardButton

from getTgIDBot import db_client

bot = telebot.TeleBot(config("TOKEN"))


@bot.message_handler(commands=['start'])
def start(message):
    db_client.UserData().update_tg_id(message.from_user.username, message.chat.id)
    selected_data = db_client.UserData().show_user_data(message.from_user.username)
    msg = f""" Привет {message.from_user.full_name}\n
    Ваши данные в Autoservice:\n
    Username: {selected_data[0][2]}\n
    Email: {selected_data[0][3]}\n
    Телефон: {selected_data[0][4]}\n
    ТГ-логин: {selected_data[0][5]}\n
    ТГ-ID: {selected_data[0][6]}\n
    ТГ-ID: {selected_data[0][6]}\n
    Вернуться на сайт http://127.0.0.1:3000/admin-site/\n
    Перейдите по ссылке https://t.me/+t7goo_d_angxZjli"""
    bot.send_message(message.chat.id, msg)


if __name__ == '__main__':
    bot.polling(non_stop=True, interval=0)
