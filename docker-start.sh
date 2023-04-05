

cd /app/service
nohup node dist/main.js > /app/log/service.log &
echo "Start service complete!"


cd /app/web
nohup node server.js > /app/log/front.log &
echo "Start front complete!"
tail -f /app/log/front.log
