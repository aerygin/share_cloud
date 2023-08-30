const CenteredContainer = ({
  children,
  sx,
}: {
  children?: JSX.Element | JSX.Element[];
  sx?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      {children ?? null}
    </div>
  );
};

export default CenteredContainer;
