from django.shortcuts import render
from .models import CustomUser, VerificationToken
from .utils import send_verification_email
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = CustomUser.objects.create_user(
            email=data['email'],
            full_name=data['full_name'],
            reg_number=data['reg_number'],
            course=data['course'],
            password=data['password']
        )
        user.is_active = False  # user must verify first
        user.save()
        send_verification_email(user)
        return Response({'message': 'User registered. Please check your email to verify.'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
def verify_email_code(request):
    code = request.data.get('code')
    email = request.data.get('email')

    try:
        user = CustomUser.objects.get(email=email)
        token = VerificationToken.objects.filter(user=user, code=code, is_used=False).latest('created_at')
        if token.is_valid():
            user.is_active = True
            user.save()
            token.is_used = True
            token.save()
            return Response({'message': 'Email verified successfully.'})
        else:
            return Response({'error': 'Code expired or already used.'}, status=400)
    except (CustomUser.DoesNotExist, VerificationToken.DoesNotExist):
        return Response({'error': 'Invalid code or user.'}, status=404)

@api_view(['POST'])
def verify_code(request):
    email = request.data.get('email')
    code = request.data.get('code')

    try:
        user = CustomUser.objects.get(email=email)
        token = VerificationToken.objects.filter(user=user, code=code, is_used=False).last()

        if token and token.is_valid():
            token.is_used = True
            token.save()

            user.is_active = True
            user.save()

            return Response({'message': 'Email verified successfully.'})
        else:
            return Response({'error': 'Invalid or expired code.'}, status=400)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)

# @api_view(['GET'])
# def verify_email(request, token):
#     try:
#         token_obj = VerificationToken.objects.get(token=token)
#         if token_obj.is_valid():
#             user = token_obj.user
#             user.is_active = True
#             user.save()
#             token_obj.is_used = True
#             token_obj.save()
#             return Response({'message': 'Email verified successfully.'})
#         return Response({'error': 'Token expired or already used.'}, status=400)
#     except VerificationToken.DoesNotExist:
#         return Response({'error': 'Invalid token.'}, status=404)

