const SkeletonLoader = ({ count = 1, height = '200px', width = '100%', borderRadius = '16px' }) => {
  const skeletons = Array(count).fill(0);

  return (
    <>
      {skeletons.map((_, i) => (
        <div
          key={i}
          style={{
            height,
            width,
            borderRadius,
            background: 'linear-gradient(90deg, #1a1a1a 0%, #262626 50%, #1a1a1a 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear',
            marginBottom: '1rem'
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  );
};

export default SkeletonLoader;
