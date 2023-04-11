import { open } from 'fs/promises'; 
import { MapNode } from './mapnode';

export async function fileGraphParse(path: string): Promise<[MapNode[], number[][]]> {
    const file = await open(path, 'utf-8');

    const lines = file.readLines();
    
    /* start parsing */
    /* first line: number of nodes for input */
    const nNodes = Number(lines.line);

    let nodes: MapNode[] = new Array<MapNode>(nNodes);
    /* next n lines: nodes info */
    for(let i = 0; i < nNodes; i++) {
        let lineRead = lines.line.split(' ');
        if (lineRead.length != 3) throw new Error('Invalid argument amount at line ' + (i+2));

        let name: string = lineRead[0];
        let lat: number = parseFloat(lineRead[1]);
        let lon: number = parseFloat(lineRead[2]);
        if(isNaN(lat) || isNaN(lon)) throw new Error('Invalid coordinate format (Use Decimal Degree geographical coordinate format)');

        nodes[i] = new MapNode(name, lat, lon);
    }

    let graph: number[][] = new Array<number[]>(nNodes).fill(new Array<number>(nNodes))
    /* next n lines: nodes info */
    for(let i = 0; i < nNodes; i++) {
        let lineRead = lines.line.split(' ');
        if (lineRead.length != nNodes) throw new Error('Invalid argument amount at line ' + (i+nNodes+2));

        for (let j = 0; j < nNodes; j++) {
            graph[i][j] = parseFloat(lineRead[j])
        }
    }

    return [nodes, graph];
}
