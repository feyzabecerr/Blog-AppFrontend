import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useHttp from '../hooks/use-http';
import { getSinglePost
 } from '../lib.js/api';
 import LoadingSpinner from '../components/UI/LoadingSpinner';
import HighlightedPost from '../components/Post/HighlightedPost';

function PostDetail() {
  const params = useParams()

  const{id} = params; 
  console.log(id)

  const {sendRequest, status, data: loadedPost, error} = useHttp(getSinglePost, true);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if(status === 'pending') {
    return (<div className='centered'>
    <LoadingSpinner/>
          </div>)  
  }

  if(error) {
    return <p className='centered'>{error}</p>
  }

  if(!loadedPost.title) {
    return <p>No quote found</p>;
  }
  return (
    <Fragment>
      <HighlightedPost title={loadedPost.title} description={loadedPost.description}/> 
    </Fragment>
  )
}

export default PostDetail