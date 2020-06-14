import React from "react";
import KMeansAlgorithm from "./KMeansAlgorithm";
import Sample from "../DataStructures/Sample";
import Plots from "../Plots/Plots";

const SIZE = 200;

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
        let res = <p></p>
        if(runTest){
            res =(<p className={"resultTest"}> La muestra ({this.props.test.getSepalLength()}, {this.props.test.getSepalWidth()}, {this.props.test.getPetalLength()}, {this.props.test.getPetalWidth()})
                pertenece a la clase <b>{this.km.pertenencia(this.props.test)}</b></p>)
        }
        return(<div>
            {res}
            <Plots data={this.props.data} centers={this.km.getCenters()} test={this.props.test} renderTest={this.props.runTest}></Plots>
        </div>);
    }

}

export default KMeans;
