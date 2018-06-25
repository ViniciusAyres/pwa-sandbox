import React from "react";
import Task from "./Task";

const TaskList = function(props) {
  const renderedTasks = props.taskList.map((task, index) => (
    <Task
      taskData={task}
      key={index}
      onCompleteTask={props.onCompleteTask}
      index={index}
      onRemoveTask={props.onRemoveTask}
    />
  ));

  return <div>{renderedTasks}</div>;
};

export default TaskList;
