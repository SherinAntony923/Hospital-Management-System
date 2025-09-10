from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.generics import UpdateAPIView
from .serializers import DoctorUpdateSerializer
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from .serializers import PatientProfileSerializer
from rest_framework.permissions import AllowAny
from django.db.models import Q
from django.db.models import Max
from collections import defaultdict


from .models import CustomUser, Department, DoctorProfile, Appointment,ChatMessage
from .serializers import (
    PatientRegisterSerializer, DoctorCreateSerializer,
    DoctorProfileSerializer, DoctorListSerializer,
    DepartmentSerializer, AppointmentSerializer,DoctorUpdateSerializer,ChatMessageSerializer
)

# Token with role info
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'   # ✅ Explicitly define

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['username'] = self.user.username
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Register a patient

class PatientRegisterView(APIView):
    permission_classes = [AllowAny]  # ✅ Make this endpoint public

    def post(self, request):
        serializer = PatientRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Patient registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Admin-only doctor creation
class DoctorProfileCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.user.role != 'admin':
            return Response({'error': 'Only admins can add doctors'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = DoctorCreateSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            return Response({'message': 'Doctor created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ViewSets for listing or managing data
class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.filter(role='doctor')
    serializer_class = DoctorListSerializer

class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    # permission_classes = [AllowAny]

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

from rest_framework.generics import UpdateAPIView
from .models import CustomUser
from .serializers import DoctorUpdateSerializer

class DoctorUpdateView(APIView):
    def put(self, request, pk):
        try:
            doctor_user = CustomUser.objects.get(id=pk, role='doctor')
            doctor_profile = DoctorProfile.objects.get(user=doctor_user)

            data = request.data

            doctor_user.username = data.get('username', doctor_user.username)
            doctor_user.email = data.get('email', doctor_user.email)
            doctor_user.save()

            doctor_profile.specialization = data.get('specialization', doctor_profile.specialization)

            # Handle department safely
            department_id = data.get('department')
            if department_id:
                try:
                    department_obj = Department.objects.get(id=department_id)
                    doctor_profile.department = department_obj
                except Department.DoesNotExist:
                    return Response({'error': 'Invalid department'}, status=400)

            doctor_profile.experience = data.get('experience', doctor_profile.experience)
            doctor_profile.save()

            return Response({'message': 'Doctor updated successfully'})

        except CustomUser.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=404)
        except DoctorProfile.DoesNotExist:
            return Response({'error': 'Doctor profile not found'}, status=404)


class DoctorDeleteView(APIView):
    def delete(self, request, pk):
        try:
            doctor = CustomUser.objects.get(pk=pk, role='doctor')
            doctor.delete()
            return Response({'message': 'Doctor deleted successfully'})
        except CustomUser.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=404)


class PatientListView(APIView):
    def get(self, request):
        patients = CustomUser.objects.filter(role='patient')
        serializer = UserSerializer(patients, many=True)
        return Response(serializer.data)

class ToggleUserStatusView(APIView):
    def post(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
            user.is_active = not user.is_active
            user.save()
            return Response({'status': 'success', 'is_active': user.is_active})
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        

class PatientProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'patient':
            return Response({'detail': 'Only patients can view this.'}, status=403)
        serializer = PatientProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        if request.user.role != 'patient':
            return Response({'detail': 'Only patients can update profile.'}, status=403)
        serializer = PatientProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request):
        if request.user.role != 'patient':
            return Response({'detail': 'Only patients can delete account.'}, status=403)
        request.user.delete()
        return Response({'detail': 'Account deleted successfully.'})


class DoctorListForPatientView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctors = CustomUser.objects.filter(role='doctor')
        serializer = DoctorListSerializer(doctors, many=True)
        return Response(serializer.data)


class ChatMessageView(generics.ListCreateAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        other_user_id = self.kwargs['user_id']

        return ChatMessage.objects.filter(
            sender_id__in=[user.id, other_user_id],
            receiver_id__in=[user.id, other_user_id]
        ).order_by('timestamp')

    def perform_create(self, serializer):
        receiver = CustomUser.objects.get(id=self.kwargs['user_id'])
        serializer.save(sender=self.request.user, receiver=receiver)

class DoctorInboxView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role != 'doctor':
            return Response({"detail": "Not authorized"}, status=403)

        # Get latest message from each patient who has chatted with this doctor
        latest_messages = (
            ChatMessage.objects
            .filter(receiver=user)  # messages sent TO this doctor
            .values('sender')
            .annotate(last_message_time=Max('timestamp'))
            .order_by('-last_message_time')
        )

        data = []
        for item in latest_messages:
            last_message = ChatMessage.objects.filter(
                sender_id=item['sender'],
                receiver=user
            ).order_by('-timestamp').first()
            if last_message:
                data.append(ChatMessageSerializer(last_message).data)

        return Response(data)
    
from .serializers import DoctorListSerializer

class DoctorListForPatientView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        departments = Department.objects.all()
        result = []

        for dept in departments:
            doctors = CustomUser.objects.filter(
                role='doctor',
                doctorprofile__department=dept
            )
            serializer = DoctorListSerializer(doctors, many=True)
            result.append({
                "department": dept.name,
                "doctors": serializer.data
            })

        return Response(result)    
    
class DoctorGroupedByDepartmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctors = CustomUser.objects.filter(role='doctor').select_related('doctorprofile__department')
        serializer = DoctorListSerializer(doctors, many=True)

        grouped = defaultdict(list)
        for doc in serializer.data:
            dept_name = doc.get('department') or 'Unknown'
            grouped[dept_name].append(doc)

        return Response(grouped)   


# Today
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AppointmentRequest, Notification
from .serializers import (
    AppointmentRequestSerializer,
    AppointmentRequestAdminSerializer,
    AppointmentRequestDoctorDecisionSerializer,
    NotificationSerializer
)

# Permissions per role
class IsPatient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'patient'

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'doctor'


# 1. Patient sends appointment request
class AppointmentRequestCreateView(generics.CreateAPIView):
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsPatient]

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)


# 2. Admin schedules and assigns appointment to doctor
class AppointmentRequestScheduleView(generics.UpdateAPIView):
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestAdminSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]


