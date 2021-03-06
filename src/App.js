import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Modal, Input, Typography, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;
const { Text } = Typography;
const url = "https://warm-shore-85713.herokuapp.com/characters";

const App = () => {
  const [dataAPI, setDataAPI] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalVerHeroe, setModalVerHeroe] = useState(false);
  const [heroeSeleccionado, setHeroeSeleccionado] = useState({
    name: "",
    game: "",
    gender: "",
    kind: "",
    createdBy: "",
    imageURL: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setHeroeSeleccionado((prevState) => ({
      ...prevState,
      [id]: [value],
    }));
  };

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
    });
  };

  const peticionPost = async () => {
    await axios.post(url, heroeSeleccionado).then((response) => {
      const resultado = response.data;

      const heroeAux = {
        ...resultado.data,
        id: resultado.ref["@ref"].id,
      };
      console.log(resultado);
      setDataAPI(dataAPI.concat(heroeAux));
      abrirCerrarModalInsertar();
    });
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalVerHeroe = () => {
    setModalVerHeroe(!modalVerHeroe);
  };

  const seleccionarHeroe = (heroe) => {
    setHeroeSeleccionado(heroe);
    abrirCerrarModalVerHeroe();
  };

  useEffect(async () => {
    await peticionGet();
  }, []);
  return (
    <div className="container">
      <Button type="primary" onClick={abrirCerrarModalInsertar}>
        Crear Héroe
      </Button>
      <br />
      <br />
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
              cover={
                <img
                  alt={item.name}
                  height="250px"
                  src={item.imageURL}
                  onClick={() => seleccionarHeroe(item)}
                />
              }
            >
              <Meta title={item.name} description={item.game} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        centered
        title="Crear Héroe"
        onCancel={abrirCerrarModalInsertar}
        onOk={peticionPost}
        visible={modalInsertar}
        cancelText="Cancelar"
        okText="Crear"
      >
        <Input
          id="name"
          placeholder="Nombre del héreo"
          onChange={handleChange}
        />
        <Input
          id="game"
          placeholder="Nombre del juego"
          onChange={handleChange}
        />
        <Input
          id="gender"
          placeholder="Género del héroe"
          onChange={handleChange}
        />
        <Input id="kind" placeholder="Clase de héroe" onChange={handleChange} />
        <Input
          id="createdBy"
          placeholder="Creador del juego"
          onChange={handleChange}
        />
        <Input
          id="imageURL"
          placeholder="URL correspondiente a la imágen del héreo"
          onChange={handleChange}
        />
        <Input
          id="description"
          placeholder="Descripción del héreo"
          onChange={handleChange}
        />
      </Modal>

      <Modal
        centered
        title="Ver Héroe"
        onCancel={abrirCerrarModalVerHeroe}
        visible={modalVerHeroe}
        footer={null}
      >
        <Space direction="vertical">
          <img
            alt={heroeSeleccionado.name}
            height="250px"
            src={heroeSeleccionado.imageURL}
          />
          <div>
            <Text>Nombre: </Text> <Text strong>{heroeSeleccionado.name}</Text>
          </div>
          <div>
            <Text>Juego: </Text> <Text strong>{heroeSeleccionado.game}</Text>
          </div>
          <div>
            <Text>Género: </Text> <Text strong>{heroeSeleccionado.gender}</Text>
          </div>
          <div>
            <Text>Clase: </Text> <Text strong>{heroeSeleccionado.kind}</Text>
          </div>
          <div>
            <Text>Creado por: </Text>{" "}
            <Text strong>{heroeSeleccionado.createdBy}</Text>
          </div>
          <div>
            <Text>Descripción: </Text>{" "}
            <Text strong>{heroeSeleccionado.description}</Text>
          </div>
        </Space>
      </Modal>
    </div>
  );
};

export default App;
