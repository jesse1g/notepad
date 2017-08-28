import React, { Component } from 'react';
import './App.css';
import { Modal, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

// components
import InputText from './components/input_text';
import InputTextarea from './components/input_textarea';
import MarkDown from './components/markdown';
import TopBar from './components/topbar';
import Footer from './components/footer';
import NoteText from './components/note_text';

// redux action/reducer
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNote, getNotes, createNote, updateNote, deleteNote, resetNote } from './actions/action_notes';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showError: false,
      note_new: false,
      show_markdown: false
    };

    // fetch list of notes when the page loads
    this.props.getNotes(1,10,'DESC');

    // bind functions
    this.list_notes = this.list_notes.bind(this);
    this.close_modal = this.close_modal.bind(this);
    this.open_modal = this.open_modal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.new_note = this.new_note.bind(this);
    this.edit_note = this.edit_note.bind(this);
    this.delete_note = this.delete_note.bind(this);
    this.view_markdown = this.view_markdown.bind(this);
    this.close_error = this.close_error.bind(this);
    this.open_error = this.open_error.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.props.resetNote();
    this.close_modal();
    this.props.getNotes(1,10,'DESC');
  }

  close_error() {
    this.setState({ showError: false });
  }

  open_error() {
    this.setState({ showError: true });
  }

  // show/hide markdown preview section
  view_markdown() {
    this.setState({show_markdown: true});
  }

  // invoke deleteNote action to the dispatch
  delete_note() {
    if (this.props.note_viewing.id !== '') {
      this.props.deleteNote(this.props.note_viewing.id, () => this.reset());
    }
  }

  // open modal and fill out the form for existing note
  edit_note() {
    this.setState({note_new: false, showModal: true});
    this.props.change('name', this.props.note_viewing.name);
    this.props.change('content', this.props.note_viewing.content);
  }

  // open modal and clear the form to add new notes
  new_note() {
    this.setState({note_new: true, showModal: true});
    this.props.change('name', '');
    this.props.change('content', '');
  }

  // submit function for create/edit new note
  onSubmit(data) {
    if (!this.state.note_new && this.props.note_viewing.id !== '') {
      this.props.updateNote(this.props.note_viewing.id, data, () => this.reset(), () => this.open_error());
    } else {
      this.props.createNote(data, () => this.reset(), () => this.open_error());
    }
  }

  // helper functions used to open and close modal
  close_modal() {
    this.setState({ showModal: false });
  }

  open_modal() {
    this.setState({ showModal: true });
  }

  // helper function to create a list of notes
  list_notes() {
    const notes = this.props.all_notes.map((e) => {
      return (
        <li key={e.id} className={(this.props.note_viewing.id === e.id) ? 'active' : ''}>
          <Link to="#" 
            onClick={() => {
              this.props.getNote(e.id);
              this.setState({show_markdown: false});
            }}>
            {e.name}
          </Link>
        </li>
      );
    });
    return (
      <ul className="nav nav-pills nav-stacked">
        {notes}
      </ul>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="App fade-in">
        <TopBar name='Notepad' />
        {/* main body content */}
        <div className="container-fluid text-center">    
          <div className="row content">
            {/* side navbar */}
            <div className="col-sm-2 sidenav">
              <div className="sidenav-header">
                <h2>Notes</h2>
              </div>
              {this.list_notes()}
            </div>
            {/* main panel to show notes */}
            <div className="col-sm-8 text-left note-view"> 
              <div className="well">
                <h2>{this.props.note_viewing.name}</h2>
                <NoteText notes={this.props.note_viewing.content} />
                <hr />
                <MarkDown show={this.state.show_markdown} text={this.props.note_viewing.content} />
                <hr />
                <div className="notes-buttons">
                  <Button className="note-btns" onClick={this.new_note}><i className="fa fa-plus" aria-hidden="true" /></Button>
                  <Button className="note-btns" disabled={this.props.note_viewing.id === ''} onClick={this.edit_note}><i className="fa fa-pencil" aria-hidden="true" /></Button>
                  <Button className="note-btns" disabled={this.props.note_viewing.id === ''} onClick={this.delete_note}><i className="fa fa-trash-o" aria-hidden="true" /></Button>
                  <Button className="note-btns" disabled={this.props.note_viewing.id === ''} onClick={this.view_markdown}>Markdown Preview</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* modal pop-up form for creating/editing note */}
        <Modal show={this.state.showModal} onHide={this.close_modal}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Modal.Header>
              <Modal.Title>{this.state.note_new ? 'Create New Note' : 'Edit Note'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Field
                name="name"
                label="Title"
                component={InputText}
              />
              <Field
                name="content"
                label="Content"
                component={InputTextarea}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="success" type="submit">Submit</Button>
              <Button bsStyle="danger" onClick={this.close_modal}>Close</Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* error popup */}
        <Modal show={this.state.showError} onHide={this.close_error}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.error}
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.close_error}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Footer text='Notepad made by Jesse G.' />
      </div>
    );
  }
}

// connects redux actions/reducers
function mapStateToProps(state) {
  return {
    all_notes : state.note_data.notes,
    note_viewing : state.note_data.note_viewing,
    error: state.note_data.error
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getNote, getNotes, createNote, updateNote, deleteNote, resetNote }, dispatch);
}

export default withRouter(reduxForm({
  form: 'NoteForm'
})(connect(mapStateToProps, mapDispatchToProps)(App)));