import { fabric } from "fabric";

function rewriteObjectDefaults(canvas: fabric.Canvas) {
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "rgba(0,0,0,0.5)";
  fabric.Object.prototype.cornerSize = 10;
  fabric.Object.prototype.padding = 0;

  function createConnectionPath(e: MouseEvent, transform: fabric.Transform) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (transform.target?.oCoords?.rc && transform.target?.oCoords?.rc) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const x = transform.target.oCoords.rc.x;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const y = transform.target.oCoords.rc.y;

      const startPoint = new fabric.Point(x, y);
      const endPoint = new fabric.Point(x, y);

      // create a path
      const path = new fabric.Polyline([startPoint, endPoint], {
        stroke: "black",
        strokeWidth: 2,
        objectCaching: false,
      });

      transform.target.canvas?.add(path);

      return path;
    }
  }

  // add a custom controls for the object that will be connectors
  let connectionPath: fabric.Polygon | null = null;
  fabric.Object.prototype.controls.rc = new fabric.Control({
    x: 0.5,
    y: 0,
    offsetY: 0,
    cursorStyle: "pointer",
    actionHandler: (e, transform, x, y) => {
      if (connectionPath?.points?.[1]) {
        connectionPath.points[1].x = x;
        connectionPath.points[1].y = y;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        connectionPath._setPositionDimensions({});
        connectionPath.setCoords();
      }
      return true;
    },
    mouseDownHandler: (e, transform, x, y) => {
      // need also handle cases when connection already established
      const path = createConnectionPath(e, transform);

      if (path) {
        connectionPath = path;
        transform.target.data = {
          connection: {
            rc: connectionPath,
          },
        };
      }

      return false;
    },
    render: (ctx, left, top, styleOverride, fabricObject) => {
      const size = fabricObject.cornerSize;
      const angle = fabricObject.angle;
      if (size !== undefined && angle !== undefined) {
        ctx.save();

        // make the control a circle
        ctx.beginPath();
        ctx.arc(left, top, size / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();

        ctx.restore();
      }
    },
  });

  // don't show middle controls in object
  fabric.Object.prototype.controls = {
    tl: fabric.Object.prototype.controls.tl,
    tr: fabric.Object.prototype.controls.tr,
    bl: fabric.Object.prototype.controls.bl,
    br: fabric.Object.prototype.controls.br,
    mtr: fabric.Object.prototype.controls.mtr,
    rc: fabric.Object.prototype.controls.rc,
  };

  function update(e: fabric.IEvent) {
    if (e.target?.data?.connection?.rc) {
      const rc: fabric.Polyline = e.target.data.connection.rc;
      const rcPoint = rc?.points?.[0];
      if (rcPoint) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        rcPoint.x = e.target.oCoords?.rc.x;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        rcPoint.y = e.target.oCoords?.rc.y;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      rc._setPositionDimensions({});
      rc.setCoords();
    }
  }

  // move connectionPath with the object
  canvas.on("object:moving", update);
  canvas.on("object:resizing", update);
  canvas.on("object:rotating", update);
  canvas.on("object:scaling", update);
}

export default rewriteObjectDefaults;
