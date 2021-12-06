# EasyTranslatorFront

Connects with EasyTranslatorAPI at http://localhost:49155 and allows to translate sentences from English, French and German to any other of those.

How to run:

1) clone repository

2) docker build -f Dockerfile.prod -t easytranslator:front .

3) docker run -it --rm -p 1337:80 easytranslator:front

4) open browser at http://localhost:1337/
