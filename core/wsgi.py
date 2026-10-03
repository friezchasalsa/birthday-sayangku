"""
WSGI config for project "core".

File ini juga dipakai sebagai entrypoint serverless function untuk Vercel
(@vercel/python mencari variabel bernama `app`).
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()

# Vercel's @vercel/python builder expects a variable named `app`
app = application
