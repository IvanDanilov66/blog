/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import {Article as ArticleType} from 'types/blogs';
import Slider from 'react-slick';
import Article from './Article';
import './RecentlyPosted.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArticlesProps {
  articles: ArticleType[];
}

const RecentlyPosted: FC<ArticlesProps> = ({articles}) => {
  const settings = {
    dots: true,
    infinite: false,
    draggable: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="RecentlyPosted">
      <div className="RecentlyPosted__content-container">
        <h3 className="RecentlyPosted__header">Recently Posted</h3>
        <div className="RecentlyPosted__article">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <div className="RecentlyPosted__slider-container">
            <Slider {...settings}>
              {articles.map((article) => (
                <Article key={article.title} article={article} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyPosted;
