import telebot
from decouple import config

bot = telebot.TeleBot(config("TOKEN"))


# t.me/AutoServiceSTOBot
def send_app_tg(msg):
    bot.send_message(config("GROUP_ID"), msg, parse_mode="html")