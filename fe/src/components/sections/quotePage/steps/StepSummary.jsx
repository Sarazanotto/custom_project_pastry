import { Descriptions, Tag } from 'antd';
import dayjs from 'dayjs';

const StepSummary = ({ data }) => {
  return (
    <div>
      <h3>Riepilogo Richiesta</h3>
      
      <Descriptions bordered column={1} style={{ marginTop: 20 }}>
        <Descriptions.Item label="Evento">
          <Tag color="blue">{data.event}</Tag>
        </Descriptions.Item>
        
        <Descriptions.Item label="Numero Persone">
          {data.serving}
        </Descriptions.Item>
        
        <Descriptions.Item label="Data Consegna">
          {data.deliveryData ? dayjs(data.deliveryData).format('DD/MM/YYYY') : '-'}
        </Descriptions.Item>
        
        <Descriptions.Item label="Forma">
          {data.form}
        </Descriptions.Item>
        
        <Descriptions.Item label="Base">
          {data.cakeBase}
        </Descriptions.Item>
        
        <Descriptions.Item label="Bagna">
          {data.cakeSoak}
        </Descriptions.Item>
        
        <Descriptions.Item label="Crema">
          {data.cakeCream}
        </Descriptions.Item>
        
        <Descriptions.Item label="Topping">
          {data.cakeTopping}
        </Descriptions.Item>
        
        {data.cakeLettering && (
          <Descriptions.Item label="Scritta">
            {data.cakeLettering}
          </Descriptions.Item>
        )}
        
        {data.cakeDecoration && (
          <Descriptions.Item label="Decorazioni">
            {data.cakeDecoration}
          </Descriptions.Item>
        )}
        
        {data.allergies && (
          <Descriptions.Item label="Allergie">
            {data.allergies}
          </Descriptions.Item>
        )}
        
        {data.otherNotes && (
          <Descriptions.Item label="Note">
            {data.otherNotes}
          </Descriptions.Item>
        )}
      </Descriptions>
    </div>
  );
};

export default StepSummary;