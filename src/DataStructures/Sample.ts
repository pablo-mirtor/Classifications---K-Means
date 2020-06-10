class Sample{
    private _sepalLength: number;
    private _sepalWidth: number;
    private _petalLength: number;
    private _petalWidth: number;
    private _className: string;
    private _data: Array <number>;
    constructor(sl: number, sw: number, pl: number, pw: number, c: string){
        this._petalLength = pl;
        this._sepalLength = sl;
        this._sepalWidth = sw;
        this._petalWidth = pw;
        this._className = c;
        this._data = new Array<number>();
        this._data.push(sl,sw,pl,pw);
    }

    getData(): Array<number>{
        return this._data;
    }

    setData(value: Array<number>): void{
        this._data = value;
    }

    getSepalLength(): number {
        return this._sepalLength;
    }

    setSepalLength(value: number) {
        this._sepalLength = value;
    }

    getSepalWidth(): number {
        return this._sepalWidth;
    }

    setSepalWidth(value: number) {
        this._sepalWidth = value;
    }

    getPetalLength(): number {
        return this._petalLength;
    }

    setPetalLength(value: number) {
        this._petalLength = value;
    }

    getPetalWidth(): number {
        return this._petalWidth;
    }

    setPetalWidth(value: number) {
        this._petalWidth = value;
    }

    getClassName(): string {
        return this._className;
    }

    setClassName(value: string) {
        this._className = value;
    }
}

export default Sample;
