class PieChart {
    constructor(elementID,data,width = 400, height = 400, backgroundColor = 'white'){
        this.elementID = elementID;
        this.data = data;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        
        this.draw();
    }
    draw(){
        let div = document.getElementById(this.elementID);
        div.innerHTML = '';
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.backgroundColor = this.backgroundColor;
        div.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let total = 0;
        this.data.forEach(element => {
            total += element.value;
        });
        
        let startAngle = 0;
        let endAngle = 0;
        this.data.forEach(section => {
            let sectionAngle = (2 * Math.PI) * (section.value/total);
            endAngle = startAngle+ sectionAngle;

            ctx.beginPath();
            ctx.moveTo(this.width/2,this.height/2);
            let radius = this.width/2;
            ctx.arc(radius,radius,radius,startAngle,endAngle);
            ctx.fillStyle = section.color;
            ctx.fill();

            startAngle = endAngle;

            ctx.font = '20px Arial';
            ctx.fontWeight  = 'bold';
            ctx.textAlign = 'center';
            ctx.fillStyle = "white";
            //mid
            let middleAngle = startAngle - (sectionAngle/2);
            let x = radius + (radius/2 * Math.cos(middleAngle));
            let y = radius + (radius/2 * Math.sin(middleAngle));
            ctx.fillText(section.label, x, y);
        });
    }

    update(data){
        this.data = data;
        this.draw();
    }

    addData(label,value,color){
        value = Number(value);
        this.data.push({label,value,color});
        this.draw();
    }
    removeData(index){
        this.data.splice(index,1);
        this.draw();
    }
}
//Home work
// create and export a class called barChart
class BarChart {
    constructor(elementId, data, width = 400, height = 400, backgroundColor = '#fff') {
        this.elementId = elementId;
        this.data = data;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.draw();
    }

    draw() {
        let div = document.getElementById(this.elementId);
        div.innerHTML = '';
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.backgroundColor = this.backgroundColor;
        div.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        //draw the bars
        let barWidth = this.width / this.data.length;
        let max = 0;
        this.data.forEach(element => {
            if (element.value > max) {
                max = element.value;
            }
        });
        let scale = this.height / max;
        console.log(scale);
        let x = 0;
        this.data.forEach(element => {
            let barHeight = element.value * scale;
            ctx.fillStyle = element.color;
            ctx.fillRect(x, this.height - barHeight, barWidth, barHeight);
            x += barWidth;
        });
        //draw the labels
        x = 0;
        ctx.font = '20px Arial';
        ctx.fontWeight = 'bold';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        this.data.forEach(element => {
            let label = element.label;
            let barHeight = element.value * scale;
            let y = this.height - barHeight - 5;
            ctx.fillText(label, x + barWidth / 2, y+30);
            x += barWidth;
        });
    
    }

    update(data) {
        this.data = data;
        this.draw();
    }

    addData(label, value, color) {
        //convert the value to a number
        value = Number(value);      
        this.data.push({label, value, color});
        this.draw();
    }
}


//export
export {PieChart, BarChart};