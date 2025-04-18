from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator, MinLengthValidator, MaxLengthValidator
from django.db import models
from django.core.exceptions import ValidationError
import re
import random
from django.utils import timezone
from datetime import timedelta
from django.conf import settings

# Regex for reg number like BCSE-01-0054-2022 (allow lowercase too)
reg_number_validator = RegexValidator(
    regex=r'^[a-zA-Z]{4}-\d{2}-\d{4}-\d{4}$',
    message='Registration number must be in the format BCSE-01-0054-2022 (case insensitive).'
)

# Password validator (uppercase, lowercase, digit, min 8 chars)
def validate_password_strength(password):
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long.")
    if not re.search(r'[A-Z]', password):
        raise ValidationError("Password must contain at least one uppercase letter.")
    if not re.search(r'[a-z]', password):
        raise ValidationError("Password must contain at least one lowercase letter.")
    if not re.search(r'\d', password):
        raise ValidationError("Password must contain at least one number.")

class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, reg_number, course, password=None):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)

        # Apply password strength check
        if password:
            validate_password_strength(password)

        user = self.model(
            email=email,
            full_name=full_name,
            reg_number=reg_number,
            course=course
        )
        user.set_password(password)
        user.full_clean()  
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2, message="Full name must be at least 2 characters.")]
    )
    email = models.EmailField(unique=True)
    reg_number = models.CharField(
        max_length=20,
        unique=True,
        validators=[reg_number_validator]
    )
    course = models.CharField(
        max_length=7,
        validators=[MaxLengthValidator(50, message="Course name is too long.")]
    )
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'reg_number', 'course']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


def expiry_5_minutes_from_now():
    return timezone.now() + timedelta(minutes=5)


class VerificationToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=expiry_5_minutes_from_now)
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        return timezone.now() < self.expires_at and not self.is_used

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = str(random.randint(100000, 999999))
        super().save(*args, **kwargs)
