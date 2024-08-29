// src/Components/SplineBackground.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';
import './SplineBackground.css';

const SplineBackground = () => {
  return (
    <div className="spline-background">
      <Spline scene="https://prod.spline.design/uzBiZXDdu7q2w-5n/scene.splinecode" />
    </div>
  );
};

export default SplineBackground;