# 3. Doctor accepts or declines appointment
class AppointmentRequestDecisionView(generics.UpdateAPIView):
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestDoctorDecisionSerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]


# 4. Patient views their appointment requests
class PatientAppointmentRequestsView(generics.ListAPIView):
    serializer_class = AppointmentRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsPatient]

    def get_queryset(self):
        return AppointmentRequest.objects.filter(patient=self.request.user)


# 5. Notifications list for logged-in user
class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')


# 6. Admin views all appointment requests with optional status filter
class AdminAppointmentRequestListView(generics.ListAPIView):
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get_queryset(self):
        qs = super().get_queryset()
        status_param = self.request.query_params.get('status')
        if status_param:
            qs = qs.filter(status=status_param)
        return qs


# 7. Doctor views assigned pending appointments
class DoctorAssignedAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return AppointmentRequest.objects.filter(doctor=self.request.user, status='pending')


# 8. Doctor responds to an assigned appointment request (accept or decline)
class DoctorRespondAppointmentView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def post(self, request, pk):
        try:
            appointment = AppointmentRequest.objects.get(pk=pk, doctor=request.user)
        except AppointmentRequest.DoesNotExist:
            return Response({'detail': 'Not found or unauthorized.'}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get('action')
        decline_reason = request.data.get('decline_reason', '')

        if action == 'accept':
            appointment.status = 'accepted'
            appointment.decline_reason = ''
        elif action == 'decline':
            appointment.status = 'declined'
            appointment.decline_reason = decline_reason
        else:
            return Response({'detail': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

        appointment.save()

        # Notify patient
        if appointment.status == 'accepted':
            message = f"Your appointment with Dr. {appointment.doctor.username} has been accepted."
        else:
            message = f"Your appointment with Dr. {appointment.doctor.username} was declined. Reason: {appointment.decline_reason}"

        Notification.objects.create(
            recipient=appointment.patient,
            message=message
        )

        return Response({'detail': f'Appointment {appointment.status}.'}, status=status.HTTP_200_OK)

# 9. Admin can delete an appointment request
class AppointmentRequestDeleteView(generics.DestroyAPIView):
    queryset = AppointmentRequest.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

# 10. Doctor views their scheduled (accepted) appointments
class DoctorScheduledAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return AppointmentRequest.objects.filter(
            doctor=self.request.user,
            status='accepted'
        ).order_by('date', 'time')

# today
from .models import Medicine, LaboratoryItem
from .serializers import MedicineSerializer, LaboratoryItemSerializer


class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all().order_by("-created_at")
    serializer_class = MedicineSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})  # ✅ Ensure request is passed
        return context


class LaboratoryItemViewSet(viewsets.ModelViewSet):
    queryset = LaboratoryItem.objects.all().order_by("-created_at")
    serializer_class = LaboratoryItemSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})  # ✅ Ensure request is passed
        return context

from .models import Order
from .serializers import OrderSerializer

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


class CreatePaymentIntentView(APIView):
    permission_classes = []  # Allow anyone

    def post(self, request, *args, **kwargs):
        items = request.data.get("items", [])
        print("Received items:", items)

        if not items or not isinstance(items, list):
            return Response({"error": "No valid items provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate total for demo purposes (optional)
        total = sum(int(item.get("price", 0)) * int(item.get("quantity", 1)) for item in items)
        print("Demo total amount:", total)

        # Instead of Stripe, return a fake client_secret
        return Response({"client_secret": "demo_client_secret"}, status=status.HTTP_200_OK)


# Today
from rest_framework import generics, permissions
from .models import Prescription
from .serializers import PrescriptionCreateSerializer, PrescriptionSerializer

class DoctorPrescriptionCreateView(generics.CreateAPIView):
    serializer_class = PrescriptionCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)

class PatientPrescriptionsListView(generics.ListAPIView):
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Prescription.objects.filter(patient=self.request.user)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import CustomUser
from .serializers import PatientProfileSerializer

class PatientDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            patient = CustomUser.objects.get(pk=pk, role='patient')
            serializer = PatientProfileSerializer(patient)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=404)
