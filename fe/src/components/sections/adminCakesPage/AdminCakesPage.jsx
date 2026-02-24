import { useState, useEffect } from "react";
import { Button, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CakesList from "./CakeListAdmin";
import CakeModal from "./CakeModalAdmin";
import useCakes from "../../../hook/useCake";
import "./adminCakes.css";

const AdminCakes = () => {
  const { message } = App.useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const { cakes, loading, fetchCakes, createCake, updateCake, deleteCake } =
    useCakes();

  useEffect(() => {
    const loadCakes = async () => {
      try {
        await fetchCakes();
      } catch (error) {
        console.log("Error loading cakes:", error);
      }
    };
    loadCakes();
  }, []);

  const handleAddCake = () => {
    setEditingCake(null);
    setModalVisible(true);
  };

  const handleEditCake = (cake) => {
    setEditingCake(cake);
    setModalVisible(true);
  };

  const handleDeleteCake = async (cakeId) => {
    try {
      await deleteCake(cakeId);
      message.success("Torta eliminata con successo");
    } catch (error) {
      message.error(error.message || "Errore nell'eliminazione della torta");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingCake) {
        await updateCake(editingCake._id, values);
        message.success("Torta modificata con successo");
      } else {
        await createCake(values);
        message.success("Torta creata con successo");
      }
      setModalVisible(false);
      setEditingCake(null);
    } catch (error) {
      message.error(
        error.message ||
          (editingCake
            ? "Errore nella modifica della torta"
            : "Errore nella creazione della torta"),
      );
    }
  };

  return (
    <section className="admin-cakes-section">
      <div className="admin-cakes-header">
        <h1>Gestione Torte</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAddCake}
        >
          Aggiungi Nuova Torta
        </Button>
      </div>

      <CakesList
        cakes={cakes}
        loading={loading}
        onEdit={handleEditCake}
        onDelete={handleDeleteCake}
      />

      <CakeModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingCake(null);
        }}
        onSubmit={handleSubmit}
        cake={editingCake}
      />
    </section>
  );
};

export default AdminCakes;
