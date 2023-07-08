from django.contrib import admin

from django.contrib import admin

from .models import User, Advantage, TextAbout, Problem, NtfMethod


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'is_staff', 'email', "phone", 'tg_id', 'is_employee', 'tg_login', 'date_joined')
    search_fields = ('username', 'tg_id', 'tg_login')
    list_filter = ('is_staff', 'is_employee', 'date_joined')
    list_editable = ('is_employee',)


admin.site.register(User, UserAdmin)


class AdvantagesAdmin(admin.ModelAdmin):
    list_display = ('id', 'img', 'adv')
    search_fields = ('id', 'img', 'adv')
    list_filter = ('id',)
    list_editable = ('adv',)


admin.site.register(Advantage, AdvantagesAdmin)


class TextAboutAdmin(admin.ModelAdmin):
    list_display = ('id', 'text')
    list_editable = ('text',)


admin.site.register(TextAbout, TextAboutAdmin)


class ProblemAdmin(admin.ModelAdmin):
    list_display = ('id', 'problem')
    list_editable = ('problem',)


admin.site.register(Problem, ProblemAdmin)


class NtfMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'icon', 'method')
    list_editable = ('method',)


admin.site.register(NtfMethod, NtfMethodAdmin)
