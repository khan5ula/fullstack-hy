import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue()

  const style = notification
    ? {

      border: 'solid',
      padding: 15,
      marginBottom: 12,
      borderWidth: 1,
      visibility: notification ? 'block' : 'none'
    }
    : {}

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification
