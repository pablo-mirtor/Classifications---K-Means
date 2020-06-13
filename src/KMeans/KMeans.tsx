import React from "react";
import KMeansAlgorithm from "./KMeansAlgorithm";
import Sample from "../DataStructures/Sample";
import {
    XAxis,
    YAxis,
    XYPlot,
    MarkSeriesCanvas,
    Borders,
    Highlight, LineSeries, HorizontalGridLines
} from 'react-vis';

interface KMeansProps {
    data: Sample[],
    test: Sample
    runTest: boolean
}

interface KMeansState {}

class KMeans extends React.Component<KMeansProps, KMeansState>{
    private km: KMeansAlgorithm;

    constructor(props: any) {
        super(props);
        this.km = new KMeansAlgorithm(this.props.data);

    }

    render(){
        const {runTest} = this.props;
        let res = <p>Hola</p>
        if(runTest){
            res = <p> La muestra pertenece a la clase {this.km.pertenencia(this.props.test)}</p>
        }
        return(<div>
            {res}
            <XYPlot
                width={300}
                height={300}>
                <MarkSeriesCanvas
                    data={[{x: 1, y: 2}, {x:3, y:4}]}
                    colorType="category"
                    colorRange={['#19CDD7', 'red', '#88572C']}
                    getOpacity={d => d.selected ? 1 : 0.1}
                />
                <Borders style={{all: {fill: '#fff'}}} />
                <XAxis />
                <YAxis />
            </XYPlot>
            <XYPlot
                width={300}
                height={300}>
                <HorizontalGridLines />
                <MarkSeriesCanvas
                    data={[
                        {x: 1, y: 10},
                        {x: 2, y: 5},
                        {x: 3, y: 15}
                    ]}/>
                <XAxis />
                <YAxis />
            </XYPlot>
        </div>);
    }

}

export default KMeans;
