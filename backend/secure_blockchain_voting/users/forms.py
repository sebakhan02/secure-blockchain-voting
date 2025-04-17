from django import forms
from .models import CustomUser
import re

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ['full_name', 'email', 'reg_number', 'course', 'password']

    def clean_reg_number(self):
        reg = self.cleaned_data.get('reg_number')
        pattern = r'^[a-zA-Z]{4}-\d{2}-\d{4}-\d{4}$'
        if not re.match(pattern, reg):
            raise forms.ValidationError('Invalid registration number format.')
        return reg

    def clean(self):
        cleaned_data = super().clean()
        pwd = cleaned_data.get("password")
        confirm = cleaned_data.get("confirm_password")

        if pwd and confirm and pwd != confirm:
            raise forms.ValidationError("Passwords do not match.")
