const Spacer = ({ h }: { h?: number }) => {
  return <div style={{ height: h ?? 20, display: 'flex' }}></div>;
};

export default Spacer;
