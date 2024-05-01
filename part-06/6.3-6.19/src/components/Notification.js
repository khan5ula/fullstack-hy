import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    border: 'solid',
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    background: 'lightGreen',
    visibility: notification ? 'visible' : 'hidden'
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
