from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Department, DoctorProfile, Appointment, Medicine,LaboratoryItem

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role', 'is_staff', 'is_active')}
        ),
    )
    
    search_fields = ('username', 'email', 'role')
    ordering = ('username',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Department)
admin.site.register(DoctorProfile)
admin.site.register(Appointment)

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "created_at")
    search_fields = ("name",)


@admin.register(LaboratoryItem)
class LaboratoryItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "created_at")
    search_fields = ("name",)