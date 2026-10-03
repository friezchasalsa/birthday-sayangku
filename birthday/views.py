from django.shortcuts import render


def index(request):
    """Render halaman ucapan ulang tahun."""
    return render(request, 'birthday/index.html')
