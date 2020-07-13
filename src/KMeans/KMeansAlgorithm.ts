import Sample from "../DataStructures/Sample";

const tolerancia: number = 0.1;
const b: number = 2;
const center1 = new Sample(4.6,3.0,4.0,0.0,"Iris-Setosa");
const center2 = new Sample(6.8,3.4,4.6,0.7,"Iris-Versicolor");

class KMeansAlgorithm{
    private muestras: Array<Sample>;
    private centers: Array<Sample>;
    constructor(m: Array<Sample>){
        this.centers = new Array<Sample>();
        this.centers.push(center1, center2);
        this.muestras = m;
        if(this.muestras.length > 1)
            this.calcCenters();
    }

    initializeArray(): number[][]{
        let u: number[][] = [];
        for (let i = 0; i < this.centers.length; i++) {
            u[i] = [];
            for (let j = 0; j < this.centers[0].getData().length; j++) {
                u[i][j] = 0;
            }
        }
        return u;
    }
    updateCenters(): boolean{
        let end: boolean = true;
        let u: number[][]= this.initializeArray();
        this.muestras.forEach((m, ind)=>{
            let ds: Array<number> = new Array<number>();
            let acum: number = 0.0;
            this.centers.forEach(c=>{
                let d = c.getData().reduce((a, num, i) => {
                    return a + Math.pow(num - m.getData()[i], 2)}, 0.0);
                ds.push(Math.pow(1/d, 1/(b-1)));
                acum += Math.pow(1/d, 1/(b-1));
            });
            this.centers.forEach((c, i) => {
                u[i][ind] = ds[i]/acum;
            });
        });

        this.centers.forEach((c, i) => {
            let values: Array<number> = new Array<number>();
            c.getData().forEach(() => values.push(0.0));
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
            end = (acumC <= tolerancia);
        });
        return end;
    }

    calcCenters(): void {
        let ready: boolean = false;
        while(!ready)
        {
            ready = this.updateCenters();
        }
    }

    getCenters(): Sample[]{
        return this.centers;
    }

    belongsTo(muestra: Sample): string {
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
        if (indMax !== -1){
            return this.centers[indMax].getClassName();
        }
        else return "Not found";
    }
}

export default KMeansAlgorithm;
