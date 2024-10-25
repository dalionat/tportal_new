from django.urls import path
from django.conf.urls.static import static

from project_mgmt import views
from django.conf import settings

urlpatterns = [
    path('project_mgmt/projects', views.projectApi),
    path('project_mgmt/base/statuses', views.projectStatusApi),
    path('project_mgmt/base/types', views.projectTypesApi),
    path('project_mgmt/base/managers', views.managerApi),
] 


# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
