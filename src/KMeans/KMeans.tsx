import React from "react";
import KMeansAlgorithm from "./KMeansAlgorithm";
class KMeans extends React.Component{
    //private km: KMeansAlgorithm;
    constructor(props: any) {
        super(props);
       // this.km = new KMeansAlgorithm();
    }
    doKMeans(){

    }

    render(){
        return(<div>
            KMeans component {3+5}
        </div>);
    }

}

export default KMeans;
