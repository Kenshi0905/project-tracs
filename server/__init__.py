"""Server package for the Flask POC.

This file marks the 'server' directory as a package so tools can import
submodules like 'server.app'. In production we start Gunicorn from the
server directory (app:app), which also avoids any import ambiguity.
"""
