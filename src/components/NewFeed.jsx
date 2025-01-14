import React, { useState, useEffect } from 'react';
import { loadAllPostsByPageNumberandPageSize } from '../services/post-service';
import { Row, Col, Container } from 'reactstrap';
import Posts from './Posts';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewFeed() {
  const [postContent, setPostContent] = useState({
    Contents: [],
    LastPage: 0,
    PageNumber: 1,  // Start at page 1 (1-based)
    PageSize: 10,   // Default page size
    TotalElements: 0,
    TotalPages: 0
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch paged posts when the page is first loaded or page changes
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  // Handle page change
  const changePage = (pageNumber) => {
    // Skip if the page number exceeds TotalPages (unless TotalPages is 0 or undefined)
    //Note:- postContent.TotalPages is greater than 0 and "pageNumber" is greater than "postContent.TotalPages" then return the function,
    //Note:-if we want this "pageNumber > postContent.TotalPages" condition true and then return,then
    //we will use it with "postContent.TotalPages>0" condition becoz on initial load "TotalPages" will be zero.

    if (postContent.TotalPages > 0 && pageNumber > postContent.TotalPages) {
      return;
    }

    loadAllPostsByPageNumberandPageSize(pageNumber, postContent.PageSize)
      .then((data) => {
        setPostContent((prevState) => ({
          Contents: [...prevState.Contents, ...data.Contents],
          LastPage: data.LastPage,
          PageNumber: data.PageNumber,
          PageSize: data.PageSize,
          TotalElements: data.TotalElements,
          TotalPages: data.TotalPages
        }));
      })
      .catch((error) => {
        toast.error('Error in loading posts pagewise');
      });
  };

  const changePageInfinite = () => {
    // Increment the current page to load the next page of content
    if (currentPage < postContent.TotalPages || postContent.TotalPages === 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h3>Blogs Count ({postContent?.TotalElements})</h3>

          <InfiniteScroll
            dataLength={postContent?.Contents.length}
            next={changePageInfinite}
            hasMore={postContent.PageNumber < postContent.TotalPages || postContent.TotalPages === 0}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postContent?.Contents?.map((post) => (
              <Posts post={post} key={post.Id} />
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
