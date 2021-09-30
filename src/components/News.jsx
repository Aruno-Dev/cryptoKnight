import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

import demoImage from "../images/cryptos1.jpg";
import demoImage2 from "../images/cryptoAvatar.jpg";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptosList?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <Text type="secondary">
                {news.description > 100
                  ? `${news.description.substring(0, 100)} ...`
                  : news.description}
              </Text>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage2
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text italic type="danger">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
// import { Typography, Space } from 'antd';

// const { Text, Link } = Typography;

// ReactDOM.render(
//   <Space direction="vertical">
//     <Text>Ant Design (default)</Text>
//     <Text type="secondary">Ant Design (secondary)</Text>
//     <Text type="success">Ant Design (success)</Text>
//     <Text type="warning">Ant Design (warning)</Text>
//     <Text type="danger">Ant Design (danger)</Text>
//     <Text disabled>Ant Design (disabled)</Text>
//     <Text mark>Ant Design (mark)</Text>
//     <Text code>Ant Design (code)</Text>
//     <Text keyboard>Ant Design (keyboard)</Text>
//     <Text underline>Ant Design (underline)</Text>
//     <Text delete>Ant Design (delete)</Text>
//     <Text strong>Ant Design (strong)</Text>
//     <Text italic>Ant Design (italic)</Text>
//     <Link href="https://ant.design" target="_blank">
//       Ant Design (Link)
//     </Link>
//   </Space>,
//   mountNode,
// );

export default News;
