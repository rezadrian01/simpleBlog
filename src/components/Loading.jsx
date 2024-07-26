import { createPortal } from "react-dom";

export default function Loading() {
  return createPortal(
    <div className="absolute">
      <div className="fixed w-full h-screen backdrop-blur-sm">
        <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
          <div className="h-10 w-10 rounded-full border-gray-300 border-4  border-b-gray-600 animate-spin"></div>
        </div>
      </div>
    </div>,
    document.getElementById("loading-root")
  );
}
