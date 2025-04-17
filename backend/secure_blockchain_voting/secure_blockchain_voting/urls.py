from users.views import register_user, verify_email_code
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', register_user),
    path('verify-code/', verify_email_code),

]
