from setuptools import setup

from setuptools import setup

setup(
    name='text2image_app',
    version='0.1',
    install_requires=[
        'fastapi',
        'uvicorn',
        'typing_extensions',
        'replicate',
        'mangum',
        'python-dotenv',
    ],
)