import { ToastContainer } from "react-toastify";

const ToastWrapper = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{
        fontFamily: "'Roboto', sans-serif",
        padding: "10px",
        marginTop: "20px",
      }}
      toastStyle={{
        backgroundColor: "#f9f9f9",
        color: "#333",
        borderRadius: "8px",
        padding: "12px 20px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
      }}
    />
  );
};

export default ToastWrapper;
