import React from 'react';
import './App.css';
import KMeans from "./KMeans/KMeans";
import Sample from "./DataStructures/Sample";
import Iris2Clases from "./Iris2Clases";
import {ReactComponent as Loading} from './Assets/spinner.svg';

const atributos = ["sepal length", "sepal width", "petal length", "petal witdh", "class"];
const datos = [] as any;
//Context with global data
const dataContext = React.createContext(datos);

interface AppProps {
}

interface AppState {
    datos: Sample[],
    isLoaded: boolean,
    sl: number,
    sw: number,
    pl: number,
    pw: number,
    test: Sample,
    runTest: boolean
}
class App extends React.Component<AppProps, AppState> {
    private fileDataInput: React.RefObject<HTMLInputElement>;

    constructor(props: object) {
        super(props);
        this.fileDataInput = React.createRef();
        //this.createArray = this.createArray.bind(this);
        this.state = {datos: this.createArray(Iris2Clases), isLoaded: false, sl: 5.1, sw: 3.5, pl: 1.4, pw: 0.2, test: new Sample(-1,-1,-1,-1, ""), runTest: false};
        this.createArray(Iris2Clases);
        this.submitSample = this.submitSample.bind(this);
        this.handleChangeSL = this.handleChangeSL.bind(this);
        this.handleChangePL = this.handleChangePL.bind(this);
        this.handleChangeSW = this.handleChangeSW.bind(this);
        this.handleChangePW = this.handleChangePW.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoaded: true});
        }, 2000)

    }

    createArray(d: any[]): Array<Sample>{
        let result: Array<Sample> = new Array<Sample>();
        d.forEach(r => {
            result.push(new Sample(r["Sepal Length"], r["Sepal Width"], r["Petal Length"], r["Petal Length"], r["ClassName"]));
        });
        return result;
    }

    handleChangeSL(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({sl: parseFloat(event.target.value)});
        console.log(this.state);
    }

    handleChangeSW(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({sw: parseFloat(event.target.value)});
    }

    handleChangePL(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({pl: parseFloat(event.target.value)});
    }

    handleChangePW(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({pw: parseFloat(event.target.value)});
    }

    submitSample(event: React.FormEvent<HTMLFormElement>){
        this.setState({test: new Sample(this.state.sl, this.state.sw, this.state.pl,this.state.pw,""), runTest: true})
        event.preventDefault();
    }
    render(){
        const {isLoaded} = this.state;
        let m = <Loading></Loading>
        if(isLoaded)
            m = <p>Cargado</p>
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Algoritmos de clasificación - Iris</h1>
                </header>

                {m}
                <form onSubmit={this.submitSample}>
                    <span>Sepal Length</span>
                    <input type="number" step="0.01" required={true} value={this.state.sl} onChange={this.handleChangeSL}/>
                    <span>Sepal Width</span>
                    <input type="number" step="0.01" required={true} value={this.state.sw} onChange={this.handleChangeSW}/>
                    <span>Petal Length</span>
                    <input type="number" step="0.01" required={true} value={this.state.pl} onChange={this.handleChangePL}/>
                    <span>Petal Width</span>
                    <input type="number" step="0.01" required={true} value={this.state.pw} onChange={this.handleChangePW}/>
                    <input type="submit" value="Comprobar"/>
                </form>
                <button>Original</button>
                <button>KMeans</button>
                <button>Bayes</button>
                <button>Floyd</button>
                <dataContext.Provider value={datos}>
                    <KMeans data={this.state.datos} test={this.state.test} runTest={this.state.runTest}/>
                </dataContext.Provider>

                <footer>
                    <p>Pablo Miranda Torres</p>
                    <p>Ingeniería del Conocimiento</p>
                    <p>Universidad Complutense de Madrid</p>
                </footer>
            </div>
        );
    }

}

export default App;

