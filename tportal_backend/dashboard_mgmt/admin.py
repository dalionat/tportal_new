from django.contrib import admin

# Register your models here.
from .models import SubSystem, Role, Module, UserProfile

admin.site.register(SubSystem)
admin.site.register(Role)
admin.site.register(UserProfile)
admin.site.register(Module)


