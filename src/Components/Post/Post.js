import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updatePosts} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }
    componentDidMount = () => {
        if (!this.props.username) {
            this.props.history.push('/');
        } else {
            const {postid} = this.props.match.params;
            axios.get(`/api/posts/${postid}`)
            .then(res => {
                this.setState(res.data)
            })
        }
    }
    deletePost = (id) => {
        axios.delete(`api/posts/${id}`)
        .then(res => {
            this.props.updatePosts(res.data)
        })
    }
    render() {
        const {id, title, img, content, username, profile_pic, author_id} = this.state;
        return (
            <div id='post'>
                <section className='single-post'>
                    <div className='post-sections'>
                        <h1>{title}</h1>
                        <img alt='' className='post-image' src={img} />
                    </div>
                    <div className='post-sections profile-section'>
                        <img alt='' className='author-profile' src={profile_pic} />
                        <p>{username}</p>
                        <p>{content}</p>
                        {author_id === this.props.id ? <Link to='/dashboard'><button onClick={() => this.deletePost(id)}>Delete</button></Link> : null}
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = reduxStore => reduxStore;
export default connect(mapStateToProps, {updatePosts})(Post);