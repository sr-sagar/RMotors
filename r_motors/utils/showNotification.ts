"use client"
export const showNotification = (title: string,body: string) => {
    if(typeof window === "undefined") return

    if(!("Notification" in window)) return;
    if(Notification.permission === "granted"){
        new Notification(title, {
            body,
            icon: "/check.png",
            badge: "/check.png",
            requireInteraction: true,
            silent: false, 
        });
    }
    else if(Notification.permission !== "denied"){
        Notification.requestPermission().then((permission) => {
            if(permission === "granted"){
                new Notification(title, {
                    body,
                    icon: "/check.png",
                    badge: "/check.png",
                    requireInteraction: true,
                    silent: false, 
                });
            }
            
        })
    }
}