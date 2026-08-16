/**
 * Salt Smart — Firebase Messaging Service Worker
 * ทำหน้าที่รับ push notification ตอนที่แอปไม่ได้เปิดอยู่ (ปิดแท็บ/ปิดแอปไปแล้ว)
 * ต้องวางไฟล์นี้ไว้ที่ root เดียวกับ index.html (scope เริ่มต้นของ service worker คือโฟลเดอร์ที่ไฟล์นี้อยู่)
 */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// ค่าเดียวกับใน index.html (public config เปิดเผยได้ปกติ ไม่ใช่ความลับ)
firebase.initializeApp({
  apiKey: "AIzaSyDV0wpw4bQ6f2uztfpdVjYiC-toIP1B_oA",
  authDomain: "salt-smart-2569.firebaseapp.com",
  projectId: "salt-smart-2569",
  storageBucket: "salt-smart-2569.firebasestorage.app",
  messagingSenderId: "91998754790",
  appId: "1:91998754790:web:2f50cd0e43a9a1fdd16827"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'Salt Smart';
  const options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
  };
  self.registration.showNotification(title, options);
});

// กดที่ตัวแจ้งเตือน → เปิด/โฟกัสแท็บแอปที่เปิดอยู่ ถ้าไม่มีให้เปิดแท็บใหม่
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
