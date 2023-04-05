
cd ./service
nohup npm run dev > service.log &
echo "Start service complete!"


cd ..
nohup npm run dev > front.log &
echo "Start front complete!"
tail -f front.log
