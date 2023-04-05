cd ./service
@echo on
start cmd /k "echo start service... & echo open service/service.log view log & npm run dev > service.log"
echo "Start service complete!"


cd ..
@echo on
start cmd /k "echo start front... & echo open front.log view log & npm run dev > front.log"
echo "Start front complete!"
