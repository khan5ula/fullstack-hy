interface NotificationProps {
  message: string;
}

const Notification = (props: NotificationProps) => {
  const message = props.message;

  if (!message) {
    return null;
  }

  return <div style={{ color: "red" }}>{message}</div>;
};

export default Notification;
