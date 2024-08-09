import classes from './NoteList.module.css'
import React from "react";


export default class NoteList extends React.Component {
  #title;

  constructor(props) {
    super(props);
    const storedTitle = JSON.parse(localStorage.getItem('title'));
    this.state = {
      title: storedTitle
    };
    this.#title = storedTitle;
  }

  #clearText(text) {
    return text.replace(/[0-9\s]/g, '');
  }

  get title() {
    return `***${this.#title}***`;
  }

  set title(text) {
    this.#title = this.#clearText(text);
    localStorage.setItem('title', this.#title);
    this.setState({ title: this.#title });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
      this.title = this.props.title; 
    }
  }

  render() {
    return (
      <div className={classes.notesListHolder}>
        <h2>{this.title}</h2>
        <ul>{this.props.children}</ul>
      </div>
    );
  }
}
