import React, { Component, useState, useEffect } from 'react';
import './Article.css';
import { FiEdit, FiSave } from 'react-icons/fi';
import { publishArticle, updateTitle, updateContent, updateReadTime, subcribeAuthor } from '../Service/Service';

class Article extends Component {

  constructor({ article = {}, editMode = false, newMode, setSubmitted = null, subscribed = true, categories = [] }) {
    console.log(article);
    super();
    if (article == {}) {
      article = { 'title': '', 'content': '', 'category': '', 'imageURL': '', 'readTime': '', 'footerContent': '', 'author': '' };
    }
    const user = localStorage.getItem('auth-token');
    if (newMode) {
      article.author = user.username;
    }
    this.state = {
      article: article,
      allowChangeTitle: editMode,
      allowChangeContent: editMode,
      newMode: newMode,
      subscribed: subscribed,
      message: '',
      categories:categories,
      user: user
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.editContent = this.editContent.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeFooterContent = this.changeFooterContent.bind(this);
    this.changeImageURL = this.changeImageURL.bind(this);
    this.changeReadTime = this.changeReadTime.bind(this);
    this.setSubmitted = setSubmitted;
    this.render();
  }

  editTitle(event) {
    this.setState({ allowChangeTitle: true });
  }
  changeTitle(event) {
    event.preventDefault();
    if (this.state.allowChangeTitle) {
      const article = this.state.article;
      article['title'] = event.target.value;
      this.setState({ article });
    }
  }
  saveTitle(event) {
    const id = this.state.article?.id;
    const title = this.state.article?.title;
    const article = { id, title };
    updateTitle(article);
    this.setState({ allowChangeTitle: false });
  }

  editContent(event) {
    this.setState({ allowChangeContent: true });
  }
  changeContent(event) {
    event.preventDefault();
    if (this.state.allowChangeContent) {
      const article = this.state.article;
      article['content'] = event.target.value;
      this.setState({ article });
    }
  }
  saveContent(event) {
    const id = this.state.article?.id;
    const content = this.state.article?.content;
    const article = { id, content };
    updateContent(article);
    this.setState({ allowChangeContent: false });
  }

  changeCategory(event) {
    event.preventDefault();
    const article = this.state.article;
    article['category'] = event.target.value;
    this.setState({ article });
  }
  changeFooterContent(event) {
    event.preventDefault();
    const article = this.state.article;
    article['footerContent'] = event.target.value;
    this.setState({ article });
  }
  changeImageURL(event) {
    event.preventDefault();
    const article = this.state.article;
    article['imageURL'] = event.target.value;
    this.setState({ article });
  }
  changeReadTime(event) {
    event.preventDefault();
    const article = this.state.article;
    article['readTime'] = event.target.value;
    this.setState({ article });
  }
  async subcribe(state) {
    const author = state.article?.author;
    const user = "";
  }

  async saveArticle(state) {
    const article = state.article;
    if (article != {}) {
      let outcome = false;  
      if (state.article != undefined) {
        state.article.author = this.state.user.username;
        outcome = await publishArticle(article);
      }
      if (outcome) {
        this.setSubmitted(true);
      } else {
        this.setState({ message: "Unable to fulfil the request!" });
      }
    }
  }
  render() {
    return (
      <div className='style-wrapper'>
        <div className='main-wrapper'>
          {this.state.newMode && (
            <div className='category-wrapper'>
              <select className='form-category'
                value={this.state.article?.category}
                onChange={this.changeCategory}>
                <option>Please choose one category</option>
                {this.state.categories.map((option, index) => {
                  return <option key={index} >
                    {option}
                  </option>
                })}
              </select>
            </div>)
          }
          {!this.state.newMode && (<div className='author-wrapper'>
            <button className='subscribe-button' disabled={!this.state.subscribed} onClick={() => this.subcribe(this.state)}>
              {this.state.subscribed ? 'Subscribe' : 'Subscribed'}
            </button>
            <label className='author-label'>Author: {this.state.article?.author}</label>
          </div>)
          }
          <div className='title-wrapper'>
            <input type='text'
              className={
                this.state.allowChangeTitle ? 'content-title' : 'content-title content-title-view'
              }
              placeholder='Title'
              value={this.state.article?.title}
              onChange={this.changeTitle} />
            {!this.state.newMode && (this.state.allowChangeTitle
              ? <FiSave className='title-edit-button' onClick={this.saveTitle} />
              : <FiEdit className='title-edit-button' onClick={this.editTitle} />)
            }
          </div>
          <div className='content-wrapper'>
            <textarea
              className={
                this.state.allowChangeContent ? 'content-main' : 'content-main content-main-view'
              }
              placeholder=' Main Content - Enter your body part here'
              value={this.state.article?.content}
              onChange={this.changeContent}
            />
            {!this.state.newMode && (this.state.allowChangeContent
              ? <FiSave className='content-edit-button' onClick={this.saveContent} />
              : <FiEdit className='content-edit-button' onClick={this.editContent} />)
            }
          </div>
          {this.state.newMode && (
            <div>
              <div className='footer-content-wrapper'>
                <textarea
                  className='footer-content-main'
                  placeholder=' Footer Content - ...If you have any summary or instructions, put it here'
                  value={this.state.article?.footerContent}
                  onChange={this.changeFooterContent}
                />
                <input type='text'
                  className='image-url'
                  placeholder='Image URL here - will be displayed first below the title'
                  value={this.state.article?.imageURL}
                  onChange={this.changeImageURL} />
                <input type='text'
                  className='read-time'
                  placeholder='Estimated time for reading (seconds)'
                  value={this.state.article?.readTime}
                  onChange={this.changeReadTime} />
              </div>
              {this.state.message && <label className='error-message'>{this.state.message}</label>}
              <div>
                <div className="clearfix">
                  <button className='publish-button' onClick={() => this.saveArticle(this.state)}>Publish</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    );
  }
}

export default Article;