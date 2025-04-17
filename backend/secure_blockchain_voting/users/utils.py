from django.core.mail import send_mail
from .models import VerificationToken

# def send_verification_email(user):
#     token = VerificationToken.objects.create(user=user)
#     link = f"http://localhost:4200/verify-email/{token.token}"
#     send_mail(
#         'Verify Your Email',
#         f'Click the link to verify your account: {link}',
#         'sebaila360@gmail.com',  # Sender
#         [user.email],           # Recipient
#         fail_silently=False,
#     )

def send_verification_email(user):
    token = VerificationToken.objects.create(user=user)
    send_mail(
        'Your Email Verification Code',
        f'Your verification code is: {token.code}',
        'sebaila360@gmail.com',
        [user.email],
        fail_silently=False,
    )

