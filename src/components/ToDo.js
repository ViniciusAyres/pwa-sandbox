import React from "react";
import ToDoTitle from "./ToDoTitle";
import ToDoInput from "./ToDoInput";
import TaskList from "./TaskList";
import * as localForage from "localforage";

const DB_NAME = "ToDoList";

class ToDo extends React.Component {
  state = {
    addTaskText: "",
    taskList: []
  };

  componentWillMount() {
    localForage
      .getItem(DB_NAME)
      .then(value => {
        console.log('Recuperei a lista do DB ', value);
        this.setState({
          taskList: value
        });
      })
      .catch(() => {
        console.log("Ferrou");
      });
  }

  completeTask(taskIndex) {
    const localTaskList = this.state.taskList;

    localTaskList[taskIndex].completed = true;

    this.setState({
      taskList: localTaskList
    }, this.updateDatabase);
  }

  removeTask(taskIndex) {
    const localTaskList = this.state.taskList;

    this.setState({
      taskList: localTaskList.filter((el, index) => index !== taskIndex)
    }, this.updateDatabase);
  }

  changeText(taskText) {
    this.setState({ addTaskText: taskText });
  }
  
  addTask() {
    if (this.state.addTaskText !== "") {
      const newTask = {
        text: this.state.addTaskText,
        completed: false
      };
      const newTaskList = this.state.taskList.concat(newTask);
      
      this.setState({
        addTaskText: "",
        taskList: newTaskList
      }, this.updateDatabase);
    }
  }

  updateDatabase(){
    const persistentTaskList = this.state.taskList;
    
    localForage.setItem(DB_NAME, persistentTaskList).then(value => {
      console.log(`Consegui persistir`, value);
    }).catch(error => {
      console.log(`Não consegui persistir`, error);
    })
  }
  
  render() {
    return (
      <section className="section">
        <div className="container container-todo">
          <ToDoTitle />
          <div className="todo-wrapper">
            <ToDoInput
              value={this.state.addTaskText}
              onChangeText={text => this.changeText(text)}
              onAddTask={() => this.addTask()}
            />
            <TaskList
              taskList={this.state.taskList}
              onCompleteTask={index => this.completeTask(index)}
              onRemoveTask={index => this.removeTask(index)}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default ToDo;
