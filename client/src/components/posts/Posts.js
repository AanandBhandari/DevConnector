import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spiner from '../layout/Spiner';
import PostItem from './PostItem';

const Posts = ({getPosts,post:{posts, loading}}) => {
    useEffect(()=> {
        getPosts()
    },[getPosts]);
    return loading ? <Spiner/> : (
        <Fragment>
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
            {/* Post form */}
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        required
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
            {/* posts */}
            <div className="posts">
                {posts.map(post=> (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>

        </Fragment>
    )
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}

const mapStateToProps =state => ({
    post: state.post
})

export default connect(mapStateToProps,{getPosts})(Posts)
