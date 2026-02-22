web: sh -c "cd server && gunicorn app:app --timeout 180 --workers 1 --threads 2 --preload -b 0.0.0.0:${PORT:-8080}"
