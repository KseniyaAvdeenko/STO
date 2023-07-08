from decouple import config

import psycopg2


# TOKEN=6174280094:AAHNAoz1ZEeKOxCWLwaEWHZ2vP2-DiRbIto
# DB_NAME=AutoService
# DB_USER=postgres
# DB_PASSWORD=Az7735035
# DB_HOST=localhost
# DB_PORT=5432

class UserData:
    def show_user_data(self, tg_login):
        with psycopg2.connect(
                user=config("DB_USER"),
                password=config("DB_PASSWORD"),
                host=config('DB_HOST'),
                database=config('DB_NAME')) as conn:
            with conn.cursor() as cursor:
                sql = '''SELECT first_name, last_name, username, email, phone, tg_login, tg_id
                 FROM autoservice_user WHERE tg_login = %s'''
                data = (tg_login,)
                cursor.execute(sql, data)
                return cursor.fetchall()

    def update_tg_id(self, tg_login, tg_id):
        with psycopg2.connect(user=config("DB_USER"),
                              password=config("DB_PASSWORD"),
                              host=config('DB_HOST'),
                              database=config('DB_NAME')) as conn:
            with conn.cursor() as cursor:
                sql = '''UPDATE autoservice_user SET tg_id = %s WHERE tg_login = %s'''
                data = (str(tg_id), tg_login)
                cursor.execute(sql, data)
