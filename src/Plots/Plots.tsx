import React from 'react';
import {
    XAxis,
    YAxis,
    XYPlot,
    Borders,
    Hint,
    MarkSeries
} from 'react-vis';

import './plots.css';
import Sample from "../DataStructures/Sample";
const AXES = [
    'sepal length',
    'sepal width',
    'petal length',
    'petal width'
];

const SPECIES = ['iris-setosa', 'iris-versicolor', 'iris-virginica'];

const SIZE = 250;
interface PlotProps{
    data: Sample[]
    centers: Sample[]
    test: Sample,
    renderTest: boolean
}
interface PlotState{
}

interface PlotState{}
export default class Plots extends React.Component<PlotProps, PlotState> {

    render() {
        return (
            <div className="iris-dasboard-example">
                <div className="chart-container">
                    {AXES.map((yAxis, j) => {
                        return (
                            <div key={yAxis} className="chart-row">
                                {AXES.map((xAxis, i) => {
                                    if (xAxis === yAxis) {
                                        return (
                                            <div
                                                key={`${xAxis}-${yAxis}`}
                                                className="axis-label"
                                                style={{height: SIZE, width: SIZE}}>
                                                <h3>{xAxis}</h3>
                                            </div>
                                        );
                                    }

                                    return (
                                        <XYPlot height={SIZE} width={SIZE} key={`${xAxis}-${yAxis}`} onMouseLeave={() => this.setState({value: false})}>
                                            <MarkSeries
                                                data={this.props.data.map(d => ({
                                                    x: d.getData()[i],
                                                    y: d.getData()[j],
                                                    color: d.getClassName()
                                                }))}
                                                _sizeValue={3}
                                                colorType="category"
                                                colorDomain={SPECIES}
                                                colorRange={['#19CDD7', 'red']}
                                                opacity={0.3}
                                            />
                                            <MarkSeries
                                                data={this.props.centers.map(d => ({
                                                    x: d.getData()[i],
                                                    y: d.getData()[j],
                                                }))}
                                                color={'yellow'}
                                                _sizeValue={6}
                                                stroke={'black'}
                                            />
                                            {this.props.renderTest ?
                                                <MarkSeries
                                                    data={[{x: this.props.test.getData()[i], y: this.props.test.getData()[j],}]}
                                                    color={'green'}
                                                    _sizeValue={6}
                                                    stroke={'black'}
                                                />
                                                : null}
                                            <Borders style={{all: {fill: '#fff'}}} />
                                            <XAxis title={xAxis}/>
                                            <YAxis title={yAxis}/>
                                        </XYPlot>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
