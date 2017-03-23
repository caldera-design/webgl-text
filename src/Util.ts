
import { map, flatMap, times } from 'lodash';
import vectorizeText from 'vectorize-text';

type TriangulateParams = {
    text: string;
    fontFamily: string;
    fontSize: number;
    position: Vertex,
    size: Size;
    rotation: number;
    center: Vertex;
};

type TriangleVertices = [Vertex, Vertex, Vertex];

const VECTORIZE_BASE_PARAMS = {
    triangles: true,
    textBaseline: 'ideographic',
    textAlign: 'left'
};

export function triangulate({ text, fontFamily, position, fontSize }: TriangulateParams): [TriangleVertices] {
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
        return map(points, p => convertPoint(p, position, fontSize));
    });
}

function convertPoint([ x, y ]: [number, number], position: Vertex, fontSize: number): Vertex {
    return {
        x: x + 0.5 * position.x + 0.06 * fontSize,
        y: y + 0.5 * position.y + 1.85 * fontSize
    };
}

export function getGlyphVertices(triangles: [[Vertex, Vertex, Vertex]]): Float32Array {
    const vertices = flatMap(triangles, convertVertexToArray);
    return new Float32Array(vertices);
}

function convertVertexToArray({ x, y }: Vertex): [number, number] {
    return [x, y];
}
