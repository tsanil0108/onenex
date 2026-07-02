import { lazy, Suspense } from "react";
import "./Scene3D.css";

// three.js is a large dependency — load it lazily so it doesn't bloat the
// main bundle / block first paint. Every page that uses Scene3D pulls in
// a small separate chunk only when it actually renders one.
const Scene3DImpl = lazy(() => import("./Scene3DImpl"));

export default function Scene3D(props) {
  return (
    <Suspense 
      fallback={
        <div 
          className="scene3d scene3d--loading" 
          style={{ 
            width: props.size ?? 220, 
            height: props.size ?? 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="scene3d__loader"></div>
        </div>
      }
    >
      <Scene3DImpl {...props} />
    </Suspense>
  );
}