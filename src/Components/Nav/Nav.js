import React, {Component} from 'react';
import House from '../../assets/house.png'
import FormLogo from '../../assets/form.png'
import Logout from '../../assets/logout.png'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, clearRedux} from '../../ducks/reducer';
import axios from 'axios';
class Nav extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.logMeIn();
    }

    logMeIn = () => {
        axios.get('/auth/me')
        .then(res => {
            this.props.getUser(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    logout = () => {
        axios.get('/auth/logout')
        .then(res => {
            this.props.clearRedux();
        }).catch(err => console.log(err))
    }
    render() {
        const {location, profile, username} = this.props;
        return (
            <div id='nav'>
                {location.pathname !== '/' ? (

                    <nav className='nav'>
                        <div className='links'>
                            <div className='profile'><img alt='' src={profile}/></div>
                            <p className='profile-username'>{username}</p>
                            <Link to='/dashboard'><img alt='' className='dashboard-logo' src={House}/></Link>
                            <Link to='/new'><img alt='' className='dashboard-logo' src={FormLogo}/></Link>
                        </div>
                        <Link id='logout' to='/'><img alt='' onClick={this.logout} className='dashboard-logo' src={Logout}/></Link>
                    </nav>

                ) : null}
            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, clearRedux})(Nav);