import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spiner from '../layout/Spiner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({username,getGithubRepos,repos}) => {
    useEffect(()=> {
        getGithubRepos(username)
    },[getGithubRepos,username])
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
          </h2>
          {repos === null ? <Spiner/> : (
              repos.map(repo => (
                <div key={repo.id} className="repo bg-white p-1 my-1">
                    <div>
                        <h4><a href={repo.html_url} target="_blank"
                            rel="noopener noreferrer">{repo.name}</a></h4>
                        <p>
                           {repo.descripion}
                    </p>
                    </div>
                    <div>
                        <ul>
                            <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                              <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                              <li className="badge badge-light">Forks: {repo.forks_count}</li>
                        </ul>
                    </div>
                </div>
              ))
          )}
            
        </div>
    )
}

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired

}
const mapStateToProps = state => ({
repos: state.profile.repos
})

export default connect(mapStateToProps,{getGithubRepos})(ProfileGithub)
