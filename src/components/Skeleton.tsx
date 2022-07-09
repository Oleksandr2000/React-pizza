import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="156" cy="371" r="4" />
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="320" rx="10" ry="10" width="280" height="60" />
    <rect x="7" y="400" rx="25" ry="25" width="90" height="45" />
    <rect x="170" y="400" rx="25" ry="25" width="110" height="45" />
    <rect x="0" y="270" rx="20" ry="20" width="280" height="30" />
  </ContentLoader>
);

export default Skeleton;
