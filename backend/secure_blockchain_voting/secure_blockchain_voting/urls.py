# from users.views import register_user, resend_code, verify_email_code
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('register/', register_user),
#     path('verify-code/', verify_email_code),
#     path('resend-code/', resend_code),

# ]

from django.contrib import admin
from django.urls import path
from users.views import (
    register_user,
    verify_code,
    login_request,
    resend_code,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/register/', register_user),
    path('auth/verify/', verify_code),         # 👈 Unified endpoint
    path('auth/login/', login_request),
    path('auth/resend-code/', resend_code),
]

