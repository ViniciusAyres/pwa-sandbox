import React from "react";
import ToDoTitle from "./ToDoTitle";
import ToDoInput from "./ToDoInput";
import TaskList from "./TaskList";

class ToDo extends React.Component {
  state = {
    addTaskText: "",
    taskList: []
  };

  completeTask(taskIndex) {
    const localTaskList = this.state.taskList;

    localTaskList[taskIndex].completed = true;

    this.setState({
      taskList: localTaskList
    });
  }

  removeTask(taskIndex) {
    const localTaskList = this.state.taskList;

    this.setState({
      taskList: localTaskList.filter((el, index) => index !== taskIndex)
    });
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
      });
    }
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
