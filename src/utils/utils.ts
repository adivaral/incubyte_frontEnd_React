export function add(numbers:string):number {
    let sum = 0;
    if(!numbers){
        return 0;
    } else {
        let delimiter = /,|\n/;
        if (numbers.startsWith("//")) {
            const delimiterEndIndex = numbers.indexOf("\n");
            delimiter = new RegExp(numbers.substring(2, delimiterEndIndex));
            numbers = numbers.substring(delimiterEndIndex + 1);
        }
        let nums = numbers.split(delimiter);
        let negativeNum:number[] = [];
        sum = nums.reduce((acc,elem)=>{
                let parseNum = parseInt(elem);
                if(parseNum < 0){
                    negativeNum.push(parseNum);
                }
                return acc = acc + parseNum;
        },0);

        if (negativeNum.length && negativeNum.length <=1) throw new Error(`Negative numbers not allowed`);
        if (negativeNum.length) throw new Error(`Negative numbers not allowed: ${negativeNum.join(",")}`);
        return sum;
    }
}