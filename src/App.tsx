import React from 'react';
import logo from './logo.svg';
import './App.css';
import KMeans from "./KMeans/KMeans";
import Sample from "./DataStructures/Sample";

const atributos = ["sepal length", "sepal width", "petal length", "petal witdh", "class"];
const data = {};
//Context with global data
const dataContext = React.createContext(data);

class App extends React.Component {
    private fileDataInput: React.RefObject<HTMLInputElement>;
    state = {datos: {}, disabled: false}
    constructor(props: object) {
        super(props);
        this.fileDataInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.setState({datos: {}, disabled: true})
        event.preventDefault();
        if(this.fileDataInput.current != null && this.fileDataInput.current.files != null){
            this.handleFileChosen(this.fileDataInput.current.files[0]);
            // setTimeout(this.solveMap, 5000, this.table);
        }
    }

    handleFileChosen(file: File): void{
        const reader = new FileReader();
        let dataArray = new Array<Sample>();
        reader.onload = (event) => {
            let text: string | ArrayBuffer | null;
            if(event != null && event.target != null ) {
                text = event.target.result;
                let lines = new Array<string>();
                if(text != null && typeof(text) === "string") {
                    lines = text.split(/[\r\n]+/g);
                    lines.forEach((l) => {
                        let rowData = new Array<string>();
                        let row = l.split(',');
                        if(row.length !== atributos.length){
                            alert("El número de atributos no coincide con el número de datos");
                            throw "El número de atributos no coincide con el número de datos";
                        }
                        if(row.length !== 1){
                            let sample: Sample = new Sample(parseFloat(row[0]), parseFloat(row[1]), parseFloat(row[2]), parseFloat(row[3]), row[4]);
                            dataArray.push(sample);
                        }

                    });
                }
            }
        };
        reader.readAsText(file);
        console.log(dataArray);
    }

    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Algoritmos de clasificación - Iris</h1>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <div className={"line"}>
                        <label>Selecciona el fichero de <b>ejemplos</b>: </label>
                        <input type="file" accept=".txt" ref={this.fileDataInput} multiple={false} required={true} disabled={this.state.disabled}/>
                    </div>
                    <input type="submit" value="Realizar algoritmo" disabled={this.state.disabled}/>
                </form>
                <button>Original</button>
                <button>KMeans</button>
                <button>Bayes</button>
                <button>Floyd</button>
                <KMeans></KMeans>
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
