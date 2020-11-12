class Notification {
  constructor(notification, toggleNotificationHandler) {
    this._notification = notification;
    this._toggle = this._notification.querySelector('.notification__toggle');
    this._toggleNotificationHandler = toggleNotificationHandler;
  }

  setToggleListener = () => {
    this._toggle.addEventListener('click', this._toggleNotificationHandler);
  };

  removeToggleListener = () => {
    this._toggle.removeEventListener('click', this._toggleNotificationHandler);
  };

  setStateActive = (activity) => {
    if (!activity) {
      if (!this._notification.classList.contains('notification_disabled')) {
        this._notification.classList.add('notification_disabled');
      }
    } else {
      this._notification.classList.remove('notification_disabled');
    }
  };
}

export default Notification;
