import React from 'react';
import PaginationLogic from './../PaginationLogic'

var page = parseInt("1");

const Pagination = ({ postsPerPage, totalPosts, posts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="text-center" style={{backgroundColor : "#FFFFFF", border: "none"}}>
      {/* maybe remove the parent element here to get rid of the box */}
      <ul >
          {/* can add class = "pagination for ul" */}
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <a onClick={() => {page = parseInt(number); paginate(number)}} href="javascript:void()" className='page-link' >  
            {/* can add # in href to stop page refresh thing and it should have been !# but that just takes to homepage */}
              {number} 
            </a>
          </li>
        ))}
      </ul>
      <h6 style={{paddingTop: "40px"}}> Current Page: {page}</h6>
    </nav>

    // <div>
    
    // <PaginationLogic items={posts} onChangePage={paginate}/>

    // </div>
  );
};

export default Pagination;