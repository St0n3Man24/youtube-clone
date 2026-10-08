import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from '../../data';
import moment from "moment";

const Feed = ({category, searchQuery}) => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log(searchQuery);
    let videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    if (searchQuery) {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${searchQuery}&key=${API_KEY}`);
      const searchData = await response.json();
      const ids = searchData.items.map(items => items.id.videoId).join(',');
      videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids}&key=${API_KEY}`;
    }

    await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 800);
    return () => clearTimeout(timer);
  }, [category, searchQuery])

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card" key={item.id}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        )
      })}
    </div>
  );
};

export default Feed;
