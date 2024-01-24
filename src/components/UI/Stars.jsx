import React from 'react';

const Stars = ({total_rating}) => {

  let stars;
  if(parseInt(total_rating)<=20){
    stars=(
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
    )
  }else if(parseInt(total_rating)<=40){
    stars=(
      <>
      <span>
        <i className="ri-star-s-fill"></i>
      </span>
      <span>
        <i className="ri-star-s-fill"></i>
      </span>
      </>
    )
  }else if(parseInt(total_rating)<=60){
    stars=(<>
      <span>
          <i className="ri-star-s-fill"></i>
            </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
    </>)
  }else if(parseInt(total_rating)<=80){
    stars=(<>
      <span>
          <i className="ri-star-s-fill"></i>
        </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
    </>)
  }else if(parseInt(total_rating)>=100){
    stars=(<>
      <span>
        <i className="ri-star-s-fill"></i>
      </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
      <span>
          <i className="ri-star-s-fill"></i>
      </span>
    </>)
  }else{
    stars=null
  }
  return (
    <div>
      {stars}
    </div>
  );
}

export default Stars;
