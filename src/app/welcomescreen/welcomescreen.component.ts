import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-welcomescreen',
  templateUrl: './welcomescreen.component.html',
  styleUrls: ['./welcomescreen.component.css']
})
export class WelcomescreenComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D

  // @ViewChild('canvas') myCanvas: ElementRef;
  // public context: CanvasRenderingContext2D;

  log = ""


  task = [];
  task_distance = [];
  cloudlets = 0;
  cloudletposition = [];
  tasknum = 0;
  algoritham_exe = true;
  costmatrix = []
  phenoMatrix = [];



  first_section = false;
  second_section = true;
  third_section = true;
  drawed_line = true;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.ctx.fillStyle = 'red';
  }

  // ngAfterViewInit(){
  //  this.ctx = this.canvas.nativeElement.getContext('2d');
  //   this.ctx.fillStyle = 'red';
  //   this.ctx.fillRect(0, 0, 5, 5);
  // }
  cloud_click() {
    this.first_section = false;
    this.second_section = true;
    this.third_section = true;
  }
  task_click() {
    this.first_section = true;
    this.second_section = false;
    this.third_section = false;
  }

  changeqvalue(cnum) {
    this.cloudlets = cnum.value;
    let temp = {};
    let column = [];
    this.costmatrix = [];
    for (var i = 0; i < this.cloudlets; i++) {
      column = [];
      for (var j = 0; j < this.cloudlets; j++) {
        if (i == j) {
          temp = {
            data: 0
          }
        }
        else {
          temp = {
            data: 1
          }
        }
        column.push(temp);
      }
      this.costmatrix.push(column);
      console.log(this.costmatrix);
    }
  }

  adddistance(row_, column_, distance) {
    if (row_.value != column_.value) {
      this.costmatrix[row_.value][column_.value].data = distance.value;
    }
  }

  tasksection() {

  }

  executealgoritham() {
    if (this.task.length == 0) {
      alert("Please add atleast one task to perform")
    }
    else {
      this.algoritham_exe = false;
    }
  }

  addtoroute(taskname, cloudlet) {
    let hint = true;
    if (this.task.length != 0) {
      this.task.forEach(element => {
        if (element.taskname == taskname.value) {
          element.route[element.route.length] = { route: (Number(cloudlet.value) + 1) }
          hint = false;
        }
      });
      if (hint) {
        let temp = {
          taskname: taskname.value,
          route: [{ route: (Number(cloudlet.value) + 1) }],
          totalDistance: 0
        }
        this.task.push(temp);
      }
    }
    else {
      let temp = {
        taskname: taskname.value,
        route: [{ route: (Number(cloudlet.value) + 1) }],
        totalDistance: 0
      }
      this.task.push(temp);
    }
    console.log(this.task);

  }



  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  mouse_canvas_click(event) {
    if (this.cloudletposition.length != this.cloudlets) {
      this.ctx.fillStyle = 'red ';
      console.log(event.clientX + event.clientY);
      this.ctx.fillRect(event.clientX - 30, event.clientY - 350, 8, 8);
      this.ctx.fillStyle = 'green';
      this.ctx.fillText("Cloudlet " + (this.cloudletposition.length + 1), event.clientX - 30, event.clientY - 350)

      let temp = {
        x: event.clientX,
        y: event.clientY,
        Cloudlet: this.cloudletposition.length + 1
      }

      this.cloudletposition.push(temp)
    }
    else if (this.cloudletposition.length == this.cloudlets && this.drawed_line) {

      for (var i = 0; i < this.cloudlets; i++) {
        for (var j = 0; j < this.cloudlets; j++) {
          this.ctx.beginPath();       // Start a new path
          console.log(this.cloudletposition[i].x, this.cloudletposition[i].y);  // Draw a line to (150, 100)
          this.ctx.moveTo(this.cloudletposition[i].x - 30, this.cloudletposition[i].y - 350);  // Draw a line to (150, 100)

          this.ctx.lineTo(this.cloudletposition[j].x - 30, this.cloudletposition[j].y - 350);    // Move the pen to (30, 50)
          this.ctx.stroke();
          this.ctx.fillStyle = 'green';
          if (i != j)
            this.ctx.fillText(this.costmatrix[i][j].data, ((this.cloudletposition[i].x - 30 + this.cloudletposition[j].x - 30) / 2 - 10), ((this.cloudletposition[i].y - 350 + this.cloudletposition[j].y - 350) / 2 - 10))

          // this.ctx.putImageData(this.img,event.clientX,event.clienty)
        }
      }
      this.drawed_line = false;
    }
    //  
    console.log(this.cloudletposition)
  }

  findingphenomon() {
    let temp = {};
    let column = [];
    this.phenoMatrix = [];
    for (var i = 0; i < this.cloudlets; i++) {
      column = [];
      for (var j = 0; j < this.cloudlets; j++) {
          temp = {
            data: 0
          }
        column.push(temp);
      }
      this.phenoMatrix.push(column);
      console.log(this.phenoMatrix);
    }


    let hintt = true;
    this.task_distance = [];
    this.task.forEach(element => {
      element.totalDistance = 0;
      for (var i = 0; i < ((element.route.length) - 1); i++) {
        let cl1 = element.route[i].route;
        let cl2 = element.route[i + 1].route;
        element.totalDistance += this.costmatrix[cl1 - 1][cl2 - 1].data;
      }
    });
    this.task.forEach(element => {
      for(var j=0; j < ((element.route.length) - 1); j++){
        let cl1 = element.route[j].route;
        let cl2 = element.route[j + 1].route;
        this.phenoMatrix[cl1-1][cl2-1].data += ((this.costmatrix[cl1 - 1][cl2 - 1].data)/element.totalDistance)
      }
    });
    console.log(this.phenoMatrix);
    console.log(this.task)
  }

  evapuration(){
    this.task.forEach(element => {
      for(var j=0; j < ((element.route.length) - 1); j++){
        let cl1 = element.route[j].route;
        let cl2 = element.route[j + 1].route;
        this.phenoMatrix[cl1-1][cl2-1].data = ((1-0.5)*1)+(this.phenoMatrix[cl1-1][cl2-1].data)
      }
    });
  }

  Probabilitypathfind(newtaskname,cloudlet_2,cloudletto)
  {
      let tem_p=0
      let cl = cloudlet_2.value;

      for(var i = cl; i < this.cloudlets;i++)
      {
         if(i != cl){
            tem_p +=  (this.phenoMatrix[cl][i].data)*(1/(this.costmatrix[cl][i].data))
         }
      }

      this.log += newtaskname.value+" starts with cloudlet "+ (cl+1);

      for(var i = cl; i < this.cloudlets;i++)
      {
         if(i != cl){
            this.log += "______probability to move cloudlet "+(i+1)+"   is = ";
            let p =  (this.phenoMatrix[cl][i].data)*(1/(this.costmatrix[cl][i].data))/tem_p;
            this.log += (p*100)+"%______";
         }
      }

  }

  formulas(){
    this.first_section = true;
    this.second_section = true;
    this.third_section = false;
  }

}
