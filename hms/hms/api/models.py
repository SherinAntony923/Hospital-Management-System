# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('patient', 'Patient'),
    )

    # Override username to allow spaces
    username = models.CharField(
        max_length=150,
        unique=False,  # username doesn't have to be unique since login uses email
        help_text="150 characters or fewer. Letters, digits, spaces and @/./+/-/_ allowed.",
        validators=[],  # remove Django's default strict validator
        blank=True,
        null=True
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='patient')
    phone = models.CharField(max_length=15, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Still required for user creation

    def __str__(self):
        return f"{self.username or ''} ({self.role})"

class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class DoctorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    experience = models.PositiveIntegerField(help_text="Years of experience")

    def __str__(self):
        return f"Dr. {self.user.get_full_name()}"

class Appointment(models.Model):
    patient = models.ForeignKey(CustomUser, related_name='patient_appointments', on_delete=models.CASCADE)
    doctor = models.ForeignKey(CustomUser, related_name='doctor_appointments', on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField()

    def __str__(self):
        return f"{self.patient.username} - {self.doctor.username} on {self.date}"
    
class ChatMessage(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="received_messages")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.sender.username} to {self.receiver.username} at {self.timestamp}"



class AppointmentRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    )

    patient = models.ForeignKey(CustomUser, related_name='appointment_requests', on_delete=models.CASCADE)
    doctor = models.ForeignKey(CustomUser, related_name='appointment_requests_received', on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    decline_reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request from {self.patient} to {self.doctor} on {self.date} {self.time}"


class Notification(models.Model):
    recipient = models.ForeignKey(CustomUser, related_name='notifications', on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.recipient.email}: {self.message[:20]}"



class Medicine(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)  # for uses
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="medicines/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class LaboratoryItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)  # for uses
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="laboratory/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="pending")  # pending, completed

    def __str__(self):
        return f"Order #{self.id} - {self.user.email}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    item_type = models.CharField(max_length=50, choices=(("medicine","Medicine"), ("laboratory","Laboratory")))

    def __str__(self):
        return f"{self.name} x{self.quantity}"


class Prescription(models.Model):
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="prescriptions_given")
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="prescriptions_received")
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.medicine.name} for {self.patient.email} by {self.doctor.email}"