"use client";

import {
  useRef,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

const dragThreshold = 6;

type DragState = {
  startX: number;
  startTime: number;
  pointerId: number;
  moved: boolean;
};

export function CarouselTrack({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);

  function getAnimation() {
    return trackRef.current?.getAnimations?.()[0];
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const animation = getAnimation();
    if (!animation) return;

    suppressClickRef.current = false;
    dragRef.current = {
      startX: event.clientX,
      startTime: Number(animation.currentTime ?? 0),
      pointerId: event.pointerId,
      moved: false,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const track = trackRef.current;
    const animation = getAnimation();
    if (!drag || !track || !animation) return;

    if (event.pointerType === "mouse" && (event.buttons & 1) === 0) {
      endDrag();
      return;
    }

    const deltaX = event.clientX - drag.startX;

    if (!drag.moved) {
      if (Math.abs(deltaX) < dragThreshold) return;
      drag.moved = true;
      track.setPointerCapture?.(drag.pointerId);
      track.classList.add("is-dragging");
    }

    const duration = Number(animation.effect?.getComputedTiming().duration ?? 0);
    const loopWidth = track.offsetWidth / 2;
    if (!duration || !loopWidth) return;

    const time = drag.startTime - (deltaX / loopWidth) * duration;
    animation.currentTime = ((time % duration) + duration) % duration;
  }

  function endDrag() {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag?.moved) return;

    suppressClickRef.current = true;
    trackRef.current?.classList.remove("is-dragging");
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!suppressClickRef.current) return;

    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div
      ref={trackRef}
      className="carousel-track"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
    >
      {children}
    </div>
  );
}
