import { Col,Card, Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./AdminCakes.css"
const { Meta } = Card;

const CakeCardAdmin = ({ cake, onEdit, onDelete }) => {
  const handleEdit=()=>{
    onEdit(cake)
  }
  const handleDelete = () => {
    onDelete(cake._id);
  };

  return (
    <Col xs={24} md={8} lg={6}>
      <Card className="cake-card-admin"
        cover={
          <div className="cake-card-image-container">
            <img alt={cake.name} src={cake.image} className="cake-card-image" />
          </div>
        }
        actions={[
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={handleEdit}
          >
            Modifica
          </Button>,
          <Popconfirm
            title="Eliminare questa torta?"
            description="Questa azione non può essere annullata"
            onConfirm={handleDelete}
            okText="Sì, elimina"
            cancelText="Annulla"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Elimina
            </Button>
          </Popconfirm>,
        ]}
      >
        <Meta
          title={
            <div className="cake-card-title">
              <p>{cake.name}</p>
              <small >{cake.category}</small>
            </div>
          }
          description={
            <div className="cake-card-description">
              <p className="cake-description-text">{cake.description}</p>
              <div className="cake-card-details">
                <p>
                  <strong>Prezzo:</strong> €{cake.price.toFixed(2)}
                </p>
                <p>
                  <strong>Porzioni:</strong> {cake.cakeServings}
                </p>
                {cake.ingredients && cake.ingredients.length > 0 && (
                  <p>
                    <strong>Ingredienti:</strong>
                    {cake.ingredients.slice(0, 3).join(", ")}
                    {cake.ingredients.length > 3 && "..."}
                  </p>
                )}
              </div>
            </div>
          }
        />
      </Card>
    </Col>
  );
};

export default CakeCardAdmin;
