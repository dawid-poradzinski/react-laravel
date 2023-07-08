import { Annotation, Connector, Label } from "@visx/annotation";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from '@visx/text';
import { useState } from "react";

const Chart = () => {

    const coins = [
        {symbol: "Cos2", amount: 400, color: "#95Fad3"},
        {symbol: "Facebook", amount: 300, color: "#B9A3d3"},
        {symbol: "Twiiter", amount: 300, color: "#95A3d3"},
        {symbol: "Google", amount: 200, color: "#0033ad"},
        {symbol: "Cos1", amount: 100, color: "#CCA3d3"},
        {symbol: "LOL", amount: 50, color: "#343CB3"},
        {symbol: "Steam", amount: 20, color: "#AAaad3"}
    ]

    const [active, setActive] = useState<{} | null>(null);


    const half = 130;

    return (
        <div className="w-full h-full">
        <svg className="w-full h-full flex items-center justify-center">
            <Group className=" translate-x-1/2 translate-y-[45%]">
                <Pie
                data={coins}
                pieValue={(data) => data.amount}
                outerRadius={half}
                innerRadius={(info) => {
                    const size = active && active.symbol == info.data.symbol ? 24 : 16;
                    return half - size;
                }}
                padAngle={0.02}
                >
                    {(pie) => {
                        return pie.arcs.map((arc) => {
                        
                            const [centroidX, centroidY] = pie.path.centroid(arc);
                            const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.5;
                            const targetLabelOffset = (260) * 0.6;

                            return (
                                    <g key={arc.data.symbol}
                                       onMouseEnter={() => setActive(arc.data)}
                                       onMouseLeave={() => setActive(null)}
                                    >
                                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                                        {hasSpaceForLabel && (
                                            <Annotation
                                            x={centroidX}
                                            y={centroidY}
                                            dx={
                                                (centroidX < 0 ? -targetLabelOffset : targetLabelOffset) -
                                                centroidX
                                                }
                                                dy={centroidY < 0 ? -20 : 20}
                                            >
                                                <Label
                                                showAnchorLine
                                                anchorLineStroke="#eaeaea"
                                                showBackground={true}
                                                title={arc.data.symbol}
                                                subtitle={(arc.data.amount).toString()}
                                                fontColor="#000"
                                                width={100}
                                                />
                                                <Connector stroke="#000"/>
                                            </Annotation>
                                        )}
                                    </g>
                            )
                        })
                    }}
                </Pie>

                <Text textAnchor="middle" fill="#000" fontSize={25}>
                    {coins.reduce((acc, coin) => acc + coin.amount, 0)}
                </Text>
            </Group>
        </svg>
        </div>
    )

}
export default Chart;