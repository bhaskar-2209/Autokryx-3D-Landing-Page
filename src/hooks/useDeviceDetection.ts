import { useEffect, useState } from 'react';

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const checkLowPerf = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return true;
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      const lowEnd = /SwiftShader|llvmpipe|Software|Microsoft Basic Render/i.test(String(renderer));
      return lowEnd || (navigator.hardwareConcurrency || 0) < 4;
    };

    setIsMobile(checkMobile());
    setIsLowPerf(checkLowPerf());

    const handler = () => setIsMobile(checkMobile());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return { isMobile, isLowPerf };
}
