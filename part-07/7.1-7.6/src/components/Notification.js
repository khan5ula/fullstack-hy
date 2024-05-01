const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    display: notification ? 'block' : 'none'
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;