import { Component } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public addTask(event):void{
      this.todos.push({
         id: this.todos.length+1,
         title: event.target.value,
         isDone: false
      }
      ),
      event.target.value=""
  }

  public currentTodo:null;
  public filterCondition:string="all";

  ngOnInit(){
    this.handleHashChanged();
    window.onhashchange = this.handleHashChanged.bind(this)
  }

  ngDoCheck(){
    window.localStorage.setItem('todos',JSON.stringify(this.todos));
  }

  public todos:{
     id:number,
     title:string,
     isDone:boolean
  }[] = JSON.parse(window.localStorage.getItem("todos") ||'[]')
  get toggleAll():boolean {
    return this.todos.every( item => item.isDone);
  }
  set toggleAll(value) {
     this.todos.forEach(item => item.isDone = value);
  }

  get tempTodo(){
      if (this.filterCondition == 'all'){
          return this.todos;
      }else if (this.filterCondition == 'active'){
          return this.todos.filter(item =>!item.isDone)
      }else if (this.filterCondition == 'completed'){
          return  this.todos.filter(item =>item.isDone)
      }
  }
  removeTask(id:number):void{
     this.todos.splice(id,1)
  }
  handelEscap(event){
    if (event.keyCode==27){
       this.currentTodo = null;
    }
  }
  countUnComplected():number{
    return this.todos.filter( task=>task.isDone ==false).length
  }
  clearComplected():void{
     this.todos = this.todos.filter(item => !item.isDone)
  }

  handleHashChanged(){
    const hash = window.location.hash.substr(1);
       if (hash=='/'){
         this.filterCondition = 'all'
    }else if(hash == '/active'){
          this.filterCondition = 'active'
    }else if (hash == '/completed'){
          this.filterCondition = 'complected'
    }
   }
}

