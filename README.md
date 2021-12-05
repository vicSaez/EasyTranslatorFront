

docker build -f Dockerfile.prod -t easytranslator:front .

docker run -it --rm -p 1337:80 easytranslator:front