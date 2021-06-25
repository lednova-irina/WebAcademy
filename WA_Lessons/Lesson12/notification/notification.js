Notification.requestPermission().then(function(result) {
    spawnNotification('Hi, there!', undefined,'my notify')
    console.log(result);
  });

function notifyMe() {
  // Проверка поддержки браузером уведомлений
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Проверка разрешения на отправку уведомлений
  else if (Notification.permission === "granted") {
    // Если разрешено, то создаём уведомление
    var notification = new Notification("Hi there!");
  }

  // В противном случае, запрашиваем разрешение
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // Если пользователь разрешил, то создаём уведомление
      if (permission === "granted") {
        var notification = new Notification('Notification title', {
            icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: 'Hey there! You\'ve been notified!',
           });
      }
    });
  }
}

function spawnNotification(body, icon, title) {
    var options = {
        body: body,
        icon: icon
    };
    var n = new Notification(title, options);

  }
