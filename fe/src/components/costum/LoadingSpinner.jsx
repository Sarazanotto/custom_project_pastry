import { Spin } from "antd";

const LoadingSpinner = ({ children, loading }) => {
  return (
    <Spin spinning={loading} size="large">
      {children}
    </Spin>
  );
};

export default LoadingSpinner;
