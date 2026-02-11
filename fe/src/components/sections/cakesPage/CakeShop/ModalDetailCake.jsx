import { Modal } from "antd"
import DetailCake from './DetailCake'
const ModalDetailCake = ({cakeId,open,onClose}) => {
  return (
    <Modal
    
    open={open}
    onCancel={onClose}
    footer={null}>
<DetailCake cakeId={cakeId} onClose={onClose}/>
    </Modal>
  )
}

export default ModalDetailCake
