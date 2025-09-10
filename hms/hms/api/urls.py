from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import DoctorUpdateView, DoctorDeleteView
from .views import PatientListView, ToggleUserStatusView

from .views import (
    PatientRegisterView,
    MyTokenObtainPairView,
    DoctorViewSet,
    DepartmentViewSet,
    DoctorProfileViewSet,
    AppointmentViewSet,
    DoctorProfileCreateView,
    PatientProfileView,
    DoctorListForPatientView,
    ChatMessageView,
    DoctorInboxView,
    DoctorGroupedByDepartmentView,

    AppointmentRequestCreateView,
    AppointmentRequestScheduleView,
    AppointmentRequestDecisionView,
    PatientAppointmentRequestsView,
    NotificationListView,
    AdminAppointmentRequestListView,
    DoctorAssignedAppointmentsView,
    DoctorRespondAppointmentView,
    AppointmentRequestDeleteView,
    DoctorScheduledAppointmentsView,
    MedicineViewSet,
    LaboratoryItemViewSet,
    OrderCreateView,
     OrderListView,
     CreatePaymentIntentView,
     DoctorPrescriptionCreateView,
     PatientPrescriptionsListView,
      PatientDetailView,
)

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet, basename='doctor')
router.register(r'doctor-profiles', DoctorProfileViewSet, basename='doctor-profile')
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'medicines', MedicineViewSet, basename='medicine')
router.register(r'laboratory-items', LaboratoryItemViewSet, basename='laboratory-item')


urlpatterns = [
    path('register/', PatientRegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   
    path('', include(router.urls)),
    path('doctors/<int:pk>/delete/', DoctorDeleteView.as_view()),
    path('doctors/<int:pk>/update/', DoctorUpdateView.as_view()),
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('patients/<int:pk>/toggle/', ToggleUserStatusView.as_view(), name='toggle-user-status'),
    path('patient/profile/', PatientProfileView.as_view(), name='patient-profile'),
    path('patient/doctors/', DoctorListForPatientView.as_view(), name='patient-doctor-list'),
    path('chat/<int:user_id>/', ChatMessageView.as_view(), name='chat'),
    path('doctor/inbox/', DoctorInboxView.as_view(), name='doctor-inbox'),
    path('patient/doctors/', DoctorListForPatientView.as_view(), name='patient-doctors'),
    path('create-doctor/', DoctorProfileCreateView.as_view(), name='create-doctor'),
    path('doctors/grouped/', DoctorGroupedByDepartmentView.as_view(), name='doctors-grouped'),

    path('appointment-requests/create/', AppointmentRequestCreateView.as_view(), name='appointment-request-create'),
    path('appointment-requests/<int:pk>/schedule/', AppointmentRequestScheduleView.as_view(), name='appointment-request-schedule'),
    path('appointment-requests/<int:pk>/decision/', AppointmentRequestDecisionView.as_view(), name='appointment-request-decision'),
    path('patient/appointment-requests/', PatientAppointmentRequestsView.as_view(), name='patient-appointment-requests'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path('appointment-requests/', AdminAppointmentRequestListView.as_view(), name='appointment-request-list'),
    path('doctor/appointments/', DoctorAssignedAppointmentsView.as_view(), name='doctor-assigned-appointments'),
    path('doctor/appointments/<int:pk>/respond/', DoctorRespondAppointmentView.as_view(), name='doctor-respond-appointment'),
    path('appointment-requests/<int:pk>/delete/', AppointmentRequestDeleteView.as_view(), name='appointment-request-delete'),
    path('doctor/scheduled-appointments/', DoctorScheduledAppointmentsView.as_view(), name='doctor-scheduled-appointments'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path("create-payment-intent/", CreatePaymentIntentView.as_view(), name="create-payment-intent"),
    path("doctor/prescriptions/", DoctorPrescriptionCreateView.as_view(), name="doctor-prescribe"),
    path("patient/prescriptions/", PatientPrescriptionsListView.as_view(), name="patient-prescriptions"),
    path('patients/<int:pk>/', PatientDetailView.as_view(), name='patient-detail'),

]



