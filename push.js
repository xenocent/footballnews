var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAcT-zVca0OoknRs0pwIfncgYPC6qcg_AhNBaBvDhpKaAOSfukuM29CU4SfKxRS4OmivUvJtfOIzNtXjIEX9oTQ",
   "privateKey": "HuSqRFbBWRetfvBXhucZf-dyXmO7rXQVJ1YSJ1T7FkY"
};
 
 
webPush.setVapidDetails(
   'mailto:budisetiawan760@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cT176kyabzs:APA91bEvENAfTGsbZX2XBb4W7XNNVMXIkzPDzIL-ZfQhYA8WM5zTFpRW88o48373XgYiLodiycSabIl6zWFapNR6C07KhkCxVwjXkya55qx39yTslqgi3NQtEgh23YM1JOfrJYwpuZFK",
   "keys": {
       "p256dh": "BBmjnWuBIPgQqKqjlWjcfDAN1VPbVI57ifIC5eg78S+XUdIys3/O46unX6Pm9ZOfvs/tLuQwjyhHmq3IuTKHdto=",
       "auth": "e6/FJd/t7GVLoboKsB+iGQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '584943448460',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
// {"publicKey":"BAcT-zVca0OoknRs0pwIfncgYPC6qcg_AhNBaBvDhpKaAOSfukuM29CU4SfKxRS4OmivUvJtfOIzNtXjIEX9oTQ","privateKey":"HuSqRFbBWRetfvBXhucZf-dyXmO7rXQVJ1YSJ1T7FkY"}