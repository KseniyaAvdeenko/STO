from decouple import config

import psycopg2


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
