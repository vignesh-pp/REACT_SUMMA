import React from "react";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

const tasks = [
  { _id: 1, title: "First Task", status: "backlog" },
  { _id: 2, title: "Second Task", status: "backlog" },
  { _id: 3, title: "Third Task", status: "backlog" },
  { _id: 4, title: "Fourth Task", status: "new" },
  { _id: 5, title: "Fifth Task", status: "new" },
  { _id: 6, title: "Sixth Task", status: "going" },
  { _id: 7, title: "Seventh Task", status: "review" },
  { _id: 8, title: "Eighth Task", status: "review" },
  { _id: 9, title: "Ninth Task", status: "done" },
  { _id: 10, title: "Tenth Task", status: "done" },
];

const labels = ["backlog", "new", "going", "review", "done"];
const labelsMap = {
  backlog: "Backlog",
  new: "To Do",
  going: "In Progress",
  review: "Review",
  done: "Done",
};

const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "10px 1px 0 1px",
    backgroundColor: "whitesmoke",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    marginTop: "10px",
    backgroundColor: "gray",
    color: "white",
  },
  item: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
  },
};

class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks,
      text: "",
      modelOpen: false,
    };
  }
  update = (id, status) => {
    const { tasks, text } = this.state;
    const task = tasks.find((task) => task._id === id);
    // console.log("task", task);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task },
    });
    console.log("newTask", newTasks);
    this.setState({ tasks: newTasks });
  };
  addNewTask = () => {
    const { tasks, text } = this.state;
    if (text !== "") {
      const newTask = {
        _id: tasks.length + 1, // Assign a unique ID to the new task
        title: `${text} - ${tasks.length + 1}`,
        status: "backlog", // Set the initial status here
      };

      this.setState({
        tasks: [...tasks, newTask],
      });
    } else {
      alert("fill");
    }
  };

  render() {
    const { tasks } = this.state;
    return (
      <main>
        <header className="header" style={{ padding: "30px" }}>
          Create New Task {"      "}
          <input
            style={{ height: "35px" }}
            type="text"
            value={this.state.text}
            onChange={(e) => {
              this.setState({ text: e.target.value });
            }}
          />
          <button
            style={{
              width: "100px",
              height: "35px",
              background: "gray",
              outline: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: "30px",
            }}
            onClick={this.addNewTask}
          >
            Add
          </button>
        </header>

        <section style={classes.board}>
          {labels.map((channel) => (
            <KanbanColumn status={channel}>
              <div style={classes.column}>
                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {tasks
                    .filter((item) => item.status === channel)
                    .map((item) => (
                      <KanbanItem id={item._id} onDrop={this.update}>
                        <div style={classes.item}>{item.title}</div>
                      </KanbanItem>
                    ))}
                </div>
              </div>
            </KanbanColumn>
          ))}
        </section>
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(Kanban);

// Column

const boxTarget = {
  drop(props) {
    return { name: props.status };
  },
};

class KanbanColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

KanbanColumn = DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(KanbanColumn);

// Item

const boxSource = {
  beginDrag(props) {
    return {
      name: props.id,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(monitor.getItem().name, dropResult.name);
    }
  },
};

class KanbanItem extends React.Component {
  render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

KanbanItem = DragSource("kanbanItem", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(KanbanItem);
