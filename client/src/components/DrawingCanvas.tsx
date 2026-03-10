import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  pressure?: number;
}

interface Stroke {
  points: Point[];
}

interface DrawingCanvasProps {
  onStrokeComplete?: (canvas: HTMLCanvasElement) => void;
  onStrokeStart?: () => void;
  width?: number;
  height?: number;
}

export function DrawingCanvas({
  onStrokeComplete,
  onStrokeStart,
  width = 500,
  height = 500,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize canvas and handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Update internal resolution to match display size (scaled by DPR for sharpness)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Re-draw existing strokes after resize
      redrawCanvas(strokes);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(canvas);
    updateCanvasSize();

    return () => resizeObserver.disconnect();
  }, []);

  // Catmull-Rom spline interpolation for smooth strokes
  const interpolatePoints = (points: Point[]): Point[] => {
    if (points.length < 2) return points;

    const interpolated: Point[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || points[i + 1];

      // Add original point
      interpolated.push(p1);

      // Add interpolated points between p1 and p2
      for (let t = 0.1; t < 1; t += 0.1) {
        const t2 = t * t;
        const t3 = t2 * t;

        const q =
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);

        const r =
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

        interpolated.push({ x: q, y: r, pressure: p1.pressure });
      }
    }

    // Add last point
    interpolated.push(points[points.length - 1]);
    return interpolated;
  };

  // Draw a stroke on the canvas
  const drawStroke = (points: Point[], ctx: CanvasRenderingContext2D) => {
    if (points.length < 2) return;

    const smoothPoints = interpolatePoints(points);

    ctx.beginPath();
    ctx.moveTo(smoothPoints[0].x, smoothPoints[0].y);

    for (let i = 1; i < smoothPoints.length; i++) {
      ctx.lineTo(smoothPoints[i].x, smoothPoints[i].y);
    }

    ctx.stroke();
  };

  // Redraw all strokes
  const redrawCanvas = (strokesToDraw: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Redraw all strokes
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokesToDraw.forEach((stroke) => {
      drawStroke(stroke.points, ctx);
    });
  };

  // Get canvas coordinates from mouse/touch event
  const getCanvasCoordinates = (
    e: any
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;
    let pressure = 1;

    if (e.clientX !== undefined) {
      clientX = e.clientX;
      clientY = e.clientY;
      if (e.pressure !== undefined) {
        pressure = e.pressure;
      }
    } else if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
      pressure = touch.force || 1;
    }

    // Calculate position relative to canvas display size
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return {
      x,
      y,
      pressure,
    };
  };

  // Handle drawing start
  const handleDrawStart = (
    e: MouseEvent | TouchEvent | PointerEvent
  ) => {
    // Prevent scrolling when drawing on touch devices
    if (e.cancelable) {
      e.preventDefault();
    }

    if (e instanceof TouchEvent && e.touches.length > 1) return;

    const point = getCanvasCoordinates(e);
    if (!point) return;

    setIsDrawing(true);
    setCurrentStroke([point]);
    onStrokeStart?.();

    // Clear inactivity timeout
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  };

  // Handle drawing move
  const handleDrawMove = (
    e: MouseEvent | TouchEvent | PointerEvent
  ) => {
    if (!isDrawing) return;
    if (e instanceof TouchEvent && e.touches.length > 1) return;

    // Prevent scrolling when drawing on touch devices
    if (e.cancelable) {
      e.preventDefault();
    }

    const point = getCanvasCoordinates(e);
    if (!point) return;

    setCurrentStroke((prev) => [...prev, point]);
  };

  // Handle drawing end
  const handleDrawEnd = (e?: any) => {
    if (!isDrawing) return;

    setIsDrawing(false);

    if (currentStroke.length > 1) {
      const newStroke: Stroke = { points: currentStroke };
      const updatedStrokes = [...strokes, newStroke];
      setStrokes(updatedStrokes);

      // Redraw canvas with new stroke
      redrawCanvas(updatedStrokes);

      // Set inactivity timeout for recognition
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      inactivityTimeoutRef.current = setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          onStrokeComplete?.(canvas);
        }
      }, 1000);
    }

    setCurrentStroke([]);
  };

  // Draw current stroke in real-time
  useEffect(() => {
    if (!isDrawing || currentStroke.length < 2) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const p1 = currentStroke[currentStroke.length - 2];
    const p2 = currentStroke[currentStroke.length - 1];

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }, [currentStroke, isDrawing]);

  // Attach event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const options: any = { passive: false };

    // Mouse events
    canvas.addEventListener('mousedown', handleDrawStart as EventListener, options);
    canvas.addEventListener('mousemove', handleDrawMove as EventListener, options);
    window.addEventListener('mouseup', handleDrawEnd);

    // Touch events
    canvas.addEventListener('touchstart', handleDrawStart as EventListener, options);
    canvas.addEventListener('touchmove', handleDrawMove as EventListener, options);
    canvas.addEventListener('touchend', handleDrawEnd, options);
    canvas.addEventListener('touchcancel', handleDrawEnd, options);

    // Pointer events (for stylus/pen support)
    canvas.addEventListener('pointerdown', handleDrawStart as EventListener, options);
    canvas.addEventListener('pointermove', handleDrawMove as EventListener, options);
    window.addEventListener('pointerup', handleDrawEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleDrawStart as EventListener);
      canvas.removeEventListener('mousemove', handleDrawMove as EventListener);
      window.removeEventListener('mouseup', handleDrawEnd);

      canvas.removeEventListener('touchstart', handleDrawStart as EventListener);
      canvas.removeEventListener('touchmove', handleDrawMove as EventListener);
      canvas.removeEventListener('touchend', handleDrawEnd);
      canvas.removeEventListener('touchcancel', handleDrawEnd);

      canvas.removeEventListener('pointerdown', handleDrawStart as EventListener);
      canvas.removeEventListener('pointermove', handleDrawMove as EventListener);
      window.removeEventListener('pointerup', handleDrawEnd);
    };
  }, [isDrawing, currentStroke, strokes]);

  // Clear canvas
  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    setStrokes([]);
    setCurrentStroke([]);

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  };

  // Undo last stroke
  const undo = () => {
    if (strokes.length === 0) return;

    const updatedStrokes = strokes.slice(0, -1);
    setStrokes(updatedStrokes);
    redrawCanvas(updatedStrokes);

    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  };

  return {
    canvasRef,
    clear,
    undo,
    hasStrokes: strokes.length > 0,
  };
}
