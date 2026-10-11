/* Pure geometry for laying values out on the hash ring. Kept free of React
   and SVG markup so the placement math can be reasoned about on its own. */

const SIZE = 320;
export const RING_VIEWBOX = `0 0 ${SIZE} ${SIZE}`;
export const RING_CENTER = SIZE / 2;
export const RING_RADIUS = 118;

const TICK_INSET = 8;
const TICK_OUTSET = 8;
const TICK_LABEL_OFFSET = 22;
const NODE_LABEL_OFFSET = 20;

interface Point {
    x: number;
    y: number;
}

export type TextAnchor = 'start' | 'middle' | 'end';

interface LabelPlacement {
    textAnchor: TextAnchor;
    dy: number;
}

/* Zero sits at the top of the ring and values increase clockwise, matching
   the direction the article walks the ring in. */
const angleFor = (value: number, max: number): number => (value / max) * 2 * Math.PI - Math.PI / 2;

const pointAt = (radius: number, angle: number): Point => ({
    x: RING_CENTER + radius * Math.cos(angle),
    y: RING_CENTER + radius * Math.sin(angle),
});

/* Text reads outward from whichever quadrant a point falls in, so a label
   never overlaps the ring it belongs to. */
const anchorFor = (angle: number): LabelPlacement => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const textAnchor: TextAnchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';
    const dy = sin > 0.3 ? 12 : sin < -0.3 ? -6 : 4;

    return { textAnchor, dy };
};

export interface TickPosition extends LabelPlacement {
    inner: Point;
    outer: Point;
    label: Point;
}

export const describeTickPosition = (value: number, max: number): TickPosition => {
    const angle = angleFor(value, max);

    return {
        inner: pointAt(RING_RADIUS - TICK_INSET, angle),
        outer: pointAt(RING_RADIUS + TICK_OUTSET, angle),
        label: pointAt(RING_RADIUS + TICK_LABEL_OFFSET, angle),
        ...anchorFor(angle),
    };
};

export interface NodePosition extends LabelPlacement {
    point: Point;
    label: Point;
}

export const describeNodePosition = (value: number, max: number): NodePosition => {
    const angle = angleFor(value, max);

    return {
        point: pointAt(RING_RADIUS, angle),
        label: pointAt(RING_RADIUS + NODE_LABEL_OFFSET, angle),
        ...anchorFor(angle),
    };
};

/* SVG path for the arc between two values, walked clockwise from `from` to
   `to`. Used to highlight the slice of the ring a server owns. */
export const describeArcPath = (from: number, to: number, max: number): string => {
    const start = pointAt(RING_RADIUS, angleFor(from, max));
    const end = pointAt(RING_RADIUS, angleFor(to, max));

    let sweep = to - from;
    if (sweep <= 0) {
        sweep += max;
    }
    const largeArcFlag = sweep > max / 2 ? 1 : 0;

    return `M ${start.x} ${start.y} A ${RING_RADIUS} ${RING_RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};
