
export interface LineStyle {
    stroke: string;
    strokeWidth?: string;
    strokeDashArray?: string;
    opacity?: number;
}

export interface GraphPoint {
    x: number;
    y: number;
}

export type AreaChartLine = GraphPoint[];
export type AreaChartData = AreaChartLine[];

export interface AreaFill {
    fill: string;
    opacity?: number;
    'fill-opacity'?: number;
    'stroke-width'?: string;
}

export interface LineGraphHoverValue{
    x: number;
    y: number;
    xCoord: number;
    yCoord: number;
}

export interface GraphMargin{
    top?: number;
    right: number;
    bottom: number;
    left: number;
}

export interface AreaLegendItem {
    label: string;
    value: number;
    color: string;
    borderColor: string;
}

export interface ChartItem{
    label: string;
    value: number;
}