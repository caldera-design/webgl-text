
import { map, flatMap, times } from 'lodash';

// FIXME figure out how to use normal import syntax here
import vectorizeText = require('vectorize-text');

type TriangulateParams = {
    text: string;
    fontFamily: string;
    fontSize: number;
};

const VECTORIZE_BASE_PARAMS = {
    triangles: true,
    textBaseline: 'ideographic',
    textAlign: 'left'
};

export function triangulate({ text, fontFamily, fontSize }: TriangulateParams): [TriangleVertices] {
    const { cells, positions } = vectorizeText(text, {
        ...VECTORIZE_BASE_PARAMS,
        size: fontSize,
        lineHeight: fontSize,
        height: fontSize,
        font: fontFamily
    });
    return <[TriangleVertices]> map(cells, cell => {
        const [a, b, c] = cell;
        const points = [positions[a], positions[b], positions[c]];
        return map(points, p => convertPoint(p, fontSize));
    });
}

function convertPoint([ x, y ]: [number, number], fontSize: number): Vertex {
    return {
        x: x + 0.06 * fontSize,
        y: y + 1.85 * fontSize
    };
}

export function getGlyphVertices(triangles: [TriangleVertices], position: Vertex): Float32Array {
    const vertices = flatMap(triangles, triangle => flatMap(triangle, vertex => {
        return convertVertexToArray(addVertices(position, vertex));
    }));
    return new Float32Array(vertices);
}

function addVertices(a: Vertex, b: Vertex): Vertex {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}

function convertVertexToArray({ x, y }: Vertex): [number, number] {
    return [x, y];
}
