import { ReactNode } from 'react';

const Flex = ({
  children,
  sx,
}: {
  children: JSX.Element | JSX.Element[] | ReactNode;
  sx?: React.CSSProperties;
}) => {
  return <div style={{ display: 'flex', gap: '10px', ...sx }}>{children}</div>;
};

export default Flex;
