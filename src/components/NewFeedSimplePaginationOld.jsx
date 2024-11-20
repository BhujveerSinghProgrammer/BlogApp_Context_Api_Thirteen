import React, { useState, useEffect } from 'react';
import { loadAllPostsByPageNumberandPageSize } from '../services/post-service';
import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap';
import Posts from './Posts';
import { toast } from 'react-toastify';

function NewFeedSimplePaginationOld() {
  const [postContent, setPostContent] = useState({
    Contents: [],
    LastPage: 0,
    PageNumber: 1,  // Start at page 1 (1-based)
    PageSize: 3,   // Default page size
    TotalElements: 0,
    TotalPages: 0
  });
   
  // Fetch paged posts when the page is first loaded
  useEffect(() => {
    loadAllPostsByPageNumberandPageSize(postContent.PageNumber, postContent.PageSize)
      .then((data) => {
        setPostContent(data);
         console.log(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error in Loading Posts');
      });
  }, []); // Only runs on component mount

  // Handle page change
  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > postContent.TotalPages) return; // Do nothing if out of bounds

    loadAllPostsByPageNumberandPageSize(pageNumber, postContent.PageSize)
      .then((data) => {
        setPostContent(data);  // Update with new page data
        window.scroll(0,0); /// to up the scroll
      })
      .catch((error) => {
        toast.error('Error in Loading Posts Pagewise');
      });
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h3>Blogs Count ({postContent?.TotalElements})</h3>

          {postContent?.Contents?.map((post) => (
            
            <Posts post={post} key={post.Id} />
          ))}



          {/* Pagination component */}
          <Container className="text-center mt-0">
            <Pagination size='sm' >
              {/* Previous button */}
              <PaginationItem disabled={postContent.PageNumber === 1}>
                <PaginationLink previous onClick={() => changePage(postContent.PageNumber - 1)} >
                  Previous
                </PaginationLink>
              </PaginationItem>

              {/* Page number buttons */}
              {[...Array(postContent.TotalPages)].map((_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => changePage(index + 1)}  // Page numbers should be 1-based
                  active={index + 1 === postContent.PageNumber}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              {/* Next button */}
              <PaginationItem disabled={postContent.PageNumber === postContent.TotalPages}>
                <PaginationLink next onClick={() => changePage(postContent.PageNumber + 1)}>
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>



        </Col>
      </Row>
    </div>
  );
}

export default NewFeedSimplePaginationOld;
