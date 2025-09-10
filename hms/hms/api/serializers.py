from rest_framework import serializers
from .models import CustomUser, Department, DoctorProfile, Appointment,ChatMessage
from django.contrib.auth.hashers import make_password

class PatientRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'phone')  # Include phone
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['role'] = 'patient'
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = '__all__'

class DoctorListSerializer(serializers.ModelSerializer):
    specialization = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    experience = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'specialization', 'department', 'experience']

    def get_specialization(self, obj):
        try:
            return obj.doctorprofile.specialization
        except DoctorProfile.DoesNotExist:
            return 'N/A'

    def get_department(self, obj):
        try:
            return obj.doctorprofile.department.name
        except DoctorProfile.DoesNotExist:
            return 'N/A'

    def get_experience(self, obj):
        try:
            return obj.doctorprofile.experience
        except DoctorProfile.DoesNotExist:
            return 0

class DoctorCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    specialization = serializers.CharField()
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    experience = serializers.IntegerField()

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='doctor'
        )
        DoctorProfile.objects.create(
            user=user,
            specialization=validated_data['specialization'],
            department=validated_data['department'],
            experience=validated_data['experience']
        )
        return user

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class DoctorUpdateSerializer(serializers.ModelSerializer):
    specialization = serializers.CharField(source='doctorprofile.specialization')
    department = serializers.PrimaryKeyRelatedField(source='doctorprofile.department', queryset=Department.objects.all())
    experience = serializers.IntegerField(source='doctorprofile.experience')

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'specialization', 'department', 'experience']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('doctorprofile', {})

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile = instance.doctorprofile
        profile.specialization = profile_data.get('specialization', profile.specialization)
        profile.department = profile_data.get('department', profile.department)
        profile.experience = profile_data.get('experience', profile.experience)
        profile.save()

        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'is_active', 'date_joined']


class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone']
        read_only_fields = ['id']


from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    receiver_name = serializers.CharField(source='receiver.username', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'sender_name', 'receiver', 'receiver_name', 'message', 'timestamp']
        read_only_fields = ['sender', 'receiver']

    def create(self, validated_data):
        validated_data['sender'] = self.context['request'].user
        return super().create(validated_data)
    
    
class DoctorListSerializer(serializers.ModelSerializer):
    specialization = serializers.CharField(source='doctorprofile.specialization', read_only=True)
    department = serializers.CharField(source='doctorprofile.department.name', read_only=True)
    department_id = serializers.IntegerField(source='doctorprofile.department.id', read_only=True)  # Add this
    experience = serializers.IntegerField(source='doctorprofile.experience', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'specialization', 'department', 'department_id', 'experience']

from .models import AppointmentRequest, Notification

class AppointmentRequestSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.username', read_only=True)
    doctor_name = serializers.CharField(source='doctor.username', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = AppointmentRequest
        fields = [
            'id', 'patient', 'patient_name', 'doctor', 'doctor_name', 'department', 'department_name',
            'date', 'time', 'reason', 'status', 'decline_reason', 'created_at'
        ]
        read_only_fields = ['status', 'decline_reason', 'created_at', 'patient']

    def create(self, validated_data):
        # patient is passed by view via serializer.save(patient=...)
        # So do NOT include patient here again.
        appointment_request = AppointmentRequest.objects.create(**validated_data)

        # Notify admin about new request
        Notification.objects.create(
            recipient=CustomUser.objects.filter(role='admin').first(),
            message=f"New appointment request from {appointment_request.patient.username} for {appointment_request.doctor.username}"
        )
        return appointment_request
    
class AppointmentRequestAdminSerializer(serializers.ModelSerializer):
    """Used by admin to schedule appointment."""
    class Meta:
        model = AppointmentRequest
        fields = ['date', 'time', 'status']

    def update(self, instance, validated_data):
        instance.date = validated_data.get('date', instance.date)
        instance.time = validated_data.get('time', instance.time)
        instance.status = 'pending'
        instance.save()

        # Notify doctor
        Notification.objects.create(
            recipient=instance.doctor,
            message=f"You have been assigned an appointment request from {instance.patient.username}"
        )
        return instance


class AppointmentRequestDoctorDecisionSerializer(serializers.ModelSerializer):
    """Used by doctor to accept or decline appointment."""
    class Meta:
        model = AppointmentRequest
        fields = ['status', 'decline_reason']

    def update(self, instance, validated_data):
        instance.status = validated_data['status']
        instance.decline_reason = validated_data.get('decline_reason', '')
        instance.save()

        # Notify patient
        if instance.status == 'accepted':
            message = f"Your appointment with Dr. {instance.doctor.username} has been accepted."
        else:
            message = f"Your appointment with Dr. {instance.doctor.username} was declined. Reason: {instance.decline_reason}"

        Notification.objects.create(
            recipient=instance.patient,
            message=message
        )
        return instance


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'is_read', 'created_at']

from rest_framework import serializers
from .models import Medicine, LaboratoryItem

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'

class LaboratoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaboratoryItem
        fields = '__all__'

from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        total = 0
        for item in items_data:
            order_item = OrderItem.objects.create(order=order, **item)
            total += order_item.price * order_item.quantity
        order.total = total
        order.save()
        return order

# today
from rest_framework import serializers
from .models import Prescription

# Serializer for creating prescriptions (write)
class PrescriptionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['patient', 'medicine', 'quantity', 'notes']

# Serializer for reading prescriptions (read)
class PrescriptionSerializer(serializers.ModelSerializer):
    medicine_name = serializers.CharField(source="medicine.name", read_only=True)
    doctor_name = serializers.CharField(source="doctor.email", read_only=True)
    patient_name = serializers.CharField(source="patient.email", read_only=True)

    class Meta:
        model = Prescription
        fields = '__all__'
