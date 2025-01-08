import { useSelector } from "react-redux";

const Notification = ({ text, type }) => {
  const notification = useSelector((state) => state.notification);
  if (notification.text === null) {
    return null;
  } else return <div className={notification.type}>{notification.text}</div>;
};

export default Notification;
