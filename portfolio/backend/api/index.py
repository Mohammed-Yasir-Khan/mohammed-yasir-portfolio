import os
import sys

# Add root backend directory to python path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from app.main import app  # noqa: F401
