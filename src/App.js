import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import axios from "axios";

const { Meta } = Card;
const url = "https://warm-shore-85713.herokuapp.com/characters";

const App = () => {
  const [dataAPI, setDataAPI] = useState([]);

  const peticionGet = async () => {
    await axios.get(url).then((response) => {
      const resultado = response.data;
      const heroes = resultado.map((item) => {
        const id = item.ref["@ref"].id;
        return {
          ...item.data,
          id: id,
        };
      });
      setDataAPI(heroes);
      console.log(heroes);
    });
  };

  useEffect(async () => {
    await peticionGet();
  }, []);
  return (
    <div className="container">
      <Row gutter={[16, 16]}>
        {dataAPI.map((item, index) => (
          <Col key={index} span={6}>
            <Card
              hoverable
              actions={[
                <Button key="editar">
                  <DeleteOutlined key="eliminar" />
                </Button>,
                <Button key="editar">
                  <EditOutlined />
                </Button>,
              ]}
              cover={<img alt={item.name} height="250px" src={item.imageURL} />}
            >
              <Meta title={item.name} description={item.game} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default App;
