import { Annotation, Connector, Label } from "@visx/annotation";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from '@visx/text';
import { useEffect, useState } from "react";

const Chart = (props : any) => {

    const [suma, setSuma] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {

        setSuma(props.sum);
        setData(props.info);

    }, [props]);

    const [active, setActive] = useState<{id: number, amount: number, name: string, color: string} | null>(null);

    const half = 130;

    return (
        <div className="w-full h-full">
                    <svg className="w-full h-full flex items-center justify-center">

                    <Group className=" translate-x-1/2 translate-y-[50%]">
                        <Pie
                        data={data}
                        pieValue={(data) => data['amount']}
                        outerRadius={half}
                        innerRadius={(info) => {
                            const size = active && active.id == info.data['id'] ? 24 : 16;
                            return half - size;
                        }}
                        padAngle={0.02}
                        >
                            {(pie) => {
                                return pie.arcs.map((arc) => {
                                
                                    const [centroidX, centroidY] = pie.path.centroid(arc);
                                    const targetLabelOffset = 200;
        
                                    return (
                                            <g key={arc.data['id']}
                                            onMouseEnter={() => setActive(arc.data)}
                                            onMouseLeave={() => setActive(null)}
                                            >
                                                <path d={pie.path(arc)} fill={arc.data['color']}></path>
                                                
                                                {active?.id == arc.data['id'] && (
                                                    <Annotation
                                                        x={centroidX}
                                                        y={centroidY}
                                                        dx={
                                                            (centroidX < 0 ? -targetLabelOffset : targetLabelOffset) -
                                                            centroidX
                                                            }
                                                            dy={centroidY < 0 ? -20 : 25}
                                                        >
                                                        <Label
                                                        className="hidden md:block"
                                                        showAnchorLine
                                                        anchorLineStroke="#eaeaea"
                                                        showBackground={true}
                                                        title={arc.data['name']}
                                                        subtitle={`${((arc.data['amount']/suma)* 100).toFixed(1)}%`}
                                                        subtitleFontSize={16}
                                                        fontColor="#000"
                                                        maxWidth={100}
                                                        width={100}
                                                        />
                                                        <Connector stroke="#000" className="hidden md:block"/>
                                                    </Annotation>
                                                )}
                                            </g>
                                    )
                                })
                            }}
                        </Pie>
                            {active ?
                                <>
                                <Text textAnchor="middle" fill="#000" dy={-10} fontSize={40} width={70} scaleToFit={active.amount.toString().length > 20} >
                                    {active.amount}
                                </Text>
                                <Text textAnchor="middle" fill={active.color} dy={30} fontSize={20} width={150} scaleToFit={active.name.toString().length > 24}>
                                    {active.name}
                                </Text>
                            </>
                            :
                            <>
                                <Text textAnchor="middle" fill="#000" dy={-10} fontSize={40} width={70} scaleToFit={suma.toString().length > 20}>
                                    {suma}
                                </Text>
                                <Text textAnchor="middle" fill="#444" dy={30} fontSize={20}>
                                    Całkowita ilość
                                </Text>
                            </>
                            }
                    </Group>
                </svg>
        </div>
    )

}
export default Chart;