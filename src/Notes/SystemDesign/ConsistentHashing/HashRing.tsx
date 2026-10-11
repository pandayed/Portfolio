import './HashRing.css';

import {
    describeArcPath,
    describeNodePosition,
    describeTickPosition,
    RING_CENTER,
    RING_RADIUS,
    RING_VIEWBOX,
} from './hashRingGeometry';

export interface HashRingNode {
    id: string;
    label: string;
    value: number;
    /* 'virtual' nodes are drawn smaller and without a value label, so a ring
       crowded with replicas still stays readable. Defaults to 'primary'. */
    variant?: 'primary' | 'virtual';
}

export interface HashRingArc {
    /* Values are walked clockwise from `from` to `to`. */
    from: number;
    to: number;
}

interface HashRingProps {
    /* Exclusive upper bound of the hash space, e.g. 1000 for values 0-999. */
    max: number;
    ticks: number[];
    nodes?: HashRingNode[];
    highlightArc?: HashRingArc;
    caption: string;
}

const HashRing = ({ max, ticks, nodes = [], highlightArc, caption }: HashRingProps) => {
    return (
        <figure className="HashRing">
            <svg viewBox={RING_VIEWBOX} role="img" aria-label={caption} className="HashRing__svg">
                <circle
                    cx={RING_CENTER}
                    cy={RING_CENTER}
                    r={RING_RADIUS}
                    className="HashRing__circle"
                />

                {highlightArc && (
                    <path
                        d={describeArcPath(highlightArc.from, highlightArc.to, max)}
                        className="HashRing__highlightArc"
                    />
                )}

                {ticks.map((tick) => {
                    const { inner, outer, label, textAnchor, dy } = describeTickPosition(tick, max);
                    return (
                        <g key={tick}>
                            <line
                                x1={inner.x}
                                y1={inner.y}
                                x2={outer.x}
                                y2={outer.y}
                                className="HashRing__tick"
                            />
                            <text
                                x={label.x}
                                y={label.y}
                                dy={dy}
                                textAnchor={textAnchor}
                                className="HashRing__tickLabel"
                            >
                                {tick}
                            </text>
                        </g>
                    );
                })}

                {nodes.map((node) => {
                    const isVirtual = node.variant === 'virtual';
                    const { point, label, textAnchor, dy } = describeNodePosition(node.value, max);
                    return (
                        <g key={node.id}>
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={isVirtual ? 3 : 5}
                                className={
                                    isVirtual
                                        ? 'HashRing__node HashRing__node--virtual'
                                        : 'HashRing__node'
                                }
                            />
                            <text
                                x={label.x}
                                y={label.y}
                                dy={dy}
                                textAnchor={textAnchor}
                                className={
                                    isVirtual
                                        ? 'HashRing__nodeLabel HashRing__nodeLabel--virtual'
                                        : 'HashRing__nodeLabel'
                                }
                            >
                                {node.label}
                                {!isVirtual && (
                                    <tspan x={label.x} dy="1.2em" className="HashRing__nodeValue">
                                        {node.value}
                                    </tspan>
                                )}
                            </text>
                        </g>
                    );
                })}
            </svg>
            <figcaption className="HashRing__caption">{caption}</figcaption>
        </figure>
    );
};

export default HashRing;
