import React, {Component} from 'react';
import Search from '../../assets/search.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            checkMyPost: true,
            posts: []
        }
        this.resetPosts = this.resetPosts.bind(this);
    }

    componentDidMount() {
        if (!this.props.username) {
            this.props.history.push('/')
        } else {
            this.searchPosts();
        }
    }

    resetPosts = () => {
        axios.get(`/api/posts?userposts=${this.state.checkMyPost}&search=${''}`)
        .then(res => this.setState({posts:res.data, searchInput:''}))
        .catch(err => console.log(err));
    }

    searchPosts = () => {
        axios.get(`/api/posts?userposts=${this.state.checkMyPost}&search=${this.state.searchInput}`)
        .then(res => this.setState({posts:res.data}))
        .catch(err => console.log(err));
    }

    handleInput = (val, type) => {
        this.setState({[type]: val})
        this.searchPosts()
    }

    render() {
        const {searchInput, checkMyPost, posts} = this.state;
        const mappedPosts = posts.map(post => (<Link key={post.id} className='post-container' to={`post/${post.id}`}><h1>{post.title}</h1><div><p>by {post.username}</p><div className='author-profile'><img alt='' src={post.profile_pic} /></div></div></Link>))
        return (
            <div id='dashboard'>
                <section className='search-container'>
                    <div className="cont">
                        <input value={searchInput} onChange={(e) => this.handleInput(e.target.value, 'searchInput')} placeholder="Search by Title" className='search-input' />
                        <button onClick={this.searchPosts} className='search-button'><img alt='' src={Search} /></button>
                        <button onClick={this.resetPosts} className='reset-button'>Reset</button>
                    </div>
                    <div className='cont'>
                        <p>My Posts:</p>
                        <input checked={checkMyPost} onChange={(e) => this.handleInput(e.target.checked, 'checkMyPost') } type='checkbox' />
                    </div>
                </section>
                <section className='search-posts'>
                    {mappedPosts}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;
export default connect(mapStateToProps)(Dashboard);