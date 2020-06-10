import Sample from "../DataStructures/Sample";

const tolerancia: number = 0.1;
const b: number = 2;
const center1 = new Sample(4.6,3.0,4.0,0.0,"");
const center2 = new Sample(6.8,3.4,4.6,0.7,"");

class KMeansAlgorithm{
    private muestras: Array<Sample>;
    private centers: Array<Sample>;
    constructor(m: Array<Sample>, c: Array<Sample>){
        this.centers = new Array<Sample>();
        this.centers.push(center1, center2);
        this.muestras = m;
        this.calcCenters();
    }

    updateCenters(): boolean{
        let ready: boolean = true;
        let u: number[][];
        let mNum: number = 0;
        this.muestras.forEach((m, ind)=>{
            let ds: Array<number> = new Array<number>(this.centers.length);
            let acum: number = 0.0;
            this.centers.forEach(c=>{
                let d = c.getData().reduce((a, b, i) => {return a + Math.pow(b - c.getData()[i], 2)}, 0.0);
                ds.push(Math.pow(1/d, 1/(b-1)));
                acum += Math.pow(1/d, 1/(b-1));
            });
            this.centers.forEach((c, i) => {
                u[i][ind] = ds[i]/acum;
            });
        });

        this.centers.forEach((c, i) => {
            let values: Array<number> = new Array<number>();
            c.getData().forEach(d => values.push(0.0));
            let acumB: number = 0.0;
            this.muestras.forEach((m,j) => {
                acumB+= Math.pow(u[i][j], b);
                values = values.map(function(v,k) {
                    return v += m.getData()[k] * Math.pow(u[i][j], b);
                });
            });
            let acumC = 0.0;
            values = values.map(function(v,k) {
                v = v/acumB;
                acumC += Math.abs(v - c.getData()[k]);
                return v;
            });
            c.setData(values);
            ready = (acumC <= tolerancia);
        });
        return ready;
    }

    calcCenters(): void {
        let ready: boolean = false;
        while(!ready)
        {
            ready = this.updateCenters();
        }

    }

    pertenencia(muestra: Sample): void {
        let acumulados: Array<number> = new Array<number>();
        let acumD: number = 0.0;
        this.centers.forEach(c => {
           let acumA: number = 0.0;
           muestra.getData().forEach((m,k) => {
               acumA += Math.pow(m - c.getData()[k], 2);
           });
           acumD += 1/acumA;
           acumulados.push(1/acumA);
        });
        let max = 0.0;
        let indMax = -1;
        acumulados = acumulados.map((d,i) => {
            d= d / acumD;
            if(d > max)
            {
                max = d;
                indMax = i;
            }
            return d;
        });
        if (indMax != -1){
            console.log("muestra");
        }
    }
}

export default KMeansAlgorithm;
