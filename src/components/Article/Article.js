import React, { Component } from 'react';
import './Article.css';
import { FiEdit, FiSave } from 'react-icons/fi';

class Article extends Component {

  constructor({ article, editMode }) {
    console.log(article);
    super();
    this.state = {
      article: article,
      allowChangeTitle: editMode,
      allowChangeContent: editMode
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.editContent = this.editContent.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  editTitle(event) {
    this.setState({ allowChangeTitle: true });
  }
  changeTitle(event) {
    event.preventDefault();
    if (this.state.allowChangeTitle) {
      this.setState({ article: { title: event.target.value } });
    }
  }
  saveTitle(event) {
    this.setState({ allowChangeTitle: false });
  }
  editContent(event) {
    this.setState({ allowChangeContent: true });
  }
  changeContent(event) {
    event.preventDefault();
    if (this.state.allowChangeContent) {
      this.setState({ article: { content: event.target.value } });
    }
  }
  saveContent(event) {
    this.setState({ allowChangeContent: false });
  }

  render() {
    return (
      <div className='style-wrapper'>
        <div className='main-wrapper'>
          <div className='title-wrapper'>
            <input type='text'
              className={
                this.state.allowChangeTitle ? 'content-title' : 'content-title content-title-view'
              }
              value={this.state.article?.title}
              onChange={this.changeTitle} />
            {this.state.allowChangeTitle
              ? <FiSave className='title-edit-button' onClick={this.saveTitle} />
              : <FiEdit className='title-edit-button' onClick={this.editTitle} />
            }
          </div>
          <div className='content-wrapper'>
            <textarea
              className={
                this.state.allowChangeContent ? 'content-main' : 'content-main content-main-view'
              }
              value={this.state.article?.content}
              onChange={this.changeContent}
            />
            {this.state.allowChangeContent
              ? <FiSave className='content-edit-button' onClick={this.saveContent} />
              : <FiEdit className='content-edit-button' onClick={this.editContent} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Article;