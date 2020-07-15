import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            img: '',
            content: ''
        }
        this.updateImg = this.updateImg.bind(this);
        this.createPost = this.createPost.bind(this);
    }
    componentDidMount() {
        if(!this.props.username) {
            this.props.history.push('/');
        }
    }

    handleInput(val, type) {
        this.setState({[type]: val});
    }

    createPost() {
        const {title, img, content} = this.state;
        axios.post(`/api/posts`, {title, img, content})
        .then(res => {
            this.props.history.push('/dashboard');
        })
    }
    updateImg(target) {
        target.src = 'https://png.pngitem.com/pimgs/s/338-3381120_no-camera-sign-transparent-background-hd-png-download.png';
    }
    render() {
        const {title, img, content} = this.state;
        return (
            <div id='form'>
                <section className='form-container'>
                    <h1>New Post</h1>
                    <p>Title:</p>
                    <input className='input' onChange={(e) => this.handleInput(e.target.value, 'title')} value={title} />
                    <img className='form-img' onError={(e) => this.updateImg(e.target)} src={img} alt='' />
                    <p>Image URL:</p>
                    <input className='input' onChange={(e) => this.handleInput(e.target.value, 'img')} value={img} />
                    <p>Content:</p>
                    <textarea className='input' onChange={(e) => this.handleInput(e.target.value, 'content')} value={content}/>
                    <button className='reset-button new-post-button' onClick={this.createPost}>Post</button>
                </section>
            </div>
        )
    }
}
const mapStateToProps = reduxStore => reduxStore;
export default connect(mapStateToProps)(Form);